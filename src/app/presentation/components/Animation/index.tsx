import React, { FC } from 'react';

import Lottie, { LottieProps } from 'react-lottie';

import { ANIMATIONS } from './constants/animations';

const LottieComponent = Lottie as unknown as React.FC<LottieProps>;

const LOTTIE_OPTIONS = {
    loop: false,
    autoplay: true,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
    },
};

interface SizeObject {
    width: number;
    height: number;
}

interface AnimationAbstract {
    animation: keyof typeof ANIMATIONS;
    size: SizeObject;
    loop?: boolean;
}

export const Animation: FC<AnimationAbstract> = ({
    animation,
    size,
    loop = false,
}) => (
    <LottieComponent
        isPaused={false}
        isStopped={false}
        isClickToPauseDisabled={true}
        style={{ transition: '.3s' }}
        width={size.width}
        height={size.height}
        options={{
            ...LOTTIE_OPTIONS,
            loop,
            animationData: ANIMATIONS[animation],
        }}
    />
);
