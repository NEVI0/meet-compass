import { FC, ReactNode, useState } from 'react';

import { MeetContext, MeetContextAbstract } from '../hooks/useMeet';

export const MeetProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [meet, setMeet] = useState<MeetContextAbstract['meet']>(null);
    const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

    const toogleChat = () => setIsChatOpen(currentValue => !currentValue);

    return (
        <MeetContext.Provider
            value={{
                meet,
                setMeet,
                chat: {
                    open: isChatOpen,
                    toogle: toogleChat,
                },
            }}
        >
            {children}
        </MeetContext.Provider>
    );
};
