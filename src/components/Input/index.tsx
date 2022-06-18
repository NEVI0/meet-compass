import React from 'react';
import * as S from './styles';

interface InputProps {
	name: string;
	placeholder: string;
	type?: string;
	disabled?: boolean;
	value: string;
	onChangeValue: (value: string) => void;
	icon: any;
}

const Input: React.FC<InputProps> = ({ name, placeholder, type = 'text', disabled = false, value, onChangeValue, icon }) => {
	return (
		<S.Input disabled={ disabled }>
			{ icon }

			<input
				name={ name }
				type={ type }
				disabled={ disabled }
				placeholder={ placeholder }
				value={ value }
				onChange={ event => onChangeValue(event.target.value) }
				className="input__field"
			/>
		</S.Input>
	);
}

export default Input;
