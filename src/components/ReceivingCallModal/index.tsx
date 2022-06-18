import React from 'react';
import { BiX } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';

import { darken } from 'polished';

import { Button } from '..';
import useAppContext from '../../contexts/AppContext';
import { theme } from '../../styles/theme';
import * as S from './styles';

const ReceivingCallModal: React.FC<{ visible: boolean; }> = ({ visible }) => {

	const { t } = useTranslation();
	const { otherUserData, acceptMeetRequest, rejectMeetRequest } = useAppContext();

	return (
		<S.ReceivingCallModal visible={ visible }>
			<div className="receivingcall">
				<header className="receivingcall__header">
					<h2 className="receivingcall__title">
						{ t('receivingCallModal.title', { user: otherUserData.name }) }
					</h2>

					<button className="receivingcall__close" onClick={ rejectMeetRequest }>
						<BiX />
					</button>
				</header>

				<div className="receivingcall__content">
					<Button
						bgColor={ theme.colors.red }
						actionBgColor={ darken(.2, theme.colors.red) }
						onClick={ rejectMeetRequest }
					>
						{ t('receivingCallModal.decline') }
					</Button>

					<Button onClick={ acceptMeetRequest }>
						{ t('receivingCallModal.accept') }
					</Button>
				</div>
			</div>
		</S.ReceivingCallModal>
	);

}

export default ReceivingCallModal;
