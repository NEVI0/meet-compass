import React from 'react';
import Image from 'next/image';

import useAppContext from '../../contexts/AppContext';
import * as S from './styles';

const LanguageSwitch: React.FC = () => {
	
	const { selectedLanguage, changeSelectedLanguage } = useAppContext();

	return (
		<S.LanguageSwitch data-testid="languageSwitch" onClick={ changeSelectedLanguage }>
			<Image
				width={ 20 }
				height={ 20 }
				src={`/assets/images/${selectedLanguage === 'en' ? 'usa' : 'brazil'}-icon.png`}
				alt={ selectedLanguage === 'en' ? 'United States flag' : 'Brazil flag' }
				className="language__icon"
			/>

			<span className="language__initials">
				{ selectedLanguage }
			</span>
		</S.LanguageSwitch>
	);

}

export default LanguageSwitch;
