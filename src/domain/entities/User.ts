import { UuidAbstract } from '@domain/entities';

export interface UserAbstract {
    id: UuidAbstract;
    name: string;
    email: string;
}
