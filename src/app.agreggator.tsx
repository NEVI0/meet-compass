import { FC, ReactNode } from 'react';

import { AppContexts } from '@app/presentation/contexts';

export const AppAgreggator: FC<{ children: ReactNode }> = ({ children }) => {
    return <AppContexts>{children}</AppContexts>;
};
