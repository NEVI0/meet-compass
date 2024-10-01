import React from 'react';
import { BiX } from 'react-icons/bi';

import { IconButton, LanguageSwitch } from '..';

import useMeetContext from '../../contexts/MeetContext';
import * as S from './styles';

interface MenuProps {
	visible: boolean;
	onClose: () => void;
	children: any;
}

const Menu: React.FC<MenuProps> = ({ visible, onClose, children }) => {

	const { userData } = useMeetContext();

	return (
		<S.Menu data-testid="menu" visible={ visible }>
			<header className="menu__header">
				<div className="menu__data">
					<h2 className="menu__title">
						{ userData.name }
					</h2>

					<h3 className="menu__subtitle">
						{ userData.email }
					</h3>
				</div>

				<IconButton
					testId="closeMenuButton"
					onClick={ onClose }
					icon={ <BiX /> }
				/>
			</header>

			<main className="menu__content">
				{ children }
			</main>

			<footer className="menu__footer">
				<span className="menu__language">
					Language:
				</span>

				<LanguageSwitch />
			</footer>
		</S.Menu>
	);

}

export default Menu;
