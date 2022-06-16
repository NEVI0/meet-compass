import SimplePeer from 'simple-peer';
import { TUser } from './user';

export type TCallUserData = {
	to: string;
	from: TUser;
	signal: SimplePeer.SignalData;
}

export type TAcceptCallData = {
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
	signal: SimplePeer.SignalData;
};
