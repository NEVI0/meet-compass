import {
    PeerConnectionProviderAbstract,
    SocketClientProviderAbstract,
} from '@app/domain/providers';
import { MeetEventHandlersRepositoryAbstract } from '@app/domain/repositories';

import { MeetAbstract, UserAbstract } from '@shared/domain/entities';

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
            this.peerConnectionProvider.start({
                localStream: params.localStream,
                onReceivedParticipantStream: params.onReceivedParticipantStream,
            });

            this.socketClientProvider.on<MeetAbstract>(
                'updated-meet',
                params.onReceiveMeetData,
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
