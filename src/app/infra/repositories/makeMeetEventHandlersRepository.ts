import {
    makePeerConnectionProvider,
    makeSocketClientProvider,
} from '@app/infra/providers';
import { MeetEventHandlersRepositoryAbstract } from '@app/domain/repositories';

import { MeetEventHandlersRepository } from './implementations/MeetEventHandlersRepository';

let instance: MeetEventHandlersRepositoryAbstract | null = null;

export function makeMeetEventHandlersRepository(): MeetEventHandlersRepositoryAbstract {
    if (!instance) {
        const socketClientProvider = makeSocketClientProvider();
        const peerConnectionProvider = makePeerConnectionProvider();

        instance = new MeetEventHandlersRepository(
            socketClientProvider,
            peerConnectionProvider,
        );
    }

    return instance;
}
