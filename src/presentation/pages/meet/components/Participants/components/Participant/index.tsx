import { FC, useEffect } from 'react';

import * as S from './styles';
import { Icon } from '@presentation/components';

interface ParticipantAbstract {
    index: number;
}

export const Participant: FC<ParticipantAbstract> = ({ index }) => {
    useEffect(() => {
        (async () => {
            const media = await navigator.mediaDevices.getUserMedia({
                audio: false,
                video: true,
            });
            const video = document.getElementById(
                `remoteParticipantVideo[${index}]`,
            );

            if (!video) return;
            (video as HTMLVideoElement).srcObject = media;
        })();
    }, []);

    return (
        <S.Container visible={true}>
            <video
                id={`remoteParticipantVideo[${index}]`}
                autoPlay
                playsInline
                muted
            />

            <div className="participant">
                <small className="participant__name">Nome do meliante</small>

                <div className="participant__stream">
                    <Icon name="microphone" />
                    <Icon name="video" />
                </div>
            </div>
        </S.Container>
    );
};
