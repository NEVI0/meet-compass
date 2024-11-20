import { UserAbstract } from '@domain/entities';

export interface LeaveMeetDTO {
    meetId: string;
    user: UserAbstract;
}
