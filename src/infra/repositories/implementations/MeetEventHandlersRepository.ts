import {
    ListenForParticipantRequestingAccessDTO,
    ParticipantAccessAnswerDTO,
} from '@domain/dtos';
import { UserAbstract } from '@domain/entities';
import { SocketClientProviderAbstract } from '@domain/providers';
import { MeetEventHandlersRepositoryAbstract } from '@domain/repositories';

export class MeetEventHandlersRepository
    implements MeetEventHandlersRepositoryAbstract
{
    constructor(private socketClientProvider: SocketClientProviderAbstract) {}

    public onParticipantRequestingAccess(
        params: ListenForParticipantRequestingAccessDTO,
    ) {
        this.socketClientProvider.on<{ from: UserAbstract; signal: any }>(
            'participant-requesting-meet-access',
            params.onReceive,
        );
    }

    public onAnswerParticipantAccessRequest(
        params: ParticipantAccessAnswerDTO,
    ) {
        this.socketClientProvider.emit('answer-meet-access-request', params);
    }
}
