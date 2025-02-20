import { FC } from 'react';

import { useMeet } from '@app/presentation/contexts/MeetContext';
import { useLocale } from '@app/presentation/contexts/LocaleContext';

import { useWindowSize } from '@app/presentation/hooks';
import { useCopyMeetLink } from '../../hooks';

import { useLeaveMeet } from './hooks';
import { Timer, ActionButton } from './components';
import { useMeetPrivateContext } from '../../context';
import * as S from './styles';

export const Footer: FC = () => {
    const leaveCtrl = useLeaveMeet();

    const { t } = useLocale();
    const { meet } = useMeet();
    const { copyLink } = useCopyMeetLink();
    const { breakpoint } = useWindowSize();
    const { media } = useMeetPrivateContext();

    if (!meet) return undefined;

    const {
        loading,
        hasUserStream,

        isUsingAudio,
        isUsingVideo,

        toggleAudio,
        toggleVideo,
    } = media;

    const isUnderMd =
        breakpoint === 'md' || breakpoint === 'sm' || breakpoint === 'xsm';

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

            <button onClick={copyLink}>
                {isUnderMd ? 'Link Reunião' : meet.id}
            </button>
        </S.Container>
    );
};
