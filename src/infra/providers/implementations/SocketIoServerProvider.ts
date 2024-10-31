import {
    ServerListenerCallback,
    SocketServerProviderAbstract,
} from '@domain/providers';
import {
    IoServer,
    SocketServer,
    SocketClientEventName,
    SocketServerEventName,
} from '@domain/entities';

export class SocketIoServerProvider implements SocketServerProviderAbstract {
    public io: IoServer;
    public socket: SocketServer | undefined;

    constructor(server: IoServer) {
        this.io = server;
    }

    public connect(callback: () => void) {
        this.io.on('connection', socket => {
            this.socket = socket;
            callback();
        });
    }

    public emit(event: SocketServerEventName, data: unknown) {
        if (!this.socket) throw Error();
        this.socket.emit(event, data);
    }

    public emitToSocket(
        socketId: string,
        event: SocketServerEventName,
        data: unknown,
    ) {
        if (!this.socket) throw Error();
        this.socket.to(socketId).emit(event, data);
    }

    public on<T>(
        event: SocketClientEventName,
        listener: ServerListenerCallback<T>,
    ) {
        if (!this.socket) throw Error();
        this.socket.on(event, listener);
    }
}
