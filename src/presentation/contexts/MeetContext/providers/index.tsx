import { FC, ReactNode, useState } from 'react';

import { MeetContext, MeetContextAbstract } from '../hooks/useMeet';

export const MeetProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<MeetContextAbstract['user']>(null);
    const [meet, setMeet] = useState<MeetContextAbstract['meet']>(null);

    return (
        <MeetContext.Provider
            value={{
                meet,
                setMeet,

                user,
                setUser,
            }}
        >
            {children}
        </MeetContext.Provider>
    );
};
