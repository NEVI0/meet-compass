import { RequestMeetAccessDTO } from '@server/domain/dtos';
import {
    ServerStorageProviderAbstract,
    SocketServerProviderAbstract,
} from '@server/domain/providers';

export class RequestMeetAccessUseCase {
    constructor(
        private socketServerProvider: SocketServerProviderAbstract,
        private serverStorageProvider: ServerStorageProviderAbstract,
    ) {}

    public execute() {
        this.socketServerProvider.on<RequestMeetAccessDTO>(
            'request-meet-access',
            data => {
                const { offer, from, meetId } = data;

                const user = this.serverStorageProvider.findUserById(from.id);
                from.socketId = user?.socketId || '';

                const meet = this.serverStorageProvider.findMeetById(meetId);
                if (!meet) {
                    this.socketServerProvider.emit('meet-not-available', null);
                    return;
                }

                this.socketServerProvider.emitTo(
                    meet.owner.socketId,
                    'participant-requesting-meet-access',
                    {
                        from,
                        offer,
                    },
                );
            },
        );
    }
}
