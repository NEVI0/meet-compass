import React from 'react';
import * as S from './styles';

interface InputProps {
	label: string;
	type?: string;
	disabled?: boolean;
	value: string;
	onChangeValue: (value: string) => void;
	icon: any;
}

const Input: React.FC<InputProps> = ({ label, type = 'text', disabled = false, value, onChangeValue, icon }) => {
	return (
		<S.Input disabled={ disabled }>
			{ icon }

			<input
				type={ type }
				disabled={ disabled }
				placeholder={ label }
				value={ value }
				onChange={ event => onChangeValue(event.target.value) }
				className="input__field"
			/>
		</S.Input>
	);
}

export default Input;
