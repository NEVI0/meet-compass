import { FC } from 'react';

import type { AppProps } from 'next/app';

import { AppAgreggator } from 'app.agreggator';

const App: FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <AppAgreggator>
            <Component {...pageProps} />
        </AppAgreggator>
    );
};

export default App;
