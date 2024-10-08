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
import {GroupCall} from "matrix-js-sdk/lib/webrtc/groupCall";
import RemoteParticipant from "livekit-client/dist/src/room/participant/RemoteParticipant";

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
    videoCodec: "vp9",
    videoEncoding: VideoPresets.h720.encoding,
    // backupCodec: {codec: "vp8", encoding: VideoPresets.h720.encoding},
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
            rtc_session: null as MatrixRTCSession | null,
            groupCall: null as GroupCall | null,

            matrix_key_provider: null as MatrixKeyProvider | null,
            livekit_room: null as LiveKitRoom | null,
            audio_track: null as LocalAudioTrack | null,
            audio_devices: [] as MediaDeviceInfo[],
            selected_audio_device_id: null as string | null,
            video_track: null as LocalVideoTrack | null,
            video_devices: [] as MediaDeviceInfo[],

            selected_video_device_id: null as string | null,
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

        getShouldPublishTracks(state) {
            return state.should_publish_tracks;
        },

        getRemoteParticipants(state) {
            if (state.livekit_room) {
                return state.livekit_room.remoteParticipants;
            } else {
                return new Map<string, RemoteParticipant>();
            }
        },
    },

    actions: {
        async joinCall(matrixRTC: MatrixRTCSession, token: string, target_url: string, groupCall: GroupCall) {
            this.token = token;
            this.target_url = target_url;
            this.call_active = true;
            this.groupCall = groupCall;

            const matrix_key_provider = new MatrixKeyProvider();

            this.rtc_session = matrixRTC;
            
            this.matrix_key_provider = matrix_key_provider;

            matrix_key_provider.setRTCSession(matrixRTC);

            const e2ee = {
                keyProvider: matrix_key_provider as BaseKeyProvider,
                worker: new Worker(new URL('livekit-client/e2ee-worker', import.meta.url)),
            };

            // setLogLevel('debug', 'lk-e2ee');

            this.options.e2ee = e2ee;

            this.livekit_room = new LiveKitRoom(toRaw(this.options) as RoomOptions);

            await this.livekit_room.setE2EEEnabled(true);

            await this.livekit_room.connect(target_url, token, {
                // Needed to subscribe to all tracks
                autoSubscribe: true
            });

        },

        async leaveCall() {
            this.token = null;
            this.target_url = null;
            this.call_active = false;
            if (this.livekit_room) {
                await this.livekit_room.disconnect(true);
                await this.togglePublishTracks(false);
                this.livekit_room = null;
            }

            if( this.matrix_key_provider){
                this.matrix_key_provider.removeAllListeners();
                this.matrix_key_provider = null;
            }

            if(this.options.e2ee){
                this.options.e2ee.worker.terminate();
                this.options.e2ee = undefined;
            }

            await this.changeAudioDevice(null);
            await this.changeVideoDevice(null);
            if (this.rtc_session) {
                await this.rtc_session.leaveRoomSession(10);
                this.rtc_session = null;
            }
        },

        async endCall() {
            if (this.groupCall) {
                await this.groupCall.terminate(true);
            }
            await this.leaveCall();
        },


        async togglePublishTracks(should_publish: boolean) {
            this.should_publish_tracks = should_publish;

            if (!this.livekit_room) {
                return;
            }

            if (this.should_publish_tracks) {
                if (this.audio_track) {
                    await this.livekit_room.localParticipant.publishTrack(this.audio_track as LocalAudioTrack);
                }

                if (this.video_track) {
                    await this.livekit_room.localParticipant.publishTrack(this.video_track as LocalVideoTrack);
                }

            } else {

                if (this.audio_track) {
                    await this.livekit_room.localParticipant.unpublishTrack(this.audio_track as LocalAudioTrack);
                    // this.audio_track.stop();
                }

                if (this.video_track) {
                    await this.livekit_room.localParticipant.unpublishTrack(this.video_track as LocalVideoTrack);
                    // this.video_track.stop();
                }
            }
        },

        async changeVideoDevice(deviceId: string | null) {

            // detach the video track if it exists
            if (this.video_track) {
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

                if (this.call_active && this.should_publish_tracks && this.livekit_room && this.video_track) {
                    await this.livekit_room.localParticipant.publishTrack(this.video_track as LocalVideoTrack);
                }

            } else {
                this.video_track = null;
            }
        },

        async changeAudioDevice(deviceId: string | null) {
            // detach the audio track if it exists
            if (this.audio_track) {
                this.audio_track.stop();
            }

            this.selected_audio_device_id = deviceId;

            if (deviceId) {
                this.audio_track = await createLocalAudioTrack({
                    deviceId: deviceId,
                    echoCancellation: true,
                    noiseSuppression: true
                });

                if (this.call_active && this.should_publish_tracks && this.livekit_room && this.audio_track) {
                    await this.livekit_room.localParticipant.publishTrack(this.audio_track as LocalAudioTrack);
                }
            } else {
                this.audio_track = null;
            }
        },
    },
});

export default useVideoCall;
