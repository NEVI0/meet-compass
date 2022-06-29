import SimplePeer from 'simple-peer';

export type TBreakpoint = 'xsm' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export type TUser = {
	id: string;
	name: string;
	email: string;
}

export type TSendMessageEventData = {
	to: string;
	message: string;
}

export type TNewMeetNameEventData = {
	to: string;
	newMeetName: string;
}

export type TUpdateUserAudioEventData = {
	to: string;
	shouldMute: boolean;
}

export type TUpdateUserVideoEventData = {
	to: string;
	shouldStop: boolean;
}

export type TUpdateScreenSharingEventData = {
	to: string;
	isSharing: boolean;
}

export type TCallUserEventData = {
	to: string;
	from: TUser;
	signal: SimplePeer.SignalData;
}

export type TAcceptCallEventData = {
	to: string;
	from: TUser;
	signal: SimplePeer.SignalData;
	meetName: string;
}

export type TRequestMeetConnectionEventData = {
	from: TUser;
	signal: SimplePeer.SignalData;
}

export type TCallAcceptedEventData = {
	from: TUser;
	signal: SimplePeer.SignalData;
	meetName: string;
}
