import { UserAbstract } from '@shared/domain/entities';

import { MeetUpdatedAbstract } from '@app/domain/entities';
import { MeetEventHandlersRepositoryAbstract } from '@app/domain/repositories';

import {
    PeerConnectionProviderAbstract,
    SocketClientProviderAbstract,
} from '@app/domain/providers';

export class MeetEventHandlersRepository
    implements MeetEventHandlersRepositoryAbstract
{
    constructor(
        private socketClientProvider: SocketClientProviderAbstract,
        private peerConnectionProvider: PeerConnectionProviderAbstract,
    ) {}

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
            this.socketClientProvider.on<MeetUpdatedAbstract>(
                'updated-meet',
                params.onUpdated,
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
