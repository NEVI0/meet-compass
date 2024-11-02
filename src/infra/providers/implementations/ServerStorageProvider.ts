import { MeetAbstract, UserAbstract } from '@domain/entities';
import { ServerStorageProviderAbstract } from '@domain/providers';

export class ServerStorageProvider implements ServerStorageProviderAbstract {
    private users: Record<string, UserAbstract> = {};
    private meets: Record<string, MeetAbstract> = {};

    constructor() {}

    public addUser(user: UserAbstract) {
        this.users[user.id] = user;
    }

    public addMeet(meet: MeetAbstract) {
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

    public addMeetParticipant(meetId: string, participant: UserAbstract) {
        if (!this.meets[meetId]) return null;

        this.meets[meetId].participants.push(participant);
        return this.meets[meetId];
    }

    public removeMeetParticipant(meetId: string, participant: UserAbstract) {
        if (!this.meets[meetId]) return null;

        this.meets[meetId].participants.filter(
            ptc => ptc.id !== participant.id,
        );

        return this.meets[meetId];
    }
}
