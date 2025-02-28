import { MeetRepositoryAbstract } from '@app/domain/repositories';
import { makeSocketClientProvider } from '@app/infra/providers';

import { MeetRepository } from './implementations/MeetRepository';

let instance: MeetRepositoryAbstract | null = null;

export function makeMeetRepository(): MeetRepositoryAbstract {
    if (!instance) {
        const socketClientProvider = makeSocketClientProvider();
        instance = new MeetRepository(socketClientProvider);
    }

    return instance;
}
