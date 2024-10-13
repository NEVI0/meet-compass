import { CreateMeetDTO } from '@domain/dtos';
import { PeerConnectionProviderAbstract } from '@domain/providers/PeerConnectionProvider';

export class CreateMeetUseCase {
    constructor(
        private peerConnectionProvider: PeerConnectionProviderAbstract,
    ) {}

    public async execute(params: CreateMeetDTO) {
        try {
            return await this.peerConnectionProvider.create(params);
        } catch (error) {}
    }
}
