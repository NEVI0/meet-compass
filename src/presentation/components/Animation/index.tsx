import React, { FC } from 'react';

import Lottie, { LottieProps } from 'react-lottie';

const LottieComponent = Lottie as unknown as React.FC<LottieProps>;

const LOTTIE_OPTIONS = {
    loop: false,
    autoplay: true,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
    },
};

interface AnimationObject {
    data: object;
    width: number;
    height: number;
}

interface AnimationAbstract {
    animation: AnimationObject;
    loop?: boolean;
}

export const Animation: FC<AnimationAbstract> = ({
    animation,
    loop = false,
}) => {
    const { data, width, height } = animation;

    return (
        <LottieComponent
            isPaused={false}
            isStopped={false}
            isClickToPauseDisabled={true}
            style={{ transition: '.3s' }}
            width={width}
            height={height}
            options={{
                ...LOTTIE_OPTIONS,
                loop,
                animationData: data,
            }}
        />
    );
};
