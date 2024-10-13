import { PeerConnectionProviderAbstract } from '@domain/providers';
import { Meet } from '@infra/adapters';

export class WebRTCConnectionProvider
    implements PeerConnectionProviderAbstract
{
    constructor() {}

    public create: PeerConnectionProviderAbstract['create'] = async params => {
        return new Promise((resolve, reject) => {
            return resolve(
                new Meet({
                    name: params.meet.name,
                    owner: params.owner,
                }),
            );
        });
    };
}
