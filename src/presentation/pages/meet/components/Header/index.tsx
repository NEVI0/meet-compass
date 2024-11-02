import { FC } from 'react';
import Head from 'next/head';

import { useMeet } from '@presentation/contexts/MeetContext';
import { useLocale } from '@presentation/contexts/LocaleContext';

import { IconButton } from '@presentation/components';

import * as S from './styles';

export const Header: FC = () => {
    const { t } = useLocale();
    const { meet } = useMeet();

    if (!meet) return undefined;

    return (
        <>
            <Head>
                <title>Meet Compass - {t('page.meet.title')}</title>
            </Head>

            <S.Container>
                <h2>{meet.name}</h2>

                <IconButton icon="menu" onClick={() => null} />
            </S.Container>
        </>
    );
};
