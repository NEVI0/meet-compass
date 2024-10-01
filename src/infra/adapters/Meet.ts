import { MeetAbstract, UserAbstract } from '@domain/entities';
import { Uuid } from '@infra/adapters';

interface RawMeetData {
    name: string;
    owner: UserAbstract;
}

export class Meet implements MeetAbstract {
    public id: MeetAbstract['id'];
    public name: MeetAbstract['name'];
    public createdAt: MeetAbstract['createdAt'];
    public owner: MeetAbstract['owner'];
    public participants: MeetAbstract['participants'];

    constructor({ name, owner }: RawMeetData) {
        this.id = new Uuid();
        this.name = name;
        this.createdAt = '';

        this.owner = owner;
        this.participants = [];
    }

    public addParticipant(participant: UserAbstract): void {
        this.participants.push(participant);
    }

    public removeParticipant(participant: UserAbstract): void {
        this.participants = this.participants.filter(
            ptc => ptc.id !== participant.id,
        );
    }
}
