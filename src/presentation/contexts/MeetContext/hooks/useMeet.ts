import { createContext, useContext } from 'react';
import { isEmpty } from 'lodash';

interface MeetContextAbstract {}

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
