import { UserAbstract } from '@domain/entities';
import { Uuid } from '@infra/adapters';

interface RawUserData {
    name: string;
    email: string;
}

export class User implements UserAbstract {
    public id: UserAbstract['id'];
    public name: UserAbstract['name'];
    public email: UserAbstract['email'];

    constructor({ name, email }: RawUserData) {
        this.id = new Uuid();
        this.name = name;
        this.email = email;
    }
}
