import { useState, useEffect } from 'react';

import { getWindowDimensions } from '@presentation/helpers';

type Size = { width: number; height: number };
type Breakpoint = 'xsm' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

const getBreakPoint = (width: number) => {
    let breakpoint: Breakpoint = 'md';

    if (width < 576) breakpoint = 'xsm';
    if (width >= 576) breakpoint = 'sm';
    if (width >= 768) breakpoint = 'md';
    if (width >= 992) breakpoint = 'lg';
    if (width >= 1200) breakpoint = 'xl';
    if (width >= 1400) breakpoint = 'xxl';

    return breakpoint;
};

export const useWindowSize = () => {
    const [size, setSize] = useState<Size>(getWindowDimensions());
    const [breakpoint, setBreakpoint] = useState<Breakpoint>(
        getBreakPoint(size.width),
    );

    useEffect(() => {
        const handleResize = () => {
            const { width, height } = getWindowDimensions();

            setSize({ width, height });
            setBreakpoint(getBreakPoint(width));
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return { size, breakpoint };
};
