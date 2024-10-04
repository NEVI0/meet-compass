import { FC, ReactNode } from 'react';

import * as S from './styles';

interface TooltipAbstract {
    message: string;
    children: ReactNode;
}

export const Tooltip: FC<TooltipAbstract> = ({ message, children }) => {
    return (
        <S.Container>
            <span className="tooltip">{message}</span>
            <>{children}</>
        </S.Container>
    );
};
