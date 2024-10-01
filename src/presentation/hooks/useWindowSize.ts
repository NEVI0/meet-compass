import { useState, useEffect } from 'react';

import { getWindowDimensions } from '@presentation/helpers';

type Size = { width: number; height: number };
type Breakpoint = 'xsm' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export const useWindowSize = () => {
    const [size, setSize] = useState<Size>(getWindowDimensions());
    const [breakpoint, setBreakpoint] = useState<Breakpoint>('md');

    useEffect(() => {
        const handleResize = () => {
            const { width, height } = getWindowDimensions();
            setSize({ width, height });

            if (width < 576) setBreakpoint('xsm');
            if (width >= 576) setBreakpoint('sm');
            if (width >= 768) setBreakpoint('md');
            if (width >= 992) setBreakpoint('lg');
            if (width >= 1200) setBreakpoint('xl');
            if (width >= 1400) setBreakpoint('xxl');
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return { size, breakpoint };
};
