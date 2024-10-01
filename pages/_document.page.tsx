import { FC } from 'react';
import { Html, Head, Main, NextScript } from 'next/document';

const Document: FC = () => (
    <Html lang="en">
        <Head>
            <meta charSet="utf-8" />

            <link
                rel="shortcut icon"
                href="assets/images/meet-compass-logo.png"
            />

            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link
                href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
                rel="stylesheet"
            />
        </Head>
        <body>
            <Main />
            <NextScript />
        </body>
    </Html>
);

export default Document;
