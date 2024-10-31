import { UserAbstract, MeetAbstract } from '@domain/entities';

export interface InternalUser extends UserAbstract {
    socketId: string;
}
export interface InternalMeet extends MeetAbstract {
    socketId: string;
}

export interface ServerStorageProviderAbstract {
    addUser(user: InternalUser): void;
    addMeet(meet: InternalMeet): void;

    findUserById(id: string): InternalUser | null;
    findMeetById(id: string): InternalMeet | null;

    deleteUserById(id: string): void;
    deleteMeetById(id: string): void;

    addMeetParticipant(meetId: string, participant: InternalUser): void;
    removeMeetParticipant(meetId: string, participant: InternalUser): void;
}
