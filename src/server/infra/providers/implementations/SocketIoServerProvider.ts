import { IoServer, SocketServer } from '@shared/domain/entities';
import { SocketServerProviderAbstract } from '@server/domain/providers';
import { console } from 'inspector';

export class SocketIoServerProvider implements SocketServerProviderAbstract {
    public io: IoServer;
    public socket: SocketServer | undefined;

    constructor(server: IoServer) {
        console.log({ server });
        this.io = server;
    }

    public connect: SocketServerProviderAbstract['connect'] = callback => {
        this.io.on('connection', socket => {
            this.socket = socket;
            callback();
        });
    };

    public emit: SocketServerProviderAbstract['emit'] = (event, data) => {
        if (!this.socket) throw Error();
        this.socket.emit(event, data);
    };

    public emitToSocket: SocketServerProviderAbstract['emitToSocket'] = (
        socketId,
        event,
        data,
    ) => {
        if (!this.socket) throw Error();
        this.io.to(socketId).emit(event, data);
    };

    public on: SocketServerProviderAbstract['on'] = (event, listener) => {
        if (!this.socket) throw Error();
        this.socket.on(event, listener);
    };
}
