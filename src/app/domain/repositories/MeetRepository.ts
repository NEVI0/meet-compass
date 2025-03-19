import { MeetAbstract, UserAbstract } from '@shared/domain/entities';
import { MeetUpdatedAbstract } from '@app/domain/entities';
import {
    CreateMeetDTO,
    LeaveMeetDTO,
    ParticipantAccessAnswerDTO,
    RequestMeetAccessDTO,
    SendMessageDTO,
} from '@app/domain/dtos';

export interface MeetRepositoryAbstract {
    create(params: CreateMeetDTO): Promise<MeetUpdatedAbstract>;

    requestAccess(params: RequestMeetAccessDTO): Promise<{
        meet: MeetAbstract;
        user: UserAbstract;
    }>;

    sendMessage(params: SendMessageDTO): void;

    answerParticipantAccessRequest(param: ParticipantAccessAnswerDTO): void;

    leave(params: LeaveMeetDTO): void;
}
