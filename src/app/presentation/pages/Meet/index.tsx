import { FC } from 'react';

import { useMeet } from '@app/presentation/contexts/MeetContext';
import { Redirect } from '@app/presentation/components';

import { MeetPrivateProvider } from './context';
import {
    Header,
    Content,
    Footer,
    Chat,
    ParticipantsRequestingAccessModal,
} from './components';
import {
    useLeavingParticipant,
    useMeetUpdate,
    useMedia,
    useChat,
} from './hooks';

import * as S from './styles';

export const Meet: FC = () => {
    const { meet, user } = useMeet();

    const chat = useChat();
    const media = useMedia();

    useLeavingParticipant();
    useMeetUpdate(media);

    if (!meet || !user) return <Redirect to="/home" />;

    return (
        <MeetPrivateProvider value={{ media, chat }}>
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
