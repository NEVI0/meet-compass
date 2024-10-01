import { FC } from 'react';

import { Oval } from 'react-loader-spinner';
import { lighten } from 'polished';

import { useTheme } from '@presentation/contexts/ThemeContext';

export const LoadingSpinner: FC = () => {
    const { theme } = useTheme();

    return (
        <Oval
            visible={true}
            height={theme.typography.size.icon}
            width={theme.typography.size.icon}
            color={theme.colors.primary}
            secondaryColor={lighten(0.25, theme.colors.primary)}
            strokeWidth={4}
            ariaLabel="oval-loading"
        />
    );
};
