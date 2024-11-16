import { MeetAbstract, UserAbstract } from '@domain/entities';
import { ServerStorageProviderAbstract } from '@domain/providers';

export class ServerStorageProvider implements ServerStorageProviderAbstract {
    private users: Record<string, UserAbstract> = {};
    private meets: Record<string, MeetAbstract> = {};

    constructor() {}

    public addUser: ServerStorageProviderAbstract['addUser'] = user => {
        this.users[user.id] = user;
    };

    public addMeet: ServerStorageProviderAbstract['addMeet'] = meet => {
        this.meets[meet.id] = meet;
    };

    public findUserById: ServerStorageProviderAbstract['findUserById'] = id => {
        const user = this.users[id];

        if (!user) return null;
        return user;
    };

    public findMeetById: ServerStorageProviderAbstract['findMeetById'] = id => {
        const meet = this.meets[id];

        if (!meet) return null;
        return meet;
    };

    public deleteUserById: ServerStorageProviderAbstract['deleteUserById'] =
        id => {
            const user = this.users[id];
            if (user) delete this.users[id];
        };

    public deleteMeetById: ServerStorageProviderAbstract['deleteMeetById'] =
        id => {
            const meet = this.meets[id];
            if (meet) delete this.meets[id];
        };

    public addMeetParticipant: ServerStorageProviderAbstract['addMeetParticipant'] =
        (meetId, participant) => {
            if (!this.meets[meetId]) return null;

            this.meets[meetId].participants.push(participant);
            return this.meets[meetId];
        };

    public removeMeetParticipant: ServerStorageProviderAbstract['removeMeetParticipant'] =
        (meetId, participant) => {
            if (!this.meets[meetId]) return null;

            this.meets[meetId].participants.filter(
                ptc => ptc.id !== participant.id,
            );

            return this.meets[meetId];
        };
}
