import { UserAbstract } from '@shared/domain/entities';

export interface MeetAbstract {
    id: string;
    name: string;
    socketId: string;
    createdAt: Date;

    owner: UserAbstract;
    participants: Array<UserAbstract>;
}
