import { CreateMeetUseCase } from './implementations/CreateMeetUseCase';

let instace: CreateMeetUseCase | null = null;

export function makeCreateMeetUseCase() {
    if (!instace) instace = new CreateMeetUseCase();
    return instace;
}
