import { Server } from 'socket.io';
import { TUser } from '../../types/user';

const handler = (_: any, response: any) => {
	if (!response.socket.server.io) {
		const io = new Server(response.socket.server);
		response.socket.server.io = io;
		
		let users: any = {};
		
		io.on('connection', socket => {
			// if (users[socket.id]) users[socket.id] = socket.id;

			socket.on('save-user-data', (data: TUser) => {
				users[socket.id] = data;
			});

			socket.on('disconnect', () => {
				delete users[socket.id];
			});

			socket.on('call-user', (data: any) => {
				const { userToCall, stream } = data;
				io.to(userToCall).emit('request-connection', { stream, from: users[socket.id] });
			});

			socket.on('accept-call', (data: any) => {
				io.to(data.to).emit('call-accepted', data.signal);
			});
		});		
	}

	response.end();
}

export default handler;
