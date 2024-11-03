import { FC } from 'react';

import { useTheme } from '@presentation/contexts/ThemeContext';

import { DropdownMenu, IconButton } from '@presentation/components';

import * as S from './styles';

export const MoreOptions: FC = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <S.Container>
            {/* <DropdownMenu
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
            </DropdownMenu> */}

            <IconButton
                icon={theme.darkMode ? 'sun' : 'moon'}
                onClick={toggleTheme}
            />
        </S.Container>
    );
};
