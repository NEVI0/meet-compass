import {
    InternalMeet,
    InternalUser,
    ServerStorageProviderAbstract,
} from '@domain/providers';

export class ServerStorageProvider implements ServerStorageProviderAbstract {
    private users: Record<string, InternalUser> = {};
    private meets: Record<string, InternalMeet> = {};

    constructor() {}

    public addUser(user: InternalUser) {
        this.users[user.id] = user;
    }

    public addMeet(meet: InternalMeet) {
        this.meets[meet.id] = meet;
    }

    public findUserById(id: string) {
        const user = this.users[id];

        if (!user) return null;
        return user;
    }

    public findMeetById(id: string) {
        const meet = this.meets[id];

        if (!meet) return null;
        return meet;
    }

    public deleteUserById(id: string) {
        const user = this.users[id];
        if (user) delete this.users[id];
    }

    public deleteMeetById(id: string) {
        const meet = this.meets[id];
        if (meet) delete this.meets[id];
    }

    public addMeetParticipant(meetId: string, participant: InternalUser) {
        const meet = this.meets[meetId];
        if (!meet) return;

        this.meets[meetId].addParticipant(participant);
    }

    public removeMeetParticipant(meetId: string, participant: InternalUser) {
        const meet = this.meets[meetId];
        if (!meet) return;

        this.meets[meetId].removeParticipant(participant);
    }
}
