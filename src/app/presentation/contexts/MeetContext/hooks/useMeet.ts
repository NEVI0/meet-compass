import {
    createContext,
    Dispatch,
    MutableRefObject,
    SetStateAction,
    useContext,
} from 'react';
import { isEmpty } from 'lodash';

import { MeetAbstract, UserAbstract } from '@shared/domain/entities';

type SetState<T> = Dispatch<SetStateAction<T>>;

interface TempMeetDataAbstract {
    meet: {
        name: string;
    };
    owner: {
        name: string;
        email: string;
    };
}

interface TempParticipantDataAbstract {
    meet: {
        id: string;
    };
    participant: {
        name: string;
        email: string;
    };
}

export interface MeetContextAbstract {
    peersRef: MutableRefObject<any[]>;
    peers: any[] | null;
    setPeers: SetState<any | null>;

    user: UserAbstract | null;
    setUser: SetState<UserAbstract | null>;

    meet: MeetAbstract | null;
    setMeet: SetState<MeetAbstract | null>;

    tempMeetData: TempMeetDataAbstract | null;
    setTempMeetData: SetState<TempMeetDataAbstract | null>;

    tempParticipantData: TempParticipantDataAbstract | null;
    setTempParticipantData: SetState<TempParticipantDataAbstract | null>;
}

export const MeetContext = createContext<MeetContextAbstract>(
    {} as MeetContextAbstract,
);

export const useMeet = () => {
    const context = useContext(MeetContext);

    if (isEmpty(context)) {
        throw new Error(
            'The hook "useMeet" should be called within a "MeetContext"!',
        );
    }

    return context;
};
