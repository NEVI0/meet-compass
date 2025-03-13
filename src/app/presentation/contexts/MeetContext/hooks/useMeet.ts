import { createContext, Dispatch, SetStateAction, useContext } from 'react';
import { isEmpty } from 'lodash';

import { MeetAbstract, UserAbstract } from '@shared/domain/entities';

interface TempMeetDataAbstract {
    meet: {
        name: string;
    };
    owner: {
        name: string;
        email: string;
    };
}

export interface MeetContextAbstract {
    user: UserAbstract | null;
    setUser: Dispatch<SetStateAction<UserAbstract | null>>;

    meet: MeetAbstract | null;
    setMeet: Dispatch<SetStateAction<MeetAbstract | null>>;

    tempMeetData: TempMeetDataAbstract | null;
    setTempMeetData: Dispatch<SetStateAction<TempMeetDataAbstract | null>>;
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
