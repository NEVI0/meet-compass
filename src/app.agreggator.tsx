import { FC, ReactNode } from 'react';

import { AppContexts } from '@presentation/contexts';

export const AppAgreggator: FC<{ children: ReactNode }> = ({ children }) => {
    return <AppContexts>{children}</AppContexts>;
};
