import { ParticipantAccessAnswerDTO, SendMessageDTO } from '@domain/dtos';
import { MeetAbstract, UserAbstract } from '@domain/entities';
import {
    ServerStorageProviderAbstract,
    SocketServerProviderAbstract,
} from '@domain/providers';

export class HandleSocketServerEventsUseCase {
    constructor(
        private serverStorageProvider: ServerStorageProviderAbstract,
        private socketServerProvider: SocketServerProviderAbstract,
    ) {}

    public execute() {
        this.socketServerProvider.connect(() => {
            this.handleRegisterUser();
            this.handleRegisterMeet();

            this.handleRequestMeetAccess();
            this.handleAnswerMeetAccessRequest();

            this.handleChatMessages();
        });
    }

    private handleRegisterUser() {
        this.socketServerProvider.on<UserAbstract>('register-user', user => {
            const socketId = this.socketServerProvider.socket?.id || '';
            user.socketId = socketId;

            this.serverStorageProvider.addUser(user);
        });
    }

    private handleRegisterMeet() {
        this.socketServerProvider.on<MeetAbstract>('register-meet', meet => {
            const socketId = this.socketServerProvider.socket?.id || '';
            const owner = this.serverStorageProvider.findUserById(
                meet.owner.id,
            );

            meet.socketId = socketId;
            meet.owner.socketId = owner?.socketId || '';

            this.serverStorageProvider.addMeet(meet);
            this.serverStorageProvider.addMeetParticipant(meet.id, meet.owner);

            this.socketServerProvider.emitToSocket(
                meet.owner.socketId,
                'updated-meet',
                meet,
            );
        });
    }

    private handleRequestMeetAccess() {
        this.socketServerProvider.on<any>('request-meet-access', data => {
            const { meet, from, signal } = data;

            const user = this.serverStorageProvider.findUserById(from.id);
            from.socketId = user?.socketId || '';

            const found = this.serverStorageProvider.findMeetById(meet.id);
            if (!found) {
                this.socketServerProvider.emit('meet-not-available', null);
                return;
            }

            this.socketServerProvider.emitToSocket(
                found.owner.socketId,
                'participant-requesting-meet-access',
                {
                    from,
                    signal,
                },
            );
        });
    }

    private handleAnswerMeetAccessRequest() {
        this.socketServerProvider.on<ParticipantAccessAnswerDTO>(
            'answer-meet-access-request',
            data => {
                const { meetId, answer, participant } = data;

                if (answer === 'DENIED') {
                    return this.socketServerProvider.emitToSocket(
                        participant.socketId,
                        'request-denied',
                        null,
                    );
                }

                const meet = this.serverStorageProvider.addMeetParticipant(
                    meetId,
                    participant,
                );
                if (!meet) return;

                this.socketServerProvider.emitToSocket(
                    participant.socketId,
                    'request-accepted',
                    meet,
                );
                this.socketServerProvider.emitToSocket(
                    meet.owner.socketId,
                    'updated-meet',
                    meet,
                );
            },
        );
    }

    private handleChatMessages() {
        this.socketServerProvider.on<SendMessageDTO>('message', data => {
            const { meetId, sent } = data;

            const meet = this.serverStorageProvider.findMeetById(meetId);
            if (!meet) return;

            meet.participants
                .filter(participant => participant.id !== sent.by.id)
                .forEach(participant => {
                    this.socketServerProvider.emitToSocket(
                        participant.socketId,
                        'message',
                        data,
                    );
                });
        });
    }
}
