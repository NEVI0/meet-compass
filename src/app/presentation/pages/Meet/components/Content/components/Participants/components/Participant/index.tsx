import { FC, useEffect, useRef } from 'react';

import { UserAbstract } from '@shared/domain/entities';
import { Icon } from '@app/presentation/components';

import { useMeetPrivateContext } from '@app/presentation/pages/Meet/context';

import * as S from './styles';

interface ParticipantAbstract {
    participant: UserAbstract;
    index: number;
}

export const Participant: FC<ParticipantAbstract> = ({
    participant,
    index,
}) => {
    const participantVideoRef = useRef<HTMLVideoElement>(null);

    const { media } = useMeetPrivateContext();

    useEffect(() => {
        console.log({ participantStream: media.participantStream });

        if (media.participantStream && participantVideoRef.current) {
            participantVideoRef.current.srcObject = media.participantStream;
        }
    }, [media.participantStream]);

    return (
        <S.Container visible={true}>
            <video
                id={`remoteParticipantVideo[${index}]`}
                ref={participantVideoRef}
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
