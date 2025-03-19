import { FC } from 'react';

import { DropdownMenu, IconButton } from '@app/presentation/components';

import { useCopyMeetLink } from '@app/presentation/pages/Meet/hooks';
import { useMeetPrivateContext } from '@app/presentation/pages/Meet/context';

import { useTheme } from '@app/presentation/contexts/ThemeContext';

export const DesktopActions: FC = () => {
    const { copyLink } = useCopyMeetLink();
    const { chat } = useMeetPrivateContext();
    const { theme, toggleTheme } = useTheme();

    return (
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
    );
};
