import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BiSend, BiX } from 'react-icons/bi';

import { IconButton } from '..';
import useMeetContext from '../../contexts/MeetContext';

import { isEmpty, isLink } from '../../utils/functions';
import * as S from './styles';

const Chat: React.FC<{ visible: boolean; onClose: () => void; }> = ({ visible, onClose }) => {

	const { t } = useTranslation();
	const { socketRef, otherUserData } = useMeetContext();

	const [ chatMessage, setChatMessage ] = useState<string>('');

	const handleAddMessage = (message: string, side: 'left' | 'right') => {
		const chatContent = document.getElementById('chat-content');
		
		if (chatContent) {
			const isMessageLink = isLink(message);
			const element = document.createElement(isMessageLink ? 'a' : 'p'); 

			if (isMessageLink) { // @ts-ignore
				element.href = message; // @ts-ignore
				element.target = '_blank';
			}

			element.className = `chat__message chat__message-${side} ${isMessageLink && 'chat__message-link'}`;
			element.append(message);

			chatContent.append(element);
		}
	}

	const handleSendMessage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		event.preventDefault();
		
		socketRef.current.emit('send-message', { to: otherUserData.id, message: chatMessage });
		handleAddMessage(chatMessage, 'right');
		setChatMessage('');
	}

	useEffect(() => {
		const socket = socketRef;

		if (socket.current) socket.current.on('received-message', (message: string) => {
			handleAddMessage(message, 'left');
		});

		return () => {
			if (socket.current) socket.current.off('received-message');
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (isEmpty(otherUserData)) {
			const chatContent = document.getElementById('chat-content');
			if (!chatContent) return;

			let child = chatContent.lastElementChild;

			while (child) {
				chatContent.removeChild(child);
				child = chatContent.lastElementChild;
			}
		}
	}, [otherUserData]);

	return (
		<S.Chat data-testid="chat" visible={ visible }>
			<header className="chat__header">
				<h2 className="chat__title">
					{ t('page.meet.chat.title') }
				</h2>

				<IconButton
					onClick={ onClose }
					icon={ <BiX /> }
				/>
			</header>

			<main className="chat__content" id="chat-content" data-testid="chatContent">
			</main>

			<footer className="chat__footer">
				<form className="chat__form">
					<input
						data-testid="chatMessage"
						type="text"
						placeholder={ t('inputPlaceholder.sendMessage') }
						className="chat__field"
						value={ chatMessage }
						onChange={ event => setChatMessage(event.target.value) }
					/>

					<button data-testid="sendChatMessage" className="chat__send" onClick={ handleSendMessage }>
						<BiSend />
					</button>
				</form>
			</footer>
		</S.Chat>
	);

}

export default Chat;
