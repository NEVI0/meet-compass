import { createContext, useContext } from 'react';
import { isEmpty } from 'lodash';

type StreamType = MediaStream | null;

interface MediaAbstract {
    stream: StreamType;
    loading: boolean;
    hasUserStream: boolean;

    isUsingVideo: boolean;
    isUsingAudio: boolean;

    toggleVideo: () => void;
    toggleAudio: () => void;
}

interface ChatAbstract {
    open: boolean;
    toogle: () => void;
}

interface MeetPrivateContextAbstract {
    chat: ChatAbstract;
    media: MediaAbstract;
}

const MeetPrivateContext = createContext({} as MeetPrivateContextAbstract);

export const MeetPrivateProvider = MeetPrivateContext.Provider;

export const useMeetPrivateContext = () => {
    const context = useContext(MeetPrivateContext);

    if (isEmpty(context)) {
        throw new Error(
            'The hook "useMeetPrivateContext" should be called within a "MeetPrivateProvider"!',
        );
    }

    return context;
};
