import { Server } from 'socket.io';

import { TUser, TCallUserData, TAcceptCallData, TRemoveUser } from '../../utils/types';

const handler = (_: any, response: any) => {
	if (!response.socket.server.io) {
		const io = new Server(response.socket.server);
		response.socket.server.io = io;
		
		let users: any = {};
		
		io.on('connection', socket => {
			socket.on('save-user-data', (userData: TUser) => {
				users[socket.id] = userData;
			});

			socket.on('disconnect', () => {
				socket.broadcast.emit('user-left', { user: users[socket.id] });
				delete users[socket.id];
			});

			socket.on('remove-user', (data: TRemoveUser) => {
				const { userToRemove } = data;
				io.to(userToRemove.id).emit('removed-from-meet');
			});

			socket.on('call-user', (data: TCallUserData) => {
				const { to, from, signal } = data;
				io.to(to).emit('request-connection', { signal, from });
			});

			socket.on('accept-call', (data: TAcceptCallData) => {
				const { from, to, signal, meetName } = data;
				io.to(to).emit('call-accepted', { from, signal, meetName });
			});

			socket.on('reject-call', (data: any) => {
				const { to } = data;
				io.to(to).emit('call-rejected');
			});

			socket.on('left-meet', (data: any) => {
				const { to } = data;
				io.to(to).emit('other-user-left-meet');
			});

			socket.on('meet-new-name', (data: any) => {
				const { to, newMeetName } = data;
				io.to(to).emit('update-meet-name', newMeetName);
			});

			socket.on('handle-user-audio', (data: any) => {
				const { to, shouldMute } = data;
				io.to(to).emit('handle-other-user-audio', shouldMute);
			});

			socket.on('handle-user-video', (data: any) => {
				const { to, shouldStop } = data;
				io.to(to).emit('handle-other-user-video', shouldStop);
			});
		});		
	}

	response.end();
}

export default handler;
