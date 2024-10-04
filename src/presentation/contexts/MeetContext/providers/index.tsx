import { FC, ReactNode } from 'react';

import { MeetContext } from '../hooks/useMeet';

export const MeetProvider: FC<{ children: ReactNode }> = ({ children }) => {
    return <MeetContext.Provider value={{}}>{children}</MeetContext.Provider>;
};
