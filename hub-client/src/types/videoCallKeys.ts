export interface VideoCallKey{
    encryptionKey: Uint8Array,
    encryptionKeyIndex: number,
    participantId: string,
}

export interface VideoCallKeys extends Array<VideoCallKey>{}