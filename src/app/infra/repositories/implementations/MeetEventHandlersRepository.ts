import { SocketClientProviderAbstract } from '@app/domain/providers';
import { MeetEventHandlersRepositoryAbstract } from '@app/domain/repositories';

import { MeetAbstract, UserAbstract } from '@shared/domain/entities';

export class MeetEventHandlersRepository
    implements MeetEventHandlersRepositoryAbstract
{
    constructor(private socketClientProvider: SocketClientProviderAbstract) {}

    public onParticipantRequestingAccess: MeetEventHandlersRepositoryAbstract['onParticipantRequestingAccess'] =
        params => {
            this.socketClientProvider.on<{
                from: UserAbstract;
                offer: RTCSessionDescriptionInit;
            }>('participant-requesting-meet-access', params.onReceive);
        };

    public onNewMessage: MeetEventHandlersRepositoryAbstract['onNewMessage'] =
        params => {
            this.socketClientProvider.on('message', params.onReceive);
        };

    public onMeetUpdate: MeetEventHandlersRepositoryAbstract['onMeetUpdate'] =
        params => {
            this.socketClientProvider.on<MeetAbstract>(
                'updated-meet',
                params.onReceive,
            );
        };

    public onLeavingParticipant: MeetEventHandlersRepositoryAbstract['onLeavingParticipant'] =
        params => {
            this.socketClientProvider.on<{ name: string }>(
                'participant-left',
                params.onReceive,
            );
        };
}
