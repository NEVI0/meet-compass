import React from 'react';
import * as S from './styles';

interface InputProps {
	name: string;
	placeholder: string;
	type?: string;
	disabled?: boolean;
	value: string;
	error?: string;
	testId?: string;
	onChangeValue: (value: string) => void;
	onBlur?: (event: any) => void;
	icon: any;
}

const Input: React.FC<InputProps> = ({
	name,
	placeholder,
	type = 'text',
	disabled = false,
	value,
	error = '',
	testId,
	onChangeValue,
	onBlur,
	icon
}) => {
	return (
		<S.Input disabled={ disabled } hasError={ !!error }>
			<div className="input">
				{ icon }

				<input
					data-testid={ testId }
					name={ name }
					type={ type }
					disabled={ disabled }
					placeholder={ placeholder }
					value={ value }
					onChange={ event => onChangeValue(event.target.value) }
					onBlur={ onBlur }
					className="input__field"
				/>
			</div>

			{ error && <small className="error">{ error }</small> }
		</S.Input>
	);
}

export default Input;
