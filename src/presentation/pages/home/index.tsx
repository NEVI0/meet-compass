import { useState } from 'react';

import { NextPage } from 'next';
import Head from 'next/head';

import { Form, Formik } from 'formik';

import { useLocale } from '@presentation/contexts/LocaleContext';
import { Button, Input, Icon } from '@presentation/components';

import { JoinMeetModal } from './components';
import { useCreateMeet } from './hooks';
import * as S from './styles';

export const Home: NextPage = () => {
    const { t } = useLocale();
    const { create, loading } = useCreateMeet();

    const [isJoinMeetModalVisible, setIsJoinMeetModalVisible] =
        useState<boolean>(false);

    return (
        <S.Containter>
            <Head>
                <title>Meet Compass</title>
            </Head>

            <aside className="left">
                <Icon name="compass" className="logo" />
            </aside>

            <main className="home">
                <header className="home__header">
                    <div className="home__logo">
                        <Icon name="compass" className="home__logo-icon" />
                    </div>

                    <div>
                        <h1 className="home__title">{t('page.home.title')}</h1>

                        <p className="home__description">
                            {t('page.home.subtitle')}
                        </p>
                    </div>
                </header>

                <Formik
                    initialValues={{
                        user: '',
                        email: '',
                        meet: '',
                    }}
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
                    <Form className="home__content">
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

                        <Button type="submit" icon="plus" loading={loading}>
                            {t('page.home.button')}
                        </Button>
                    </Form>
                </Formik>

                <div className="home__divider">
                    <div className="home__divider-line" />
                    {t('page.home.or')}
                    <div className="home__divider-line" />
                </div>

                <span className="home__join">
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

            {isJoinMeetModalVisible ? (
                <JoinMeetModal
                    onClose={() => {
                        setIsJoinMeetModalVisible(!isJoinMeetModalVisible);
                    }}
                />
            ) : undefined}
        </S.Containter>
    );
};
