import { DefaultEventsMap, Server, Socket } from 'socket.io';

export type SocketServerEventName =
    | 'updated-meet'
    | 'participant-requesting-meet-access'
    | 'request-accepted'
    | 'request-denied'
    | 'meet-not-available'
    | 'message';

export type SocketClientEventName =
    | 'register-user'
    | 'register-meet'
    | 'unregister-user'
    | 'unregister-meet'
    | 'request-meet-access'
    | 'answer-meet-access-request'
    | 'message';

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
