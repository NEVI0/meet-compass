import { MeetAbstract } from '@domain/entities';

import { MeetRepositoryAbstract } from '@domain/repositories';
import { SocketClientProviderAbstract } from '@domain/providers';

import { Meet, User } from '@infra/adapters';

export class MeetRepository implements MeetRepositoryAbstract {
    constructor(private socketClientProvider: SocketClientProviderAbstract) {}

    public create: MeetRepositoryAbstract['create'] = params => {
        return new Promise(resolve => {
            const meet = new Meet({
                name: params.meet.name,
                owner: params.owner,
            });

            this.socketClientProvider.emit('register-user', meet.owner);
            this.socketClientProvider.emit('register-meet', meet);

            this.socketClientProvider.on<MeetAbstract>('updated-meet', data => {
                this.socketClientProvider.removeEventListener('updated-meet');

                return resolve(data);
            });
        });
    };

    public requestAccess: MeetRepositoryAbstract['requestAccess'] = params => {
        return new Promise((resolve, reject) => {
            const user = new User({
                name: params.user,
                email: params.email,
            });

            this.socketClientProvider.on<MeetAbstract>(
                'request-accepted',
                meet => {
                    this.removeListenersOfRequestAccess();

                    const currentUser =
                        meet.participants.find(
                            participant => participant.id === user.id,
                        ) || null;

                    return resolve({ meet, currentUser });
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

            this.socketClientProvider.emit('register-user', user);
            this.socketClientProvider.emit('request-meet-access', {
                from: user,
                meet: params.meet,
                signal: params.signal,
            });
        });
    };

    public sendMessage: MeetRepositoryAbstract['sendMessage'] = params => {
        this.socketClientProvider.emit('message', params);
    };

    public answerParticipantAccessRequest: MeetRepositoryAbstract['answerParticipantAccessRequest'] =
        params => {
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
        this.socketClientProvider.removeEventListener('request-accepted');
        this.socketClientProvider.removeEventListener('request-denied');
    }
}
