import { NextPage } from 'next';
import Head from 'next/head';

import { useMeet } from '@app/presentation/contexts/MeetContext';
import { useMedia } from '@app/presentation/hooks';
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
    useChat,
    useClearTempData,
} from './hooks';

import * as S from './styles';

export const Meet: NextPage = () => {
    const { meet, user } = useMeet();

    const chat = useChat();
    const media = useMedia();

    useMeetUpdate();
    useClearTempData();
    useLeavingParticipant();

    if (!meet || !user) return <Redirect to="/" />;

    return (
        <MeetPrivateProvider value={{ media: media, chat }}>
            <Head>
                <title>{meet.name} | Meet Compass</title>
            </Head>

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
