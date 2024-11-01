import { ParticipantAccessAnswerDTO } from '@domain/dtos';
import { SocketClientProviderAbstract } from '@domain/providers';
import { MeetEventHandlersRepositoryAbstract } from '@domain/repositories';

export class MeetEventHandlersRepository
    implements MeetEventHandlersRepositoryAbstract
{
    constructor(private socketClientProvider: SocketClientProviderAbstract) {}

    public onParticipantRequestingAccess() {
        return new Promise(resolve => {
            this.socketClientProvider.on<any>(
                'participant-requesting-meet-access',
                data => {
                    return resolve(data);
                },
            );
        });
    }

    public onAnswerParticipantAccessRequest(
        params: ParticipantAccessAnswerDTO,
    ) {
        this.socketClientProvider.emit('answer-meet-access-request', params);
    }
}
