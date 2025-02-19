import { UserAbstract, MeetAbstract } from '@shared/domain/entities';

export interface ServerStorageProviderAbstract {
    addUser(user: UserAbstract): void;
    addMeet(meet: MeetAbstract): void;

    findUserById(id: string): UserAbstract | null;
    findMeetById(id: string): MeetAbstract | null;

    deleteUserById(id: string): void;
    deleteMeetById(id: string): void;

    addMeetParticipant(
        meetId: string,
        participant: UserAbstract,
    ): MeetAbstract | null;

    removeMeetParticipant(
        meetId: string,
        participant: UserAbstract,
    ): MeetAbstract | null;
}
