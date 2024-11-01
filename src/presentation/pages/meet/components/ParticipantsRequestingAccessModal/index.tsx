import { FC } from 'react';

import { IconButton } from '@presentation/components';

import * as S from './styles';

export const ParticipantsRequestingAccessModal: FC = () => {
    const participantsRequestingAccess: any[] = [];

    if (!participantsRequestingAccess.length) return null;

    return (
        <S.Container>
            <div>
                {participantsRequestingAccess.map((_, index) => (
                    <S.Participant key={index}>
                        <div>
                            <h3>Outro Teste</h3>
                            <small>está ligando...</small>
                        </div>

                        <div>
                            <IconButton
                                variant="error"
                                icon="x"
                                onClick={() => null}
                            />

                            <IconButton
                                variant="success"
                                icon="double-check"
                                onClick={() => null}
                            />
                        </div>
                    </S.Participant>
                ))}
            </div>
        </S.Container>
    );
};
