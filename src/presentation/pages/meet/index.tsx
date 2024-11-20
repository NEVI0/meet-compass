import { FC } from 'react';

import { useMeet } from '@presentation/contexts/MeetContext';

import { Redirect } from '@presentation/components';

import {
    Header,
    Content,
    Footer,
    Chat,
    ParticipantsRequestingAccessModal,
} from './components';
import { useLeavingParticipant, useMeetUpdate } from './hooks';
import * as S from './styles';

export const Meet: FC = () => {
    const { meet } = useMeet();

    useMeetUpdate();
    useLeavingParticipant();

    if (!meet) return <Redirect to="/home" />;

    return (
        <S.Container>
            <Header />
            <Content />
            <Footer />

            <Chat />
            <ParticipantsRequestingAccessModal />
        </S.Container>
    );
};
