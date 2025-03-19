import { FC } from 'react';

import { useRouter } from 'next/router';

import { Formik } from 'formik';

import { useMeet } from '@app/presentation/contexts/MeetContext';
import { useLocale } from '@app/presentation/contexts/LocaleContext';

import { Button, IconButton, Input } from '@app/presentation/components';
import { JoinMeetSchema } from '@app/presentation/validations';

import * as S from './styles';

interface JoinMeetModalAbstract {
    meetId?: string;
    onClose: () => void;
}

export const JoinMeetModal: FC<JoinMeetModalAbstract> = ({
    meetId,
    onClose,
}) => {
    const router = useRouter();

    const { t } = useLocale();
    const { setTempParticipantData } = useMeet();

    return (
        <S.Container>
            <div>
                <header>
                    <h2>Entrar em uma reunião</h2>
                    <IconButton icon="x" onClick={onClose} />
                </header>

                <Formik
                    initialValues={{
                        name: '',
                        email: '',
                        meet: meetId || '',
                    }}
                    validateOnMount={false}
                    validationSchema={JoinMeetSchema(t)}
                    onSubmit={values => {
                        setTempParticipantData({
                            meet: {
                                id: values.meet,
                            },
                            participant: {
                                name: values.name,
                                email: values.email,
                            },
                        });

                        router.push('/request-stream');
                    }}
                >
                    {form => (
                        <form onSubmit={form.handleSubmit}>
                            <div>
                                <Input
                                    name="name"
                                    icon="user"
                                    label={t('inputPlaceholder.userName')}
                                />

                                <Input
                                    name="email"
                                    type="email"
                                    icon="mail"
                                    label={t('inputPlaceholder.email')}
                                    placeholder="example@gmail.com"
                                />

                                <Input
                                    name="meet"
                                    icon="at"
                                    label="ID da reunião"
                                />
                            </div>

                            <Button
                                type="submit"
                                icon="send"
                                variant="primary"
                                disabled={!form.isValid}
                            >
                                Pedir para entrar
                            </Button>
                        </form>
                    )}
                </Formik>
            </div>
        </S.Container>
    );
};
