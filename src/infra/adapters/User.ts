import { UserAbstract } from '@domain/entities';

interface RawUserData {
    name: string;
    email: string;
}

export class User implements UserAbstract {
    public id: UserAbstract['id'];
    public name: UserAbstract['name'];
    public email: UserAbstract['email'];

    constructor({ name, email }: RawUserData) {
        this.id = '';
        this.name = name;
        this.email = email;
    }
}
