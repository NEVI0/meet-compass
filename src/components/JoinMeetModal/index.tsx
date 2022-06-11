import React, { useState } from 'react';
import { BiAt, BiRightArrowAlt, BiX } from 'react-icons/bi';

import * as S from './styles';

interface JoinMeetModalProps {
	visible: boolean;
	onClose: () => void;
}

const JoinMeetModal: React.FC<JoinMeetModalProps> = ({ visible, onClose }) => {

	const [ meetLink, setMeetLink ] = useState<string>('');

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

				<div className="joinmeet__input-row">
					<div className="input">
						<BiAt className="input__icon" />

						<input
							type="text"
							className="input__field"
							placeholder="Meet link"
							value={ meetLink }
							onChange={ event => setMeetLink(event.target.value) }
						/>
					</div>

					<button className="joinmeet__button" disabled={ !meetLink }>
						Join <BiRightArrowAlt className="joinmeet__button-icon" />
					</button>
				</div>
			</div>
		</S.JoinMeetModal>
	);

}

export default JoinMeetModal;
