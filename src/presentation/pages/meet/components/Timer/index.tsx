import { FC } from 'react';
import { useTimer } from './hooks';

export const Timer: FC = () => {
    const { time } = useTimer();
    return <span className="footer__info">{time}</span>;
};
