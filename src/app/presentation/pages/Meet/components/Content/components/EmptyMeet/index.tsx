import { FC } from 'react';

import { useLocale } from '@app/presentation/contexts/LocaleContext';
import { useWindowSize } from '@app/presentation/hooks';

import { Animation } from '@app/presentation/components';

import { useCopyMeetLink } from '@app/presentation/pages/Meet/hooks';
import { ANIMATION_DIMENSIONS } from './constants/animationDimensions';
import * as S from './styles';

export const EmptyMeet: FC = () => {
    const { t } = useLocale();
    const { copyLink } = useCopyMeetLink();
    const { breakpoint } = useWindowSize();

    return (
        <S.Container>
            <Animation
                loop={true}
                animation="space"
                size={{
                    width: ANIMATION_DIMENSIONS[breakpoint].width,
                    height: ANIMATION_DIMENSIONS[breakpoint].height,
                }}
            />

            <div>
                <h2>{t('page.meet.empty.title')}</h2>

                <p>
                    {t('page.meet.empty.message')}
                    <button onClick={copyLink}>
                        {t('page.meet.empty.messageLink')}
                    </button>
                </p>
            </div>
        </S.Container>
    );
};
