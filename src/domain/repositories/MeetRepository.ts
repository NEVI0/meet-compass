import { MeetAbstract } from '@domain/entities';
import { CreateMeetDTO, RequestMeetAccessDTO } from '@domain/dtos';

export interface MeetRepositoryAbstract {
    create(params: CreateMeetDTO): MeetAbstract;
    requestAccess(params: RequestMeetAccessDTO): Promise<MeetAbstract>;
}
