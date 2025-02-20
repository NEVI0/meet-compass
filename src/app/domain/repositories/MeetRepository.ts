import { MeetAbstract, UserAbstract } from '@shared/domain/entities';
import {
    CreateMeetDTO,
    LeaveMeetDTO,
    ParticipantAccessAnswerDTO,
    RequestMeetAccessDTO,
    SendMessageDTO,
} from '@app/domain/dtos';

export interface MeetRepositoryAbstract {
    create(params: CreateMeetDTO): Promise<MeetAbstract>;

    requestAccess(params: RequestMeetAccessDTO): Promise<{
        meet: MeetAbstract;
        currentUser: UserAbstract | null;
    }>;

    sendMessage(params: SendMessageDTO): void;

    answerParticipantAccessRequest(param: ParticipantAccessAnswerDTO): void;

    leave(params: LeaveMeetDTO): void;
}
