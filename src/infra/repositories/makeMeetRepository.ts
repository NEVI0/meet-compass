import { MeetRepositoryAbstract } from '@domain/repositories';
import { MeetRepository } from './implementations/MeetRepository';
import { makeSocketClientProvider } from '@infra/providers';

let instance: MeetRepositoryAbstract | null = null;

export function makeMeetRepository(): MeetRepositoryAbstract {
    if (!instance) {
        const socketClientProvider = makeSocketClientProvider();
        instance = new MeetRepository(socketClientProvider);
    }

    return instance;
}
