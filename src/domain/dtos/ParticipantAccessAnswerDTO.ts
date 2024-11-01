import { UserAbstract } from '@domain/entities';

export interface ParticipantAccessAnswerDTO {
    answer: 'ACCEPTED' | 'DENIED';
    participant: UserAbstract;
}
