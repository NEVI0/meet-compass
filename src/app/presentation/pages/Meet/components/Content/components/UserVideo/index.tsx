import { FC, useEffect, useRef } from 'react';

import { useMeetPrivateContext } from 'app/presentation/pages/Meet/context';
import * as S from './styles';

export const UserVideo: FC = () => {
    const userVideoRef = useRef<HTMLVideoElement>(null);

    const { media } = useMeetPrivateContext();

    useEffect(() => {
        if (media.stream && userVideoRef.current) {
            userVideoRef.current.srcObject = media.stream;
        }
    }, [media.stream]);

    return (
        <S.Container visible={media.isUsingVideo}>
            <video
                id="userVideo"
                ref={userVideoRef}
                autoPlay
                playsInline
                muted
            />
        </S.Container>
    );
};
