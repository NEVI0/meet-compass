import { UserAbstract } from '@domain/entities';

interface DataAbstract {
    from: UserAbstract;
    signal: any;
}

export interface ListenForParticipantRequestingAccessDTO {
    onReceive(data: DataAbstract): void;
}
