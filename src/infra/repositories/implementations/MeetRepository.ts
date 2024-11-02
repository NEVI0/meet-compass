import { MeetAbstract } from '@domain/entities';
import { CreateMeetDTO, RequestMeetAccessDTO } from '@domain/dtos';

import { MeetRepositoryAbstract } from '@domain/repositories';
import { SocketClientProviderAbstract } from '@domain/providers';

import { Meet, User } from '@infra/adapters';

export class MeetRepository implements MeetRepositoryAbstract {
    constructor(private socketClientProvider: SocketClientProviderAbstract) {}

    public create(params: CreateMeetDTO) {
        const meet = new Meet({
            name: params.meet.name,
            owner: params.owner,
        });

        this.socketClientProvider.emit('register-user', meet.owner);
        this.socketClientProvider.emit('register-meet', meet);

        return meet;
    }

    public requestAccess(params: RequestMeetAccessDTO) {
        return new Promise((resolve, reject) => {
            this.socketClientProvider.on<MeetAbstract>(
                'request-accepted',
                meet => {
                    this.socketClientProvider.removeEventListener(
                        'request-accepted',
                    );
                    this.socketClientProvider.removeEventListener(
                        'request-denied',
                    );

                    return resolve(meet);
                },
            );

            this.socketClientProvider.on('request-denied', () => {
                this.socketClientProvider.removeEventListener(
                    'request-accepted',
                );
                this.socketClientProvider.removeEventListener('request-denied');

                return reject();
            });

            const user = new User({
                name: params.user,
                email: params.email,
            });

            this.socketClientProvider.emit('register-user', user);
            this.socketClientProvider.emit('request-meet-access', {
                from: user,
                meet: params.meet,
                signal: params.signal,
            });
        }) as Promise<MeetAbstract>;
    }
}
