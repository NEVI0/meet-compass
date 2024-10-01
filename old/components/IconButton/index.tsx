import React from 'react';
import * as S from './styles';

interface IconButtonProps{
	icon: any;
	testId?: string;
	onClick: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({ icon, testId, onClick }) => {
	return (
		<S.IconButton data-testid={ testId } onClick={ onClick }>
			{ icon }
		</S.IconButton>
	);
}

export default IconButton;
