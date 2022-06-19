import { Server } from 'socket.io';

import { TUser } from '../../types/user';
import { TCallUserData, TAcceptCallData } from '../../types/socket';

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

			socket.on('call-user', (data: TCallUserData) => {
				const { to, from, signal } = data;
				io.to(to).emit('request-connection', { signal, from });
			});

			socket.on('accept-call', (data: TAcceptCallData) => {
				const { from, to, signal, meetName } = data;
				io.to(to).emit('call-accepted', { from, signal, meetName });
			});
		});		
	}

	response.end();
}

export default handler;
