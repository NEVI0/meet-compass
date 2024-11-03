import { FC, ReactNode } from 'react';

import * as Dropdown from '@radix-ui/react-dropdown-menu';

import { Option } from './components';
import * as S from './styles';

type DropdownMenuAbstract = FC<{
    content: ReactNode;
    children: ReactNode;
    onOpenChange?: (open: boolean) => void;
}> & {
    Option: typeof Option;
};

const DropdownMenu: DropdownMenuAbstract = ({
    onOpenChange,
    content,
    children,
}) => (
    <Dropdown.Root onOpenChange={onOpenChange}>
        <Dropdown.Trigger>{children}</Dropdown.Trigger>

        <Dropdown.Portal>
            <S.Container sideOffset={4}>
                <S.Arrow width={16} height={8} />
                {content}
            </S.Container>
        </Dropdown.Portal>
    </Dropdown.Root>
);

DropdownMenu.Option = Option;
DropdownMenu.Option.displayName = 'DropdownMenu.Option';

export default DropdownMenu;
