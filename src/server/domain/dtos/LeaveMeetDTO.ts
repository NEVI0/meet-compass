import { UserAbstract } from '@shared/domain/entities';

export interface LeaveMeetDTO {
    meetId: string;
    user: UserAbstract;
}
