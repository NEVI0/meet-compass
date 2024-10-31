import { io, Socket } from 'socket.io-client';

import { SocketClientEventName, SocketServerEventName } from '@domain/entities';
import {
    ClientListenerCallback,
    SocketClientProviderAbstract,
} from '@domain/providers';

const SOCKET_SERVER_PATH = '/api/socket';

export class SocketIoClientProvider implements SocketClientProviderAbstract {
    private server: Socket;

    constructor() {
        fetch(SOCKET_SERVER_PATH);
        this.server = io();
    }

    public emit(event: SocketClientEventName, data: unknown) {
        this.server.emit(event, data);
    }

    public on<T>(
        event: SocketServerEventName,
        listener: ClientListenerCallback<T>,
    ) {
        this.server.on(event, listener);
    }

    public removeEventListener(event: SocketServerEventName) {
        this.server.removeListener(event);
    }

    public removeAllEventListener() {
        this.server.removeAllListeners();
    }

    public disconnect() {
        this.removeAllEventListener();
        this.server.disconnect();
    }
}
