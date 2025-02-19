import { UserAbstract } from '@shared/domain/entities';

export interface SendMessageDTO {
    meetId: string;
    message: string;
    sent: {
        by: UserAbstract;
        at: string;
    };
}
