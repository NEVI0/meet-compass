import React, { useState } from 'react';
import { BiX, BiAt } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';

import { Input, Button, IconButton } from '..';
import useMeetContext from '../../contexts/MeetContext';

import * as S from './styles';

const RenameMeetModal: React.FC<{ visible: boolean; onClose: () => void; }> = ({ visible, onClose }) => {

	const { t } = useTranslation();
	const { renameMeet } = useMeetContext();

	const [ newMeetName, setNewMeetName ] = useState<string>('');

	const handleRenameMeet = () => {
		renameMeet(newMeetName);
		onClose();
	}

	return (
		<S.RenameMeetModal visible={ visible }>
			<div className="renamemeet">
				<header className="renamemeet__header">
					<h2 className="renamemeet__title">
						{ t('renameMeetModal.title') }
					</h2>

					<IconButton
						icon={ <BiX /> }
						onClick={ onClose }
					/>
				</header>

				<div className="renamemeet__content">
					<Input
						name="meet-name"
						placeholder={ t('inputPlaceholder.newMeetName') }
						value={ newMeetName }
						onChangeValue={ setNewMeetName }
						icon={ <BiAt className="input__icon" /> }
					/>

					<Button disabled={ !newMeetName } onClick={ handleRenameMeet }>
						{ t('renameMeetModal.rename') }
					</Button>
				</div>
			</div>
		</S.RenameMeetModal>
	);

}

export default RenameMeetModal;
