import { FC } from 'react';

import {
    BiCompass,
    BiSend,
    BiX,
    BiAt,
    BiUser,
    BiUserCircle,
    BiMenu,
    BiVideo,
    BiVideoOff,
    BiMicrophone,
    BiMicrophoneOff,
    BiDesktop,
    BiPhoneOff,
    BiChat,
    BiEdit,
    BiUserX,
    BiCopy,
    BiExpand,
    BiPlus,
    BiEnvelope,
} from 'react-icons/bi';

import { useTheme } from '@presentation/contexts/ThemeContext';

const ICONS = {
    compass: BiCompass,
    send: BiSend,
    x: BiX,
    at: BiAt,
    user: BiUser,
    'user-x': BiUserX,
    'user-circle': BiUserCircle,
    menu: BiMenu,
    video: BiVideo,
    'video-off': BiVideoOff,
    microphone: BiMicrophone,
    'microphone-off': BiMicrophoneOff,
    desktop: BiDesktop,
    'phone-off': BiPhoneOff,
    chat: BiChat,
    edit: BiEdit,
    copy: BiCopy,
    expand: BiExpand,
    plus: BiPlus,
    mail: BiEnvelope,
};

export type IconName = keyof typeof ICONS;

interface IconAbstract {
    name: IconName;
    color?: string;
    className?: string;
}

export const Icon: FC<IconAbstract> = ({ name, color = '#000', className }) => {
    const { theme } = useTheme();

    const BuiltIcon = ICONS[name];
    if (!BuiltIcon) return <span>!</span>;

    return (
        <BuiltIcon
            fill={color}
            className={className}
            fontSize={theme.typography.size.icon}
        />
    );
};
