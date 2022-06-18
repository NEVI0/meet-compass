import React, { useState } from 'react';
import { BiAt, BiEnvelope, BiUser, BiX } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';

import { Input, Button } from '..';

import useAppContext from '../../contexts/AppContext';
import * as S from './styles';

interface JoinMeetModalProps {
	visible: boolean;
	defaultMeetId?: string;
	onClose: () => void;
}

const JoinMeetModal: React.FC<JoinMeetModalProps> = ({ visible, defaultMeetId, onClose }) => {

	const { t } = useTranslation();
	const { meetOtherUser } = useAppContext();

	const [ error, setError ] = useState<string>('');
	const [ userName, setUserName ] = useState<string>('');
	const [ userEmail, setUserEmail ] = useState<string>('');
	const [ meetId, setMeetId ] = useState<string>(defaultMeetId || '');

	const [ isCalling, setIsCalling ] = useState<boolean>(false);

	const handleMeetUser = () => {
		try {
			setError('');
			setIsCalling(true);
			meetOtherUser(userName, userEmail, meetId);
		} catch (error) {
			setIsCalling(false);
			setError('Could not call the user!');
		}
	}

	const handleCloseModal = () => {
		setError('');
		setUserName('');
		setUserEmail('');
		setMeetId('');
		setIsCalling(false);

		onClose();
	}

	return (
		<S.JoinMeetModal visible={ visible } isCalling={ isCalling }>
			<div className="joinmeet">
				<header className="joinmeet__header">
					<h2 className="joinmeet__title">
						{ t('joinMeetModal.title') }
					</h2>

					<button className="joinmeet__close" onClick={ handleCloseModal }>
						<BiX />
					</button>
				</header>

				<div className="joinmeet__content">
					<Input
						name="name"
						placeholder={ t('inputPlaceholder.userName') }
						value={ userName }
						onChangeValue={ setUserName }
						icon={ <BiUser className="input__icon" /> }
					/>

					<Input
						name="email"
						placeholder={ t('inputPlaceholder.email') }
						value={ userEmail }
						onChangeValue={ setUserEmail }
						icon={ <BiEnvelope className="input__icon" /> }
					/>

					<Input
						name="meet-id"
						placeholder={ t('inputPlaceholder.meetId') }
						value={ meetId }
						onChangeValue={ setMeetId }
						icon={ <BiAt className="input__icon" /> }
					/>

					<Button
						disabled={ !userName || !userEmail || !meetId || isCalling }
						onClick={ handleMeetUser }
					>
						{ t('joinMeetModal.button') }
					</Button>
				</div>

				{
					error && (
						<span className="joinmeet__error">
							{ error }
						</span>
					)
				}
			</div>
		</S.JoinMeetModal>
	);

}

export default JoinMeetModal;
