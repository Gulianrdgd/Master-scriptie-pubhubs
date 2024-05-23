import { BaseKeyProvider, createKeyMaterialFromBuffer } from "livekit-client";
import {MatrixRTCSession, MatrixRTCSessionEvent} from "matrix-js-sdk/lib/matrixrtc/MatrixRTCSession";


export class MatrixKeyProvider extends BaseKeyProvider {

    private rtcSession: MatrixRTCSession | null = null;
    private keys = new Map<string, Map<number, Uint8Array>>();


    public constructor() {
        super({sharedKey: false, ratchetWindowSize: 0 });
    }

    public setRTCSession(rtcSession: MatrixRTCSession): void {
        if (this.rtcSession) {
            this.rtcSession.off(
                MatrixRTCSessionEvent.EncryptionKeyChanged,
                this.onEncryptionKeyChanged,
            );
        }

        console.log("NEw keys", rtcSession.getEncryptionKeys())
        this.rtcSession = rtcSession;

        this.rtcSession.off(
            MatrixRTCSessionEvent.EncryptionKeyChanged,
            this.onEncryptionKeyChanged,
        );
        this.rtcSession.on(
            MatrixRTCSessionEvent.EncryptionKeyChanged,
            this.onEncryptionKeyChanged,
        );

        // The new session could be aware of keys of which the old session wasn't,
        // so emit a key changed event.
        for (const [
            participant,
            encryptionKeys,
        ] of this.rtcSession.getEncryptionKeys()) {
            for (const [index, encryptionKey] of encryptionKeys.entries()) {
                this.onEncryptionKeyChanged(encryptionKey, index, participant);
            }
        }
    }

    private onEncryptionKeyChanged = async (
        encryptionKey: Uint8Array,
        encryptionKeyIndex: number,
        participantId: string,
    ): Promise<void> => {
        this.onSetEncryptionKey(
            await createKeyMaterialFromBuffer(encryptionKey),
            participantId,
            encryptionKeyIndex,
        );


        this.keys.set(participantId, new Map([[encryptionKeyIndex, encryptionKey]]));

        console.log(this.keys)

        console.log(
            `Sent new key to livekit room=${this.rtcSession?.room.roomId} participantId=${participantId} encryptionKeyIndex=${encryptionKeyIndex}`,
        );

        // logger.debug(
        //     `Sent new key to livekit room=${this.rtcSession?.room.roomId} participantId=${participantId} encryptionKeyIndex=${encryptionKeyIndex}`,
        // );
    };




}
