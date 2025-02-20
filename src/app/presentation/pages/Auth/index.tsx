import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import { NextPage } from 'next';
import Head from 'next/head';

import { Formik } from 'formik';

import { useLocale } from '@app/presentation/contexts/LocaleContext';
import { Button, Input, Icon } from '@app/presentation/components';
import { CreateMeetSchema } from '@app/presentation/validations';

import { JoinMeetModal, MoreOptions } from './components';
import { useCreateMeet } from './hooks';
import * as S from './styles';

export const Auth: NextPage = () => {
    const router = useRouter();

    const { t } = useLocale();
    const { create, loading } = useCreateMeet();

    const [isJoinMeetModalVisible, setIsJoinMeetModalVisible] =
        useState<boolean>(false);

    const { meetId } = router.query;

    useEffect(() => {
        if (!meetId) return;
        setIsJoinMeetModalVisible(true);
    }, [meetId]);

    return (
        <S.Containter>
            <Head>
                <title>Meet Compass</title>
            </Head>

            <main>
                <MoreOptions />

                <header>
                    <div>
                        <Icon name="compass" />
                    </div>

                    <div>
                        <h1>{t('page.home.title')}</h1>
                        <p>{t('page.home.subtitle')}</p>
                    </div>
                </header>

                <Formik
                    initialValues={{
                        user: '',
                        email: '',
                        meet: '',
                    }}
                    validateOnMount={false}
                    validationSchema={CreateMeetSchema(t)}
                    onSubmit={values => {
                        create({
                            meet: {
                                name: values.meet,
                            },
                            owner: {
                                name: values.user,
                                email: values.email,
                            },
                        });
                    }}
                >
                    {form => (
                        <form onSubmit={form.handleSubmit}>
                            <div>
                                <Input
                                    name="user"
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
                                    label={t('inputPlaceholder.meetName')}
                                />
                            </div>

                            <Button
                                type="submit"
                                icon="plus"
                                loading={loading}
                                disabled={!form.isValid}
                            >
                                {t('page.home.button')}
                            </Button>
                        </form>
                    )}
                </Formik>

                <div>
                    <div />
                    {t('page.home.or')}
                    <div />
                </div>

                <span>
                    {t('page.home.joinMeet')}{' '}
                    <a
                        data-testid="joinMeetLink"
                        onClick={() => {
                            setIsJoinMeetModalVisible(!isJoinMeetModalVisible);
                        }}
                    >
                        {t('page.home.joinMeetLink')}
                    </a>
                </span>
            </main>

            <aside>
                <Icon name="compass" className="logo" />
            </aside>

            {isJoinMeetModalVisible ? (
                <JoinMeetModal
                    meetId={meetId as string}
                    onClose={() => {
                        setIsJoinMeetModalVisible(!isJoinMeetModalVisible);
                    }}
                />
            ) : undefined}
        </S.Containter>
    );
};
