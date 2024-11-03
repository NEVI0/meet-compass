import { FC } from 'react';
import Head from 'next/head';

import { useMeet } from '@presentation/contexts/MeetContext';
import { useTheme } from '@presentation/contexts/ThemeContext';
import { useLocale } from '@presentation/contexts/LocaleContext';

import { IconButton, DropdownMenu } from '@presentation/components';

import { useCopyMeetLink } from '../../hooks';
import * as S from './styles';

export const Header: FC = () => {
    const { t } = useLocale();
    const { meet } = useMeet();
    const { copyLink } = useCopyMeetLink();
    const { theme, toggleTheme } = useTheme();

    if (!meet) return undefined;

    return (
        <>
            <Head>
                <title>Meet Compass - {t('page.meet.title')}</title>
            </Head>

            <S.Container>
                <h2>{meet.name}</h2>

                <div>
                    <DropdownMenu
                        content={
                            <>
                                <DropdownMenu.Option
                                    onClick={() => console.log('Teste')}
                                >
                                    Português
                                </DropdownMenu.Option>

                                <DropdownMenu.Option
                                    onClick={() => console.log('Teste')}
                                >
                                    English
                                </DropdownMenu.Option>
                            </>
                        }
                    >
                        <IconButton icon="locale" />
                    </DropdownMenu>

                    <IconButton icon="share" onClick={copyLink} />

                    <IconButton
                        icon={theme.darkMode ? 'sun' : 'moon'}
                        onClick={toggleTheme}
                    />

                    <IconButton icon="chat" />
                </div>
            </S.Container>
        </>
    );
};
