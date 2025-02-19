import { DefaultEventsMap, Server, Socket } from 'socket.io';

export type SocketServerEventName =
    | 'updated-meet'
    | 'participant-requesting-meet-access'
    | 'request-accepted'
    | 'request-denied'
    | 'meet-not-available'
    | 'message'
    | 'participant-left';

export type SocketClientEventName =
    | 'register-user'
    | 'register-meet'
    | 'unregister-user'
    | 'unregister-meet'
    | 'request-meet-access'
    | 'answer-meet-access-request'
    | 'message'
    | 'leave-meet';

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
