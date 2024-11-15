import { FC } from 'react';
import moment from 'moment';

import * as S from './styles';

interface MessageAbstract {
    message: string;
    sent: {
        by: string;
        at: string;
    };

    variant: S.Variant;
}

export const Message: FC<MessageAbstract> = ({ message, sent, variant }) => {
    return (
        <S.Container variant={variant}>
            <div>
                <p>{message}</p>
            </div>

            <small>
                {sent.by} at {moment(sent.at).format('HH:MM')}
            </small>
        </S.Container>
    );
};
