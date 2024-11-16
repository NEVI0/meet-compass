import { SendMessageDTO } from './SendMessageDTO';

export interface ListenForNewMessageDTO {
    onReceive(newMessage: SendMessageDTO): void;
}
