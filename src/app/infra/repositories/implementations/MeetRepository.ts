import { Meet, User } from '@shared/infra/adapters';

import { MeetUpdatedAbstract } from '@app/domain/entities';
import { MeetRepositoryAbstract } from '@app/domain/repositories';
import {
    PeerConnectionProviderAbstract,
    SocketClientProviderAbstract,
} from '@app/domain/providers';

export class MeetRepository implements MeetRepositoryAbstract {
    constructor(
        private socketClientProvider: SocketClientProviderAbstract,
        private peerConnectionProvider: PeerConnectionProviderAbstract,
    ) {}

    public create: MeetRepositoryAbstract['create'] = params => {
        return new Promise(resolve => {
            const meet = new Meet({
                name: params.meet.name,
                owner: params.owner,
            });

            this.socketClientProvider.emit('register-user', {
                user: meet.owner,
            });
            this.socketClientProvider.emit('register-meet', {
                meet,
            });

            this.socketClientProvider.on<MeetUpdatedAbstract>(
                'updated-meet',
                updated => {
                    this.socketClientProvider.removeEventListener(
                        'updated-meet',
                    );

                    return resolve(updated);
                },
            );
        });
    };

    public requestAccess: MeetRepositoryAbstract['requestAccess'] = params => {
        return new Promise(async (resolve, reject) => {
            const user = new User({
                name: params.participant.name,
                email: params.participant.email,
            });

            this.socketClientProvider.emit('register-user', { user });
            this.socketClientProvider.emit('request-meet-access', {
                from: user,
                meetId: params.meet.id,
                offer: {} as any,
            });

            this.socketClientProvider.on<MeetUpdatedAbstract>(
                'updated-meet',
                updated => {
                    this.removeListenersOfRequestAccess();

                    const currentUser = updated.meet.participants.find(
                        participant => participant.id === user.id,
                    );
                    if (!currentUser) return reject('Acesso negado!');

                    return resolve({
                        meet: updated.meet,
                        user: currentUser,
                    });
                },
            );

            this.socketClientProvider.on('request-denied', () => {
                this.removeListenersOfRequestAccess();
                return reject('Acesso negado!');
            });

            this.socketClientProvider.on('meet-not-available', () => {
                this.removeListenersOfRequestAccess();
                return reject('Reunião indisponível no momento!');
            });
        });
    };

    public sendMessage: MeetRepositoryAbstract['sendMessage'] = params => {
        this.socketClientProvider.emit('message', params);
    };

    public answerParticipantAccessRequest: MeetRepositoryAbstract['answerParticipantAccessRequest'] =
        async params => {
            this.socketClientProvider.emit(
                'answer-meet-access-request',
                params,
            );
        };

    public leave: MeetRepositoryAbstract['leave'] = params => {
        this.socketClientProvider.emit('leave-meet', params);
    };

    private removeListenersOfRequestAccess() {
        this.socketClientProvider.removeEventListener('meet-not-available');
        this.socketClientProvider.removeEventListener('request-denied');
        this.socketClientProvider.removeEventListener('updated-meet');
    }
}
