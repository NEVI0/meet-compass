import { FC } from 'react';

import { useLocale } from '@presentation/contexts/LocaleContext';
import { useWindowSize } from '@presentation/hooks';

import { Animation } from '@presentation/components';

import { ANIMATIONS } from '@presentation/constants/animations';

import { useCopyMeetLink } from '@presentation/pages/meet/hooks';
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
                animation={{
                    data: ANIMATIONS.SPACE,
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
