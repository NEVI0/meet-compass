import { FC } from 'react';

import { Formik } from 'formik';

import { useMeet } from '@presentation/contexts/MeetContext';

import { Icon, IconButton } from '@presentation/components';
import { Message } from './components';

import * as S from './styles';

export const Chat: FC = () => {
    const { chat } = useMeet();

    return (
        <S.Container active={chat.open}>
            <aside>
                <header>
                    <h2>Chat da reunião</h2>

                    <IconButton
                        icon="x"
                        variant="container"
                        onClick={() => chat.toogle()}
                    />
                </header>

                <div>
                    <span>Nenhuma mensagem foi enviada ainda!</span>
                </div>

                <footer>
                    <Formik
                        initialValues={{ message: '' }}
                        onSubmit={({ message }) => {
                            console.log({ message });
                        }}
                    >
                        {form => (
                            <form onSubmit={form.handleSubmit}>
                                <input
                                    type="text"
                                    name="message"
                                    placeholder="Digite sua mensagem"
                                />

                                <button type="submit">
                                    <Icon name="send" />
                                </button>
                            </form>
                        )}
                    </Formik>
                </footer>
            </aside>
        </S.Container>
    );
};
