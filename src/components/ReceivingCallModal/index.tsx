import React from 'react';
import { BiX } from 'react-icons/bi';

import useAppContext from '../../contexts/AppContext';
import * as S from './styles';

interface ReceivingCallModalProps {
	visible: boolean;
	onClose: () => void;
}

const ReceivingCallModal: React.FC<ReceivingCallModalProps> = ({ visible, onClose }) => {

	const { acceptCall } = useAppContext();

	return (
		<S.ReceivingCallModal visible={ visible }>
			<div className="receivingcall">
				<header className="receivingcall__header">
					<h2 className="receivingcall__title">
						Fernando is calling you
					</h2>

					<button className="receivingcall__close" onClick={ onClose }>
						<BiX />
					</button>
				</header>

				<div className="receivingcall__content">
					<button className="receivingcall__button receivingcall__button-default">
						Decline
					</button>

					<button className="receivingcall__button receivingcall__button-primary">
						Accept
					</button>
				</div>
			</div>
		</S.ReceivingCallModal>
	);

}

export default ReceivingCallModal;
