import React, { useState, useEffect, useContext, createContext } from 'react';
import i18n from '../i18n';

type TLanguage = 'en' | 'pt';

export interface AppContextProps {
	selectedLanguage: TLanguage;
	changeSelectedLanguage: () => void;
}

const AppContext: React.Context<AppContextProps> = createContext({} as AppContextProps);

export const AppProvider: React.FC<{ testData?: any; children: any; }> = ({ testData, children }) => {

	const [ selectedLanguage, setSelectedLanguage ] = useState<TLanguage>('en');

	const changeSelectedLanguage = () => {
		try {
			const languageToSet = selectedLanguage === 'en' ? 'pt' : 'en';
			localStorage.setItem('@MEET_COMPASS:language', languageToSet);
			setSelectedLanguage(languageToSet);
			i18n.changeLanguage(languageToSet);
		} catch (error) {
			console.log('Error: ', error);
		}
	}

	useEffect(() => {
		const language = localStorage.getItem('@MEET_COMPASS:language'); // @ts-ignore
		setSelectedLanguage(language || 'en');
		i18n.changeLanguage(language || 'en');
	}, []);

	return (
		<AppContext.Provider
			value={{ 
				selectedLanguage, 
				changeSelectedLanguage,
				...testData
			}}
		>
			{ children }
		</AppContext.Provider>
	);

}

const useAppContext = () => useContext(AppContext);
export default useAppContext;
