import { useEffect } from 'react';

import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { NextPage } from 'next';
import Head from 'next/head';

import { useWindowSize } from '@app/presentation/hooks';
import { Animation } from '@app/presentation/components';

import { ANIMATION_DIMENSIONS } from './constants/animationDimensions';
import * as S from './styles';

export const NotFound: NextPage = () => {
    const router = useRouter();

    const { t } = useTranslation();
    const { breakpoint } = useWindowSize();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.replace('/home');
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <S.Container>
            <Head>
                <title>Page not found | Meet Compass</title>
            </Head>

            <main>
                <Animation
                    loop={true}
                    animation="not-found"
                    size={{
                        width: ANIMATION_DIMENSIONS[breakpoint].width,
                        height: ANIMATION_DIMENSIONS[breakpoint].height,
                    }}
                />

                <div>
                    <h1>{t('page.notFound.title')}</h1>
                    <p>{t('page.notFound.message')}</p>
                </div>
            </main>
        </S.Container>
    );
};
