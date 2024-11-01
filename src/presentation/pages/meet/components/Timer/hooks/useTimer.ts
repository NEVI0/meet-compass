import { useEffect, useState } from 'react';

export const useTimer = () => {
    const [count, setCount] = useState<number>(0);
    const [time, setTime] = useState<string>('00:00:00');

    let initTime = new Date();

    const showTimer = (ms: number) => {
        const second = Math.floor((ms / 1000) % 60)
            .toString()
            .padStart(2, '0');
        const minute = Math.floor((ms / 1000 / 60) % 60)
            .toString()
            .padStart(2, '0');
        const hour = Math.floor(ms / 1000 / 60 / 60).toString();

        const builtTime = hour.padStart(2, '0') + ':' + minute + ':' + second;
        setTime(builtTime);
    };

    useEffect(() => {
        let interval = setInterval(() => {
            // @ts-ignore
            let left = count + (new Date() - initTime);

            setCount(left);
            showTimer(left);

            if (left <= 0) {
                setTime('00:00:00');
                clearInterval(interval);
            }
        }, 1);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return { time };
};
