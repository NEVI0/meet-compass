import { useState, useEffect } from 'react';

import { getWindowDimensions } from '@presentation/helpers';

type Size = { width: number; height: number };
type Breakpoint = 'xsm' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

const getBreakPoint = (width: number) => {
    if (width < 576) return 'xsm';
    if (width >= 576) return 'sm';
    if (width >= 768) return 'md';
    if (width >= 992) return 'lg';
    if (width >= 1200) return 'xl';
    if (width >= 1400) return 'xxl';

    return 'md';
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
