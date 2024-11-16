import { FC, useEffect } from 'react';

import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

import { useWindowSize } from '@presentation/hooks';

import { Animation } from '@presentation/components';
import { ANIMATIONS } from '@presentation/constants/animations';

import { ANIMATION_DIMENSIONS } from './constants/animationDimensions';
import * as S from './styles';

export const NotFound: FC = () => {
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
            <main>
                <Animation
                    loop={true}
                    animation={{
                        data: ANIMATIONS.NOT_FOUND,
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
