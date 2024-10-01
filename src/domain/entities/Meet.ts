import { UserAbstract, UuidAbstract } from '@domain/entities';

export interface MeetAbstract {
    id: UuidAbstract;
    name: string;

    createdAt: string;

    owner: UserAbstract;
    participants: Array<UserAbstract>;

    addParticipant(participant: UserAbstract): void;
    removeParticipant(participant: UserAbstract): void;
}
