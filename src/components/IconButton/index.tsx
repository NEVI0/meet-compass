import React from 'react';
import * as S from './styles';

interface IconButtonProps{
	icon: any;
	onClick: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({ icon, onClick }) => {
	return (
		<S.IconButton onClick={ onClick }>
			{ icon }
		</S.IconButton>
	);
}

export default IconButton;
