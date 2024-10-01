import { useState, useEffect } from 'react';

import { getWindowDimensions } from '../utils/functions';
import { TBreakpoint } from '../utils/types';

const useWindowBreakpoints = () => {
    const [breakpoint, setBreakpoint] = useState<TBreakpoint>('md');

    useEffect(() => {
        const handleResize = () => {
            const { width } = getWindowDimensions();

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

    return breakpoint;
};

export default useWindowBreakpoints;
