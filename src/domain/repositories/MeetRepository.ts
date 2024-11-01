import { CreateMeetDTO, RequestMeetAccessDTO } from '@domain/dtos';
import { MeetAbstract } from '@domain/entities';

export interface MeetRepositoryAbstract {
    create(params: CreateMeetDTO): MeetAbstract;
    requestAccess(params: RequestMeetAccessDTO): void;
}
