import { createContext, Dispatch, SetStateAction, useContext } from 'react';
import { isEmpty } from 'lodash';

import { MeetAbstract, UserAbstract } from '@domain/entities';

export interface MeetContextAbstract {
    user: UserAbstract | null;
    setUser: Dispatch<SetStateAction<UserAbstract | null>>;

    meet: MeetAbstract | null;
    setMeet: Dispatch<SetStateAction<MeetAbstract | null>>;
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
