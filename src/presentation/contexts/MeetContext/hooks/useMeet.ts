import { createContext, useContext } from 'react';
import { isEmpty } from 'lodash';

import { MeetAbstract } from '@domain/entities';

export interface MeetContextAbstract {
    meet: MeetAbstract | null;

    updateMeetData: (newMeetData: MeetContextAbstract['meet']) => void;
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
