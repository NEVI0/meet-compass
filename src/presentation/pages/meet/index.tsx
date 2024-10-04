import { FC } from 'react';
import Head from 'next/head';

import { useLocale } from '@presentation/contexts/LocaleContext';

import { ActionButton, IconButton } from './components';

import * as S from './styles';

export const Meet: FC = () => {
    const { t } = useLocale();

    const meetName = 'Test';

    return (
        <S.Container>
            <Head>
                <title>Meet Compass - {t('page.meet.title')}</title>
            </Head>

            <header className="header">
                <h2 className="header__title">{meetName || 'Meet name'}</h2>

                <IconButton icon="menu" onClick={() => null} />
            </header>

            <main className="meet">dasdasd</main>

            <footer className="footer">
                <span className="footer__info">12:00</span>

                <section className="footer__actions">
                    <ActionButton
                        label={t('page.meet.tooltip.microphone.enable')}
                        icon="microphone"
                    />

                    <ActionButton
                        label={t('page.meet.tooltip.video.enable')}
                        icon="video"
                    />

                    <ActionButton
                        label={t('page.meet.tooltip.shareScreen.start')}
                        icon="desktop"
                    />

                    <ActionButton
                        label={t('page.meet.tooltip.left')}
                        icon="phone-off"
                        variant="red"
                    />
                </section>

                <span className="footer__info">fdfsdfdsfdsf</span>
            </footer>
        </S.Container>
    );
};
