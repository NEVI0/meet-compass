import { FC, useEffect, useRef } from 'react';

import { useMeetPrivateContext } from 'app/presentation/pages/Meet/context';
import * as S from './styles';

export const LocalVideo: FC = () => {
    const localVideoRef = useRef<HTMLVideoElement>(null);

    const { media } = useMeetPrivateContext();

    useEffect(() => {
        if (media.localStream && localVideoRef.current) {
            localVideoRef.current.srcObject = media.localStream;
        }
    }, [media.localStream]);

    return (
        <S.Container visible={media.isUsingVideo}>
            <video
                id="localVideo"
                ref={localVideoRef}
                autoPlay
                playsInline
                muted
            />
        </S.Container>
    );
};
