import { MeetRepositoryAbstract } from '@domain/repositories';
import {
    makePeerConnectionProvider,
    makeSocketClientProvider,
} from '@infra/providers';

import { MeetRepository } from './implementations/MeetRepository';

let instance: MeetRepositoryAbstract | null = null;

export function makeMeetRepository(): MeetRepositoryAbstract {
    if (!instance) {
        const socketClientProvider = makeSocketClientProvider();
        const peerConnectionProvider = makePeerConnectionProvider();

        instance = new MeetRepository(
            socketClientProvider,
            peerConnectionProvider,
        );
    }

    return instance;
}
