import { useState } from 'react';

export const useChat = () => {
    const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

    return {
        open: isChatOpen,
        toogle: () => setIsChatOpen(currentValue => !currentValue),
    };
};
