import { UserAbstract } from '@shared/domain/entities';

export interface RequestMeetAccessDTO {
    meetId: string;
    from: UserAbstract;
    offer: RTCSessionDescriptionInit;
}
