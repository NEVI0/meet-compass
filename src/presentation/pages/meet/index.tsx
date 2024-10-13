import { FC, useRef } from 'react';
import Head from 'next/head';

import { useLocale } from '@presentation/contexts/LocaleContext';

import {
    ActionButton,
    IconButton,
    // EmptyMeet,
    Participants,
} from './components';

import { useUserStream } from './hooks';
import * as S from './styles';

export const Meet: FC = () => {
    const localUserVideoRef = useRef<HTMLVideoElement>(null);

    const { t } = useLocale();
    const {
        loading,
        hasUserStream,

        isUsingVideo,
        isUsingAudio,

        toggleVideo,
        toggleAudio,
    } = useUserStream({
        onSuccessGettingStream: stream => {
            if (!localUserVideoRef.current) return;
            localUserVideoRef.current.srcObject = stream;
        },
    });

    return (
        <S.Container>
            <Head>
                <title>Meet Compass - {t('page.meet.title')}</title>
            </Head>

            <header className="header">
                <h2 className="header__title">Meet Name</h2>

                <IconButton icon="menu" onClick={() => null} />
            </header>

            <main className="meet">
                <Participants />
            </main>

            <S.LocalUserVideo visible={isUsingVideo}>
                <video
                    id="localUserVideo"
                    ref={localUserVideoRef}
                    autoPlay
                    playsInline
                    muted
                />
            </S.LocalUserVideo>

            <footer className="footer">
                <span className="footer__info">12:00</span>

                <section className="footer__actions">
                    <ActionButton
                        loading={loading}
                        disabled={!hasUserStream}
                        icon={isUsingAudio ? 'microphone' : 'microphone-off'}
                        label={t(
                            isUsingAudio
                                ? 'page.meet.tooltip.microphone.disable'
                                : 'page.meet.tooltip.microphone.enable',
                        )}
                        onClick={toggleAudio}
                    />

                    <ActionButton
                        loading={loading}
                        disabled={!hasUserStream}
                        icon={isUsingVideo ? 'video' : 'video-off'}
                        label={t(
                            isUsingVideo
                                ? 'page.meet.tooltip.video.disable'
                                : 'page.meet.tooltip.video.enable',
                        )}
                        onClick={toggleVideo}
                    />

                    <ActionButton
                        loading={loading}
                        disabled={!hasUserStream}
                        label={t('page.meet.tooltip.shareScreen.start')}
                        icon="desktop"
                    />

                    <ActionButton
                        loading={loading}
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
