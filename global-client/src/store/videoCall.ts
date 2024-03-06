import {defineStore} from "pinia";
import {Hub} from "@/store/hubs";
import {
    createLocalAudioTrack,
    createLocalVideoTrack,
    LocalAudioTrack,
    LocalVideoTrack,
    VideoPresets
} from "livekit-client";

const useVideoCall = defineStore('videoCall', {
    state: () => {
        return {
            call_active: false,
            origin_hub: null as Hub | null,
            token: null as string | null,
            target_url: null as string | null,
            audio_track: null as LocalAudioTrack | null,
            audio_devices: [] as MediaDeviceInfo[],
            selected_audio_device_id: null as string | null,
            video_track: null as LocalVideoTrack | null,
            video_devices: [] as MediaDeviceInfo[],
            selected_video_device_id: null as string | null,
            viewState: 'hidden' as 'hidden' | 'full' | 'mini',
        };
    },

    getters: {
        isCallActive(state) {
            return state.call_active;
        },

        getOriginHub(state) {
            return state.origin_hub;
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

    },

actions: {
        joinCall(origin_hub: Hub, token: string, target_url: string) {
            this.origin_hub = origin_hub;
            this.token = token;
            this.target_url = target_url;
            this.call_active = true;
        },

        leaveCall() {
            this.origin_hub = null;
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
            }else{
                this.audio_track = null;
            }
        },

        destroyVideoCall() {
            console.log('destroyVideoCall')
            this.origin_hub = null;
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
