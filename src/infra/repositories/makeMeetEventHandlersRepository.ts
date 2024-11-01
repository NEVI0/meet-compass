import { MeetEventHandlersRepositoryAbstract } from '@domain/repositories';
import { MeetEventHandlersRepository } from './implementations/MeetEventHandlersRepository';
import { makeSocketClientProvider } from '@infra/providers';

let instance: MeetEventHandlersRepositoryAbstract | null = null;

export function makeMeetEventHandlersRepository(): MeetEventHandlersRepositoryAbstract {
    if (!instance) {
        const socketClientProvider = makeSocketClientProvider();
        instance = new MeetEventHandlersRepository(socketClientProvider);
    }

    return instance;
}
