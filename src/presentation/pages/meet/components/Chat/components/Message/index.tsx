import { FC } from 'react';
import moment from 'moment';

import { UserAbstract } from '@domain/entities';

import * as S from './styles';

interface MessageAbstract {
    message: string;
    sent: {
        by: UserAbstract;
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
                {variant === 'current-user' ? 'You' : sent.by.name} at{' '}
                {moment(sent.at).format('HH:mm')}
            </small>
        </S.Container>
    );
};
