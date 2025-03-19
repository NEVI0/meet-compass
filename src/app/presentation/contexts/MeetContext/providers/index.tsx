import { FC, ReactNode, useRef, useState } from 'react';

import { MeetContext, MeetContextAbstract } from '../hooks/useMeet';

export const MeetProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const peersRef = useRef<any[]>([]);
    const [peers, setPeers] = useState<any[]>([]);

    const [user, setUser] = useState<MeetContextAbstract['user']>(null);
    const [meet, setMeet] = useState<MeetContextAbstract['meet']>(null);

    const [tempMeetData, setTempMeetData] =
        useState<MeetContextAbstract['tempMeetData']>(null);
    const [tempParticipantData, setTempParticipantData] =
        useState<MeetContextAbstract['tempParticipantData']>(null);

    return (
        <MeetContext.Provider
            value={{
                peersRef,
                peers,
                setPeers,

                meet,
                setMeet,

                user,
                setUser,

                tempMeetData,
                setTempMeetData,

                tempParticipantData,
                setTempParticipantData,
            }}
        >
            {children}
        </MeetContext.Provider>
    );
};
