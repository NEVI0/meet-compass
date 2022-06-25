import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BiSend, BiX } from 'react-icons/bi';

import { IconButton } from '..';
import useMeetContext from '../../contexts/MeetContext';

import * as S from './styles';

const Chat: React.FC<{ visible: boolean; onClose: () => void; }> = ({ visible, onClose }) => {

	const { t } = useTranslation();
	const { socketRef, otherUserData } = useMeetContext();

	const [ chatMessage, setChatMessage ] = useState<string>('');

	const handleAddMessage = (message: string, side: 'left' | 'right') => {
		const chatContent = document.getElementById('chat-content');
		
		if (chatContent) {
			const p = document.createElement('p');

			p.className = `chat__message chat__message-${side}`;
			p.innerText = message;

			chatContent.append(p);
		}
	}

	const handleSendMessage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		event.preventDefault();
		
		socketRef.current.emit('send-message', { to: otherUserData.id, message: chatMessage });
		handleAddMessage(chatMessage, 'right');
		setChatMessage('');
	}

	useEffect(() => {
		socketRef.current.on('get-message', (message: string) => {
			handleAddMessage(message, 'left');
		});
	}, []);

	return (
		<S.Chat visible={ visible }>
			<header className="chat__header">
				<h2 className="chat__title">
					{ t('page.meet.chat.title') }
				</h2>

				<IconButton
					onClick={ onClose }
					icon={ <BiX /> }
				/>
			</header>

			<main className="chat__content" id="chat-content">
			</main>

			<footer className="chat__footer">
				<form className="chat__form">
					<input
						type="text"
						placeholder={ t('inputPlaceholder.sendMessage') }
						className="chat__field"
						value={ chatMessage }
						onChange={ event => setChatMessage(event.target.value) }
					/>

					<button className="chat__send" onClick={ handleSendMessage }>
						<BiSend />
					</button>
				</form>
			</footer>
		</S.Chat>
	);

}

export default Chat;
