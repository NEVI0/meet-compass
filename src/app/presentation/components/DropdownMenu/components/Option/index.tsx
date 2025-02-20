import { FC, ReactNode } from 'react';

import * as Dropdown from '@radix-ui/react-dropdown-menu';

import * as S from './styles';

interface OptionAbstract {
    disabled?: boolean;
    className?: string;
    children: ReactNode;
    onClick?: () => void;
}

export const Option: FC<OptionAbstract> = ({
    onClick,
    disabled,
    children,
    className,
}) => (
    <Dropdown.Item asChild onClick={onClick} className={className}>
        <S.Container disabled={disabled}>{children}</S.Container>
    </Dropdown.Item>
);
