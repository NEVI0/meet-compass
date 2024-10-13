import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { Form, Formik } from 'formik';

import { useLocale } from '@presentation/contexts/LocaleContext';
import { Button, Input, Icon } from '@presentation/components';

import { useCreateMeet } from './hooks';
import * as S from './styles';

export const Home: NextPage = () => {
    const router = useRouter();

    const { t } = useLocale();
    const { create, loading } = useCreateMeet();

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
                        console.log(values);
                    }}
                >
                    <Form className="home__content">
                        <Input
                            name="user"
                            icon="user"
                            placeholder={t('inputPlaceholder.userName')}
                        />

                        <Input
                            name="email"
                            type="email"
                            icon="mail"
                            placeholder={t('inputPlaceholder.email')}
                        />

                        <Input
                            name="meet"
                            icon="at"
                            placeholder={t('inputPlaceholder.meetName')}
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
                    <a data-testid="joinMeetLink" onClick={() => null}>
                        {t('page.home.joinMeetLink')}
                    </a>
                </span>
            </main>
        </S.Containter>
    );
};
