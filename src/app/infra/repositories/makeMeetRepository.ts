import { MeetRepositoryAbstract } from '@app/domain/repositories';
import {
    makePeerConnectionProvider,
    makeSocketClientProvider,
} from '@app/infra/providers';

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
