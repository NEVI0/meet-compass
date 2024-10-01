import { FC, HTMLInputTypeAttribute } from 'react';

import { Icon, IconName } from '../Icon';
import * as S from './styles';

interface InputAbstract {
    name: string;
    placeholder: string;
    icon: IconName;

    type?: HTMLInputTypeAttribute;
    error?: string;
    loading?: boolean;
    disabled?: boolean;
}

export const Input: FC<InputAbstract> = ({
    name,
    icon,
    placeholder,
    type = 'text',
    error,
    loading,
    disabled,
}) => {
    return (
        <S.Container error={!!error} disabled={disabled}>
            <div className="input">
                <input
                    id={name}
                    name={name}
                    type={type}
                    disabled={disabled || loading}
                    placeholder={placeholder}
                />

                {loading ? <span></span> : <Icon name={icon} />}
            </div>

            {!!error && <span className="error">{error}</span>}
        </S.Container>
    );
};
