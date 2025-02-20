import { io, Socket } from 'socket.io-client';

import { SocketClientProviderAbstract } from '@app/domain/providers';

const SOCKET_SERVER_PATH = '/api/socket';

export class SocketIoClientProvider implements SocketClientProviderAbstract {
    private server: Socket;

    constructor() {
        fetch(SOCKET_SERVER_PATH);
        this.server = io();
    }

    public emit: SocketClientProviderAbstract['emit'] = (event, data) => {
        this.server.emit(event, data);
    };

    public on: SocketClientProviderAbstract['on'] = (event, listener) => {
        this.server.on(event, listener);
    };

    public removeEventListener: SocketClientProviderAbstract['removeEventListener'] =
        event => {
            this.server.removeListener(event);
        };

    public removeAllEventListener: SocketClientProviderAbstract['removeAllEventListener'] =
        () => {
            this.server.removeAllListeners();
        };

    public disconnect: SocketClientProviderAbstract['disconnect'] = () => {
        this.removeAllEventListener();
        this.server.disconnect();
    };
}
