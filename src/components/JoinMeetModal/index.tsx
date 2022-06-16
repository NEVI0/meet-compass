import React, { useState } from 'react';
import { BiAt, BiEnvelope, BiUser, BiX } from 'react-icons/bi';
import { Oval } from 'react-loader-spinner';

import { Input, Button } from '..';

import useAppContext from '../../contexts/AppContext';
import { theme } from '../../styles/theme';
import * as S from './styles';

interface JoinMeetModalProps {
	visible: boolean;
	defaultUserToCallId?: string;
	onClose: () => void;
}

const JoinMeetModal: React.FC<JoinMeetModalProps> = ({ visible, defaultUserToCallId, onClose }) => {

	const { meetOtherUser } = useAppContext();

	const [ error, setError ] = useState<string>('');
	const [ userName, setUserName ] = useState<string>('');
	const [ userEmail, setUserEmail ] = useState<string>('');
	const [ meetId, setMeetId ] = useState<string>(defaultUserToCallId || '');

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
						Join meet
					</h2>

					<button className="joinmeet__close" onClick={ handleCloseModal }>
						<BiX />
					</button>
				</header>

				<div className="joinmeet__content">
					<Input
						label="Your name"
						value={ userName }
						onChangeValue={ setUserName }
						icon={ <BiUser className="input__icon" /> }
					/>

					<Input
						label="E-mail"
						value={ userEmail }
						onChangeValue={ setUserEmail }
						icon={ <BiEnvelope className="input__icon" /> }
					/>

					<Input
						label="Meet ID"
						value={ meetId }
						onChangeValue={ setMeetId }
						icon={ <BiAt className="input__icon" /> }
					/>

					<Button
						disabled={ !userName || !userEmail || !meetId || isCalling }
						onClick={ handleMeetUser }
					>
						Join meet
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
