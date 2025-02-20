import { makeSocketClientProvider } from '@app/infra/providers';
import { MeetEventHandlersRepositoryAbstract } from '@app/domain/repositories';

import { MeetEventHandlersRepository } from './implementations/MeetEventHandlersRepository';

let instance: MeetEventHandlersRepositoryAbstract | null = null;

export function makeMeetEventHandlersRepository(): MeetEventHandlersRepositoryAbstract {
    if (!instance) {
        const socketClientProvider = makeSocketClientProvider();
        instance = new MeetEventHandlersRepository(socketClientProvider);
    }

    return instance;
}
