import { FC, HTMLInputTypeAttribute } from 'react';

import { useField } from 'formik';

import { Icon, IconName } from '../Icon';
import { LoadingSpinner } from '../LoadingSpinner';

import * as S from './styles';

interface InputAbstract {
    name: string;
    label: string;
    placeholder?: string;
    icon: IconName;

    type?: HTMLInputTypeAttribute;
    error?: string;
    loading?: boolean;
    disabled?: boolean;
}

export const Input: FC<InputAbstract> = ({
    name,
    icon,
    label,
    placeholder,
    type = 'text',
    error,
    loading,
    disabled,
}) => {
    const [field, meta] = useField<string>(name);

    const isValid = Boolean(!meta.error && meta.touched);
    const hasError = Boolean(meta.error && meta.touched);

    return (
        <S.Container error={hasError} valid={isValid} disabled={disabled}>
            <label htmlFor={name}>{label}</label>

            <div className="input">
                <input
                    id={name}
                    type={type}
                    disabled={disabled || loading}
                    placeholder={placeholder}
                    {...field}
                />

                {loading ? (
                    <LoadingSpinner />
                ) : (
                    <Icon name={isValid ? 'double-check' : icon} />
                )}
            </div>

            {hasError && <span className="error">{meta.error}</span>}
        </S.Container>
    );
};
