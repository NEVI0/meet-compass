import React from 'react';

import { theme } from '../../styles/theme';
import * as S from './styles';

interface ButtonProps {
	children: any;
	bgColor?: string;
	actionBgColor?: string;
	disabled?: boolean;
	onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({
	children,
	bgColor = theme.colors.primary,
	actionBgColor = theme.colors.secondary,
	disabled = false,
	onClick
}) => {
	return (
		<S.Button
			disabled={ disabled }
			bgColor={ bgColor }
			actionBgColor={ actionBgColor }
			onClick={ onClick }
		>
			{ children }
		</S.Button>
	);
}

export default Button;
