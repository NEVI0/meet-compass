import { useEffect, useRef } from 'react';

import { useRouter } from 'next/router';
import { NextPage } from 'next';
import Head from 'next/head';

import { useMeet } from '@app/presentation/contexts/MeetContext';
import { useMedia } from '@app/presentation/hooks';

import { Button, Icon, Redirect } from '@app/presentation/components';

import * as S from './styles';

export const RequestStream: NextPage = () => {
    const localVideoRef = useRef<HTMLVideoElement>(null);

    const router = useRouter();
    const { meet, user } = useMeet();
    const { startStream, localStream, hasUserStream, loading } = useMedia();

    useEffect(() => {
        if (localStream && localVideoRef.current) {
            localVideoRef.current.srcObject = localStream;
        }
    }, [localStream]);

    if (!meet || !user) return <Redirect to="/" />;

    return (
        <S.Container>
            <Head>
                <title>Request video and audio | Meet Compass</title>
            </Head>

            <main>
                <header>
                    <h1>Just one thing before we continue...</h1>
                </header>

                <div>
                    <section>
                        <video
                            id="localVideo"
                            ref={localVideoRef}
                            autoPlay
                            playsInline
                            muted
                        />

                        {!hasUserStream && (
                            <aside>
                                <Icon name="video-off" />
                            </aside>
                        )}
                    </section>

                    <section>
                        <div>
                            <p>
                                Please, allow us to access your audio and video
                                so we can share it to the others participants.
                            </p>

                            <p>
                                To do that, go in your browser and allow it to
                                access your media:
                            </p>

                            <ol>
                                <li>Settings;</li>
                                <li>Enable camera;</li>
                                <li>Enable microphone;</li>
                                <li>Refresh page if necessary;</li>
                            </ol>

                            <p>And it is done! 😁</p>
                        </div>

                        <footer>
                            <Button
                                icon="lock-open"
                                loading={loading}
                                disabled={hasUserStream}
                                onClick={startStream}
                            >
                                Request video and audio
                            </Button>

                            <Button
                                variant="primary"
                                icon="arrow-right"
                                loading={loading}
                                disabled={!hasUserStream}
                                onClick={() => router.push('/meet')}
                            >
                                Continue
                            </Button>
                        </footer>
                    </section>
                </div>
            </main>
        </S.Container>
    );
};
