import { FC, useState } from 'react';

import { useMeet } from '@presentation/contexts/MeetContext';

import { Redirect } from '@presentation/components';

import {
    Header,
    Content,
    Footer,
    Chat,
    ParticipantsRequestingAccessModal,
} from './components';
import { MeetPrivateProvider } from './context';
import { useLeavingParticipant, useMeetUpdate, useMedia } from './hooks';
import * as S from './styles';

export const Meet: FC = () => {
    const { meet, user } = useMeet();

    useMeetUpdate();
    useLeavingParticipant();
    const media = useMedia();

    const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

    if (!meet || !user) return <Redirect to="/home" />;

    return (
        <MeetPrivateProvider
            value={{
                media,
                chat: {
                    open: isChatOpen,
                    toogle: () => setIsChatOpen(currentValue => !currentValue),
                },
            }}
        >
            <S.Container>
                <Header />
                <Content />
                <Footer />

                <Chat />
                <ParticipantsRequestingAccessModal />
            </S.Container>
        </MeetPrivateProvider>
    );
};
