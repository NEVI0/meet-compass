import { FC } from 'react';

import { useMeet } from '@app/presentation/contexts/MeetContext';
import { useTheme } from '@app/presentation/contexts/ThemeContext';

import { IconButton, DropdownMenu } from '@app/presentation/components';

import { useCopyMeetLink } from '../../hooks';
import { useMeetPrivateContext } from '../../context';
import * as S from './styles';

export const Header: FC = () => {
    const { meet } = useMeet();
    const { copyLink } = useCopyMeetLink();
    const { chat } = useMeetPrivateContext();
    const { theme, toggleTheme } = useTheme();

    if (!meet) return undefined;

    return (
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

                <IconButton icon="chat" onClick={chat.toogle} />
            </div>
        </S.Container>
    );
};
