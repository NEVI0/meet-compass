import { Server } from 'socket.io';

import {
	TUser,
	TAcceptCallEventData,
	TCallUserEventData,
	TNewMeetNameEventData,
	TSendMessageEventData,
	TUpdateScreenSharingEventData,
	TUpdateUserAudioEventData,
	TUpdateUserVideoEventData
} from '../../utils/types';

const handler = (_: any, response: any) => {
	if (!response.socket.server.io) {
		const io = new Server(response.socket.server);
		response.socket.server.io = io;
		
		let users: any = {};
		
		io.on('connection', socket => {
			
			// Generic events
			socket.on('save-user-data', (user: TUser) => {
				users[socket.id] = user;
			});

			socket.on('check-meet-link', (id: string) => {
				if (!users[id]) socket.emit('link-not-available');
			});

			socket.on('send-message', (data: TSendMessageEventData) => {
				const { to, message } = data;
				io.to(to).emit('received-message', message);
			});

			socket.on('meet-new-name', (data: TNewMeetNameEventData) => {
				const { to, newMeetName } = data;
				io.to(to).emit('update-meet-name', newMeetName);
			});

			// Disconnections events
			socket.on('disconnect', () => {
				socket.broadcast.emit('user-left', socket.id);
				delete users[socket.id];
			});

			socket.on('remove-from-meet', (userToRemove: string) => {
				io.to(userToRemove).emit('removed-from-meet');
			});

			socket.on('left-meet', (to: string) => {
				io.to(to).emit('other-user-left-meet');
			});
			
			// Meet stream events
			socket.on('update-user-audio', (data: TUpdateUserAudioEventData) => {
				const { to, shouldMute } = data;
				io.to(to).emit('update-other-user-audio', shouldMute);
			});

			socket.on('update-user-video', (data: TUpdateUserVideoEventData) => {
				const { to, shouldStop } = data;
				io.to(to).emit('update-other-user-video', shouldStop);
			});

			socket.on('update-screen-sharing', (data: TUpdateScreenSharingEventData) => {
				const { to, isSharing } = data;
				io.to(to).emit('update-other-user-screen-sharing', isSharing);
			});

			// Meet initiation events
			socket.on('call-user', (data: TCallUserEventData) => {
				const { to, from, signal } = data;
				io.to(to).emit('request-meet-connection', { from, signal });
			});

			socket.on('accept-call', (data: TAcceptCallEventData) => {
				const { to, from, signal, meetName } = data;
				io.to(to).emit('call-accepted', { from, signal, meetName });
			});

			socket.on('reject-call', (to: string) => {
				io.to(to).emit('call-rejected');
			});

			socket.on('already-in-meet', (to: string) => {
				io.to(to).emit('other-user-already-in-meet');
			});

		});
	}

	response.end();
}

export default handler;
