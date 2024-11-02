import { UserAbstract } from '@domain/entities';

export interface ParticipantAccessAnswerDTO {
    answer: 'ACCEPTED' | 'DENIED';
    meetId: string;
    participant: UserAbstract;
}
