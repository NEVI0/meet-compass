import React, { useState } from 'react';
import { BiLink, BiUser, BiRightArrowAlt, BiX } from 'react-icons/bi';

import * as S from './styles';

interface JoinMeetModalProps {
	visible: boolean;
	onClose: () => void;
}

const JoinMeetModal: React.FC<JoinMeetModalProps> = ({ visible, onClose }) => {

	const [ error, setError ] = useState<string>('');
	const [ userName, setUserName ] = useState<string>('');
	const [ meetLink, setMeetLink ] = useState<string>('');

	const handleJoinMeet = () => {
		setError('');
		if (!meetLink.includes('/meet/')) return setError('Invalid link!')
		console.log('Avaiable link!');
	}

	return (
		<S.JoinMeetModal visible={ visible }>
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
							value={ userName }
							onChange={ event => setUserName(event.target.value) }
						/>
					</div>

					<div className="joinmeet__input-row">
						<div className="input">
							<BiLink className="input__icon" />

							<input
								type="text"
								className="input__field"
								placeholder="Meet link"
								value={ meetLink }
								onChange={ event => setMeetLink(event.target.value) }
							/>
						</div>

						<button
							className="joinmeet__button"
							disabled={ !userName || !meetLink }
							onClick={ handleJoinMeet }
						>
							Join <BiRightArrowAlt className="joinmeet__button-icon" />
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
