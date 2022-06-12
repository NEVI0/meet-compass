import { Server } from 'socket.io';

const handler = (_: any, response: any) => {
	if (!response.socket.server.io) {
		const io = new Server(response.socket.server);
		response.socket.server.io = io;
		
		let users: any = {};
		
		io.on('connection', socket => {
			if (users[socket.id]) users[socket.id] = socket.id;

			socket.on('disconnect', () => {
				delete users[socket.id];
			});

			socket.on('call-guest', (data: any) => {
				const { guestToCall, signal, from } = data;
				io.to(guestToCall).emit('request-connection', { signal, from });
			});

			socket.on('accept-call', (data: any) => {
				io.to(data.to).emit('call-accepted', data.signal);
			});
		});		
	}

	response.end();
}

export default handler;
