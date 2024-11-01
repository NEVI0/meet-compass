import { Server } from 'socket.io';

import { makeHandleSocketServerEventsUseCase } from '@domain/useCases';

const handler = (_: unknown, response: any) => {
    if (response.socket.server.io) return;

    const server = new Server(response.socket.server);
    response.socket.server.io = server;

    makeHandleSocketServerEventsUseCase(server).execute();

    response.end();
};

export default handler;
