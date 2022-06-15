import React from 'react';
import { BiX } from 'react-icons/bi';

import useAppContext from '../../contexts/AppContext';
import * as S from './styles';

const ReceivingCallModal: React.FC<{ visible: boolean; }> = ({ visible }) => {

	const { otherUserData, acceptMeetRequest, rejectMeetRequest } = useAppContext();

	return (
		<S.ReceivingCallModal visible={ visible }>
			<div className="receivingcall">
				<header className="receivingcall__header">
					<h2 className="receivingcall__title">
						{ otherUserData.name } is calling you
					</h2>

					<button className="receivingcall__close" onClick={ rejectMeetRequest }>
						<BiX />
					</button>
				</header>

				<div className="receivingcall__content">
					<button className="receivingcall__button receivingcall__button-default" onClick={ rejectMeetRequest }>
						Decline
					</button>

					<button className="receivingcall__button receivingcall__button-primary" onClick={ acceptMeetRequest }>
						Accept
					</button>
				</div>
			</div>
		</S.ReceivingCallModal>
	);

}

export default ReceivingCallModal;
