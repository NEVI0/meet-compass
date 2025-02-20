import { FC, useEffect } from 'react';

import { UserAbstract } from '@shared/domain/entities';
import { Icon } from '@app/presentation/components';

import * as S from './styles';

interface ParticipantAbstract {
    participant: UserAbstract;
    index: number;
}

export const Participant: FC<ParticipantAbstract> = ({
    participant,
    index,
}) => {
    useEffect(() => {
        console.log({ participant });
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
                <small className="participant__name">{participant.name}</small>

                <div className="participant__stream">
                    <Icon name="microphone" />
                    <Icon name="video" />
                </div>
            </div>
        </S.Container>
    );
};
