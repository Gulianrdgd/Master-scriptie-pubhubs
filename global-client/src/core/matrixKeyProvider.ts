import { BaseKeyProvider, createKeyMaterialFromBuffer } from "livekit-client";
import {VideoCallKey, VideoCallKeys} from "../../../hub-client/src/types/videoCallKeys";


export class MatrixKeyProvider extends BaseKeyProvider {

    public constructor() {
        super({ ratchetWindowSize: 0 });
    }

    public async setInitKeys(all_keys: VideoCallKeys) {
        for (const key of all_keys) {
            this.onSetEncryptionKey(
                await createKeyMaterialFromBuffer(key.encryptionKey),
                key.participantId,
                key.encryptionKeyIndex,
            );
        }
    }

    public async updateKey(new_key: VideoCallKey) {
        this.onSetEncryptionKey(
            await createKeyMaterialFromBuffer(new_key.encryptionKey),
            new_key.participantId,
            new_key.encryptionKeyIndex,
        );
    }

    // public setRTCSession(rtcSession: MatrixRTCSession): void {
    //     if (this.rtcSession) {
    //         this.rtcSession.off(
    //             MatrixRTCSessionEvent.EncryptionKeyChanged,
    //             this.onEncryptionKeyChanged,
    //         );
    //     }
    //
    //     this.rtcSession = rtcSession;
    //
    //     this.rtcSession.on(
    //         MatrixRTCSessionEvent.EncryptionKeyChanged,
    //         this.onEncryptionKeyChanged,
    //     );
    //
    //     // The new session could be aware of keys of which the old session wasn't,
    //     // so emit a key changed event.
    //     for (const [
    //         participant,
    //         encryptionKeys,
    //     ] of this.rtcSession.getEncryptionKeys()) {
    //         for (const [index, encryptionKey] of encryptionKeys.entries()) {
    //             this.onEncryptionKeyChanged(encryptionKey, index, participant);
    //         }
    //     }
    // }
    //
    // private onEncryptionKeyChanged = async (
    //     encryptionKey: Uint8Array,
    //     encryptionKeyIndex: number,
    //     participantId: string,
    // ): Promise<void> => {
    //     this.onSetEncryptionKey(
    //         await createKeyMaterialFromBuffer(encryptionKey),
    //         participantId,
    //         encryptionKeyIndex,
    //     );
    //
    //     console.log(
    //         `Sent new key to livekit room=${this.rtcSession?.room.roomId} participantId=${participantId} encryptionKeyIndex=${encryptionKeyIndex}`,
    //     );
    //
    //     // logger.debug(
    //     //     `Sent new key to livekit room=${this.rtcSession?.room.roomId} participantId=${participantId} encryptionKeyIndex=${encryptionKeyIndex}`,
    //     // );
    // };
}
