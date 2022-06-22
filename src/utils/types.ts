import SimplePeer from 'simple-peer';

export type TBreakpoint = 'xsm' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export type TUser = {
	id: string;
	name: string;
	email: string;
}

export type TCallUserData = {
	to: string;
	from: TUser;
	signal: SimplePeer.SignalData;
}

export type TAcceptCallData = {
	from: TUser;
	to: string;
	meetName: string;
	signal: SimplePeer.SignalData;
}

export type TRequestConnectionData = {
	from: TUser;
	signal: SimplePeer.SignalData;
}

export type TCallAccepted = {
	meetName: string;
	from: TUser;
	signal: SimplePeer.SignalData;
}

export type TRemoveUser = {
	userToRemove: TUser;
}

export type TUserLeft = {
	user: TUser;
}