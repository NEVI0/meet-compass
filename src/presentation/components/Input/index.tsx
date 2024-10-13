import { FC, HTMLInputTypeAttribute } from 'react';

import { useField } from 'formik';

import { Icon, IconName } from '../Icon';
import { LoadingSpinner } from '../LoadingSpinner';

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
    const [field, meta] = useField<string>(name);

    const hasError = Boolean(meta.error && meta.touched);

    return (
        <S.Container error={hasError} disabled={disabled}>
            <div className="input">
                <input
                    id={name}
                    type={type}
                    disabled={disabled || loading}
                    placeholder={placeholder}
                    {...field}
                />

                {loading ? <LoadingSpinner /> : <Icon name={icon} />}
            </div>

            {hasError && <span className="error">{meta.error}</span>}
        </S.Container>
    );
};
