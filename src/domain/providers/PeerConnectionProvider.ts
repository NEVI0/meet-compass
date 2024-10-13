import { MeetAbstract } from '@domain/entities';

interface CreatePeerConnectionAbstract {
    meet: {
        name: string;
    };
    owner: {
        name: string;
        email: string;
    };
}

export interface PeerConnectionProviderAbstract {
    create(params: CreatePeerConnectionAbstract): Promise<MeetAbstract>;
}
