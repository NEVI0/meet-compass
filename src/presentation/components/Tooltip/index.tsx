import { FC, ReactNode } from 'react';

import * as S from './styles';

interface TooltipAbstract {
    message: string;
    forceHide?: boolean;
    children: ReactNode;
}

export const Tooltip: FC<TooltipAbstract> = ({
    message,
    forceHide = false,
    children,
}) => {
    return (
        <S.Container forceHide={forceHide}>
            <span className="tooltip">{message}</span>
            <>{children}</>
        </S.Container>
    );
};
