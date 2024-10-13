import { MeetAbstract, UserAbstract } from '@domain/entities';
import { User, Uuid } from '@infra/adapters';

interface RawMeetData {
    name: string;
    owner: Omit<UserAbstract, 'id'>;
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
        this.createdAt = new Date();

        this.owner = new User(owner);
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
