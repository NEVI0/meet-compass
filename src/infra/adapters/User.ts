import { UserAbstract } from '@domain/entities';

import { v4 as uuidv4 } from 'uuid';

interface RawUserData {
    name: string;
    email: string;
}

export class User implements UserAbstract {
    public id: UserAbstract['id'];
    public name: UserAbstract['name'];
    public email: UserAbstract['email'];
    public socketId: UserAbstract['socketId'];

    constructor({ name, email }: RawUserData) {
        this.id = uuidv4();
        this.name = name;
        this.email = email;
        this.socketId = '';
    }
}
