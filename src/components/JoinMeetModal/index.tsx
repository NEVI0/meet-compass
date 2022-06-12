import React, { useState } from 'react';
import { BiAt, BiUser, BiRightArrowAlt, BiX } from 'react-icons/bi';
import { Oval } from 'react-loader-spinner';

import useAppContext from '../../contexts/AppContext';
import { theme } from '../../styles/theme';
import * as S from './styles';

interface JoinMeetModalProps {
	visible: boolean;
	defaultMeetId?: string;
	onClose: () => void;
}

const JoinMeetModal: React.FC<JoinMeetModalProps> = ({ visible, defaultMeetId, onClose }) => {

	const { callGuest } = useAppContext();

	const [ error, setError ] = useState<string>('');
	const [ userName, setUserName ] = useState<string>('');
	const [ meetId, setMeetId ] = useState<string>(defaultMeetId || '');

	const [ isCalling, setIsCalling ] = useState<boolean>(false);

	const handleCallGuest = () => {
		try {
			setError('');
			setIsCalling(true);
			callGuest(meetId);
		} catch (error) {
			setIsCalling(false);
			setError('Could not call the user!');
		}
	}

	return (
		<S.JoinMeetModal visible={ visible } isCalling={ isCalling }>
			<div className="joinmeet">
				<header className="joinmeet__header">
					<h2 className="joinmeet__title">
						Join meet
					</h2>

					<button className="joinmeet__close" onClick={ onClose }>
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

					<div className="joinmeet__input-row">
						<div className="input">
							<BiAt className="input__icon" />

							<input
								type="text"
								className="input__field"
								placeholder="Meet ID"
								disabled={ isCalling }
								value={ meetId }
								onChange={ event => setMeetId(event.target.value) }
							/>
						</div>

						<button
							className="joinmeet__button"
							disabled={ !userName || !meetId || isCalling }
							onClick={ handleCallGuest }
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
