import { FC, useRef } from 'react';

import { useMeet } from '@presentation/contexts/MeetContext';
import { useLocale } from '@presentation/contexts/LocaleContext';

import { useCopyMeetLink, useUserStream } from '../../hooks';

import { useLeaveMeet } from './hooks';
import { Timer, ActionButton } from './components';
import * as S from './styles';

export const Footer: FC = () => {
    const localUserVideoRef = useRef<HTMLVideoElement>(null);

    const leaveCtrl = useLeaveMeet();

    const { t } = useLocale();
    const { meet } = useMeet();
    const { copyLink } = useCopyMeetLink();
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

    if (!meet) return undefined;

    return (
        <S.Container>
            <Timer />

            <section>
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
                    loading={loading || leaveCtrl.loading}
                    label={t('page.meet.tooltip.left')}
                    icon="phone-off"
                    variant="red"
                    onClick={leaveCtrl.leave}
                />
            </section>

            <button onClick={copyLink}>{meet.id}</button>
        </S.Container>
    );
};
