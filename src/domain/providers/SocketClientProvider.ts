import { SocketClientEventName, SocketServerEventName } from '@domain/entities';

export interface ClientListenerCallback<T> {
    (data: T): void;
}

export interface SocketClientProviderAbstract {
    emit(event: SocketClientEventName, data: any): void;
    on<T>(
        event: SocketServerEventName,
        listener: ClientListenerCallback<T>,
    ): void;

    removeEventListener(event: SocketServerEventName): void;
    removeAllEventListener(): void;

    disconnect(): void;
}
