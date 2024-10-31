import { DefaultEventsMap, Server, Socket } from 'socket.io';

export type SocketServerEventName =
    | 'participant-requesting-meet-access'
    | 'request-accepted'
    | 'request-denied';

export type SocketClientEventName =
    | 'register-user'
    | 'register-meet'
    | 'unregister-user'
    | 'unregister-meet'
    | 'request-meet-access'
    | 'answer-meet-access-request';

export type IoServer = Server<
    DefaultEventsMap,
    DefaultEventsMap,
    DefaultEventsMap,
    any
>;

export type SocketServer = Socket<
    DefaultEventsMap,
    DefaultEventsMap,
    DefaultEventsMap,
    any
>;
