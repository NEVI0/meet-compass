import React, { useState } from 'react';
import { BiX } from 'react-icons/bi';
import { Oval } from 'react-loader-spinner';

import useAppContext from '../../contexts/AppContext';
import * as S from './styles';

const ReceivingCallModal: React.FC<{ visible: boolean; }> = ({ visible }) => {

	const { otherUserData, acceptMeetRequest, rejectMeetRequest } = useAppContext();
	const [ isAcceptingRequest, setIsAcceptingRequest ] = useState<boolean>(false);

	const handleAcceptMeetRequest = () => {
		setIsAcceptingRequest(true);
		acceptMeetRequest();
		setIsAcceptingRequest(false);
	}

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
					<button
						className="receivingcall__button receivingcall__button-default"
						onClick={ rejectMeetRequest }
					>
						Decline
					</button>

					<button
						className="receivingcall__button receivingcall__button-primary"
						disabled={ isAcceptingRequest }
						onClick={ handleAcceptMeetRequest }
					>
						{
							isAcceptingRequest ? (
								<Oval
									ariaLabel="loading-indicator"
									height={ 20 }
									width={ 20 }
									strokeWidth={ 5 }
									strokeWidthSecondary={ 5 }
									color="#fff"
									secondaryColor="transparent"
								/>
							) : 'Accept'
						}
					</button>
				</div>
			</div>
		</S.ReceivingCallModal>
	);

}

export default ReceivingCallModal;
