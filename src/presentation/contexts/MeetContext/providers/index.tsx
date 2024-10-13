import { FC, ReactNode, useState } from 'react';

import { MeetContext, MeetContextAbstract } from '../hooks/useMeet';

export const MeetProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [meet, setMeet] = useState<MeetContextAbstract['meet']>(null);

    const updateMeetData = (newMeetData: MeetContextAbstract['meet']) => {
        setMeet(newMeetData);
    };

    return (
        <MeetContext.Provider value={{ meet, updateMeetData }}>
            {children}
        </MeetContext.Provider>
    );
};
