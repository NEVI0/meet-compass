import { MeetAbstract, UserAbstract } from '@shared/domain/entities';
import { User } from '@shared/infra/adapters';

import { v4 as uuidv4 } from 'uuid';

interface RawMeetData {
    name: string;
    owner: Omit<UserAbstract, 'id' | 'socketId'>;
}

export class Meet implements MeetAbstract {
    public id: MeetAbstract['id'];
    public name: MeetAbstract['name'];
    public socketId: MeetAbstract['socketId'];
    public createdAt: MeetAbstract['createdAt'];

    public owner: MeetAbstract['owner'];
    public participants: MeetAbstract['participants'];

    constructor({ name, owner }: RawMeetData) {
        this.id = uuidv4();
        this.name = name;
        this.socketId = '';
        this.createdAt = new Date();

        this.owner = new User(owner);
        this.participants = [];
    }
}
