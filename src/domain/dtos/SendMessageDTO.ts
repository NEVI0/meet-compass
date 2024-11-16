import { UserAbstract } from '@domain/entities';

export interface SendMessageDTO {
    message: string;
    meetId: string;
    sent: {
        by: UserAbstract;
        at: string;
    };
}
