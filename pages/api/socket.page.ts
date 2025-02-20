import { Server } from 'socket.io';

import { makeSocketServerProvider } from '@server/infra/providers';

import {
    makeRegisterMeetUseCase,
    makeRegisterUserUseCase,
    makeAnswerMeetAccessRequestUseCase,
    makeLeaveMeetUseCase,
    makeRequestMeetAccessUseCase,
    makeSendMessageUseCase,
} from '@server/domain/useCases';

const handler = (_: unknown, response: any) => {
    if (response.socket.server.io) return;

    const server = new Server(response.socket.server);
    response.socket.server.io = server;

    const socketServerProvider = makeSocketServerProvider(server);

    socketServerProvider.connect(() => {
        makeRegisterUserUseCase(socketServerProvider).execute();
        makeRegisterMeetUseCase(socketServerProvider).execute();
        makeRequestMeetAccessUseCase(socketServerProvider).execute();
        makeAnswerMeetAccessRequestUseCase(socketServerProvider).execute();
        makeLeaveMeetUseCase(socketServerProvider).execute();
        makeSendMessageUseCase(socketServerProvider).execute();
    });

    response.end();
};

export default handler;
