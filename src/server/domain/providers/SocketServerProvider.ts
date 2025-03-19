import {
    IoServer,
    SocketClientEventName,
    SocketServer,
    SocketServerEventName,
} from '@shared/domain/entities';

export interface ServerListenerCallback<T> {
    (data: T): void;
}

export interface SocketServerProviderAbstract {
    io: IoServer;
    socket: SocketServer | undefined;

    connect(callback: VoidFunction): void;

    emit(event: SocketServerEventName, data: unknown): void;
    emitTo(socketId: string, event: SocketServerEventName, data: unknown): void;

    on<T>(
        event: SocketClientEventName,
        listener: ServerListenerCallback<T>,
    ): void;
}
