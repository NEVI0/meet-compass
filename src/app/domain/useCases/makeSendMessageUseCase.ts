import { makeMeetRepository } from '@app/infra/repositories';
import { SendMessageUseCase } from './implementations/SendMessageUseCase';

let instace: SendMessageUseCase | null = null;

export function makeSendMessageUseCase() {
    if (!instace) {
        const meetRepository = makeMeetRepository();
        instace = new SendMessageUseCase(meetRepository);
    }

    return instace;
}
