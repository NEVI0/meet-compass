import { Server } from 'socket.io';

const handler = (_: any, response: any) => {
	if (!response.socket.server.io) {
		const io = new Server(response.socket.server);
		response.socket.server.io = io;
		
		io.on('connection', socket => {
			socket.on('join-meet', (meetId, userId) => {
				socket.join(meetId);
				socket.broadcast.to(meetId).emit('user-connected', userId);

				socket.on('disconnect', () => {
					socket.broadcast.to(meetId).emit('user-disconnected', userId);
				});
			});
		});		
	}
	
	response.end();
}

export default handler;
