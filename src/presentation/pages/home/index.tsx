import { NextPage } from 'next';
import Head from 'next/head';

import { useFormik } from 'formik';

import { useLocale } from '@presentation/contexts/LocaleContext';
import { Button, Input, Icon } from '@presentation/components';

import * as S from './styles';

export const Home: NextPage = () => {
    const { t } = useLocale();

    const form = useFormik({
        initialValues: {
            user: '',
            email: '',
            meet: '',
        },
        validateOnMount: false,
        onSubmit: values => console.log({ values }),
    });

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

                <form className="home__content" onSubmit={() => null}>
                    <Input
                        name="name"
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

                    <Button icon="plus">{t('page.home.button')}</Button>
                </form>

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
