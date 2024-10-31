import { UserAbstract } from '@domain/entities';

export interface MeetAbstract {
    id: string;
    name: string;

    createdAt: Date;

    owner: UserAbstract;
    participants: Array<UserAbstract>;

    addParticipant(participant: UserAbstract): void;
    removeParticipant(participant: UserAbstract): void;
}
