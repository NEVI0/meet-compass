import { UuidAbstract } from '@domain/entities';

import { v4 as uuidv4 } from 'uuid';

export class Uuid implements UuidAbstract {
    public id: UuidAbstract['id'];

    constructor() {
        this.id = uuidv4();
    }
}
