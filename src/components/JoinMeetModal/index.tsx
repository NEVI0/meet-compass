import React, { useState } from 'react';
import { BiAt, BiEnvelope, BiUser, BiRightArrowAlt, BiX } from 'react-icons/bi';
import { Oval } from 'react-loader-spinner';

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
	const [ userToCallId, setUserToCallId ] = useState<string>(defaultUserToCallId || '');

	const [ isCalling, setIsCalling ] = useState<boolean>(false);

	const handleMeetUser = () => {
		try {
			setError('');
			setIsCalling(true);
			meetOtherUser(userName, userEmail, userToCallId);
		} catch (error) {
			setIsCalling(false);
			setError('Could not call the user!');
		}
	}

	const handleCloseModal = () => {
		setError('');
		setUserName('');
		setUserEmail('');
		setUserToCallId('');
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
					<div className="input">
						<BiUser className="input__icon" />

						<input
							type="text"
							className="input__field"
							placeholder="Your name"
							disabled={ isCalling }
							value={ userName }
							onChange={ event => setUserName(event.target.value) }
						/>
					</div>

					<div className="input">
						<BiEnvelope className="input__icon" />

						<input
							type="email"
							className="input__field"
							placeholder="E-mail"
							disabled={ isCalling }
							value={ userEmail }
							onChange={ event => setUserEmail(event.target.value) }
						/>
					</div>

					<div className="joinmeet__input-row">
						<div className="input">
							<BiAt className="input__icon" />

							<input
								type="text"
								className="input__field"
								placeholder="Meet ID"
								disabled={ isCalling }
								value={ userToCallId }
								onChange={ event => setUserToCallId(event.target.value) }
							/>
						</div>

						<button
							className="joinmeet__button"
							disabled={ !userName || !userEmail || !userToCallId || isCalling }
							onClick={ handleMeetUser }
						>
							{
								isCalling ? (
									<Oval
										ariaLabel="loading-indicator"
										height={20}
										width={20}
										strokeWidth={5}
										strokeWidthSecondary={5}
										color={ theme.colors.primary }
										secondaryColor={ theme.colors.container }
									/>
								) : <>
									Join <BiRightArrowAlt className="joinmeet__button-icon" />
								</>
							}
						</button>
					</div>
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
