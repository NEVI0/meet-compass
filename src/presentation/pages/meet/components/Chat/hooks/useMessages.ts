import { useEffect, useState } from 'react';

import { SendMessageDTO } from '@domain/dtos';
import { makeListenForNewMessageUseCase } from '@domain/useCases';

interface MessageAbstract extends SendMessageDTO {}

export const useMessages = () => {
    const [messages, setMessages] = useState<MessageAbstract[]>([]);

    const addMessage = (newMessage: MessageAbstract) => {
        setMessages(currentMessages => [...currentMessages, newMessage]);
    };

    useEffect(() => {
        makeListenForNewMessageUseCase().execute({
            onReceive: addMessage,
        });
    }, []);

    return {
        messages,
        addMessage,
    };
};
