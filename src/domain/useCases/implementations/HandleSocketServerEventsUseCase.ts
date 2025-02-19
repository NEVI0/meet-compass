import {
    LeaveMeetDTO,
    ParticipantAccessAnswerDTO,
    SendMessageDTO,
} from '@domain/dtos';
import { MeetAbstract, UserAbstract } from '@domain/entities';
import {
    ServerStorageProviderAbstract,
    SocketServerProviderAbstract,
} from '@domain/providers';

interface RequestMeetAccessData {
    offer: RTCSessionDescriptionInit;
    meetId: string;
    from: UserAbstract;
}

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
            this.handleLeavingParticipant();
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
        this.socketServerProvider.on<RequestMeetAccessData>(
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

                this.socketServerProvider.emitToSocket(
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

    private handleLeavingParticipant() {
        this.socketServerProvider.on<LeaveMeetDTO>('leave-meet', data => {
            const { meetId, user } = data;

            const meet = this.serverStorageProvider.removeMeetParticipant(
                meetId,
                user,
            );
            if (!meet) return;

            meet.participants.forEach(participant => {
                this.socketServerProvider.emitToSocket(
                    participant.socketId,
                    'participant-left',
                    { name: user.name },
                );

                this.socketServerProvider.emitToSocket(
                    participant.socketId,
                    'updated-meet',
                    meet,
                );
            });
        });
    }
}
