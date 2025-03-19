import { FC } from 'react';

import { DropdownMenu, IconButton } from '@app/presentation/components';

import { useCopyMeetLink } from '@app/presentation/pages/Meet/hooks';
import { useMeetPrivateContext } from '@app/presentation/pages/Meet/context';

import { useTheme } from '@app/presentation/contexts/ThemeContext';

export const MobileActions: FC = () => {
    const { copyLink } = useCopyMeetLink();
    const { chat } = useMeetPrivateContext();
    const { toggleTheme } = useTheme();

    return (
        <div>
            <DropdownMenu
                content={
                    <>
                        <DropdownMenu.Option onClick={() => null}>
                            Português
                        </DropdownMenu.Option>

                        <DropdownMenu.Option onClick={() => null}>
                            English
                        </DropdownMenu.Option>

                        <DropdownMenu.Option onClick={copyLink}>
                            Copiar link da reunião
                        </DropdownMenu.Option>

                        <DropdownMenu.Option onClick={toggleTheme}>
                            Mudar tema
                        </DropdownMenu.Option>

                        <DropdownMenu.Option onClick={chat.toogle}>
                            Chat
                        </DropdownMenu.Option>
                    </>
                }
            >
                <IconButton icon="options" />
            </DropdownMenu>
        </div>
    );
};
