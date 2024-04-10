import {defineStore} from "pinia";
import {
    createLocalAudioTrack,
    createLocalVideoTrack,
    LocalAudioTrack,
    LocalVideoTrack,
    VideoPresets,
    Room as LiveKitRoom,
    RoomOptions,
    TrackPublishDefaults,
    AudioPresets,
    VideoPreset,
    ScreenSharePresets,
    DefaultReconnectPolicy, BaseKeyProvider,
} from "livekit-client";
import {MatrixKeyProvider} from "@/core/matrixKeyProvider";
import {MatrixRTCSession} from "matrix-js-sdk/lib/matrixrtc/MatrixRTCSession";
import {toRaw} from "vue";

const defaultLiveKitPublishOptions: TrackPublishDefaults = {
    audioPreset: AudioPresets.music,
    dtx: true,
    // disable red because the livekit server strips out red packets for clients
    // that don't support it (firefox) but of course that doesn't work with e2ee.
    red: false,
    forceStereo: false,
    simulcast: true,
    videoSimulcastLayers: [VideoPresets.h180, VideoPresets.h360] as VideoPreset[],
    screenShareEncoding: ScreenSharePresets.h1080fps30.encoding,
    stopMicTrackOnMute: false,
    videoCodec: "vp8",
    videoEncoding: VideoPresets.h720.encoding,
    backupCodec: { codec: "vp8", encoding: VideoPresets.h720.encoding },
} as const;

export const defaultLiveKitOptions: RoomOptions = {
    // automatically manage subscribed video quality
    adaptiveStream: true,

    // optimize publishing bandwidth and CPU for published tracks
    dynacast: true,

    // capture settings
    videoCaptureDefaults: {
        resolution: VideoPresets.h720.resolution,
    },

    // publish settings
    publishDefaults: defaultLiveKitPublishOptions,

    // default LiveKit options that seem to be sane
    stopLocalTrackOnUnpublish: true,
    reconnectPolicy: new DefaultReconnectPolicy(),
    disconnectOnPageLeave: true,
    webAudioMix: false,
};

const useVideoCall = defineStore('videoCall', {
    state: () => {
        return {
            call_active: false,
            token: null as string | null,
            target_url: null as string | null,
            should_publish_tracks: false,

            matrix_key_provider: null as MatrixKeyProvider | null,
            livekit_room: null as LiveKitRoom | null,
            audio_track: null as LocalAudioTrack | null,
            audio_devices: [] as MediaDeviceInfo[],
            selected_audio_device_id: null as string | null,
            video_track: null as LocalVideoTrack | null,
            video_devices: [] as MediaDeviceInfo[],
            selected_video_device_id: null as string | null,
            viewState: 'hidden' as 'hidden' | 'full' | 'mini',
            options: {...defaultLiveKitOptions} as RoomOptions,
        };
    },

    getters: {
        isCallActive(state) {
            return state.call_active;
        },

        getToken(state) {
            return state.token;
        },

        getTargetUrl(state) {
            return state.target_url;
        },

        getAudioTrack(state) {
            return state.audio_track;
        },

        getVideoTrack(state) {
            return state.video_track;
        },

        getViewState(state) {
            return state.viewState;
        },

        getShouldPublishTracks(state) {
            return state.should_publish_tracks;
        }

    },

actions: {
        async joinCall(matrixRTC: MatrixRTCSession, token: string, target_url: string) {
            this.token = token;
            this.target_url = target_url;
            this.call_active = true;

            const workerUrl = new URL('./../../node_modules/livekit-client/dist/livekit-client.e2ee.worker.mjs', import.meta.url);
            console.log(workerUrl);
            const E2EEWorker = new Worker(workerUrl);
            const matrix_key_provider = new MatrixKeyProvider();

            matrix_key_provider.setRTCSession(matrixRTC);

            const e2ee = {
                keyProvider: matrix_key_provider as BaseKeyProvider,
                worker: E2EEWorker
            };


            this.options.e2ee = e2ee;

            console.log(this.options)

            // @ts-expect-error: I actually don't know why this is, they should be the same TODO!
            this.livekit_room = new LiveKitRoom(toRaw(this.options));
            console.log(target_url, token)

            await this.livekit_room.connect(target_url, token);

            console.log("DONE CONNECTING");
        },

        leaveCall() {
            this.token = null;
            this.target_url = null;
            this.call_active = false;
            this.video_track = null;
            this.audio_track = null;
        },

        async getReadyForCall(audio_device_id: string, video_device_id: string) {
            await this.changeAudioDevice(audio_device_id);
            await this.changeVideoDevice(video_device_id);

        },

        async togglePublishTracks(should_publish: boolean) {
            this.should_publish_tracks = should_publish;

            if(this.should_publish_tracks && this.livekit_room){
                if(this.audio_track){
                    // @ts-expect-error: I actually don't know why this is TODO!
                    await this.livekit_room.localParticipant.publishTrack(this.audio_track);
                }

                if(this.video_track){
                    // @ts-expect-error: I actually don't know why this is TODO!
                    await this.livekit_room.localParticipant.publishTrack(this.video_track);
                }
            }else{
                if(this.audio_track){
                    // @ts-expect-error: I actually don't know why this is TODO!
                    await this.livekit_room.localParticipant.unpublishTrack(this.audio_track);
                }

                if(this.video_track){
                    // @ts-expect-error: I actually don't know why this is TODO!
                    await this.livekit_room.localParticipant.unpublishTrack(this.video_track);
                }
            }
        },

        async changeVideoDevice(deviceId: string | null) {
            console.log('changeVideoDevice', deviceId)

            // detach the video track if it exists
            if(this.video_track) {
                this.video_track.stop();
            }

            this.selected_video_device_id = deviceId;

            if (deviceId) {
                this.video_track = await createLocalVideoTrack({
                    facingMode: "user",
                    // preset resolutions
                    resolution: VideoPresets.h720,
                    deviceId: deviceId
                });

                if(this.call_active && this.should_publish_tracks && this.livekit_room && this.video_track){
                    // @ts-expect-error: I actually don't know why this is TODO!
                    await this.livekit_room.localParticipant.publishTrack(this.video_track);
                }

            }else{
                this.video_track = null;
            }
        },

        async changeAudioDevice(deviceId: string| null) {
            console.log('changeAudioDevice', deviceId)

            // detach the audio track if it exists
            if(this.audio_track) {
                this.audio_track.stop();
            }

            this.selected_audio_device_id = deviceId;

            if (deviceId) {
                this.audio_track = await createLocalAudioTrack({
                    deviceId: deviceId,
                    echoCancellation: true,
                    noiseSuppression: true
                });

                if(this.call_active && this.livekit_room && this.audio_track){
                    // @ts-expect-error: I actually don't know why this is TODO!
                    await this.livekit_room.localParticipant.publishTrack(this.audio_track);
                }
            }else{
                this.audio_track = null;
            }
        },

        destroyVideoCall() {
            console.log('destroyVideoCall')
            this.token = null;
            this.target_url = null;
            this.call_active = false;
            this.changeAudioDevice(null);
            this.changeVideoDevice(null);
            this.viewState = 'hidden';
        },

        changeViewState(viewState: 'hidden' | 'full' | 'mini') {
            this.viewState = viewState;
        },
    },
});

export default useVideoCall;
