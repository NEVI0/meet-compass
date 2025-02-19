import { UserAbstract } from '@domain/entities';

interface DataAbstract {
    from: UserAbstract;
    offer: RTCSessionDescriptionInit;
}

export interface ListenForParticipantRequestingAccessDTO {
    onReceive(data: DataAbstract): void;
}
