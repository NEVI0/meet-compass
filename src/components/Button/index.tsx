import React from 'react';
import * as S from './styles';

interface ButtonProps {
	children: any;
	disabled?: boolean;
	onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, disabled = false, onClick }) => {
	return (
		<S.Button
			disabled={ disabled }
			onClick={ onClick }
		>
			{ children }
		</S.Button>
	);
}

export default Button;
