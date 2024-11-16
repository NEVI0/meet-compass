import { FC } from 'react';

import { Formik } from 'formik';

import { useMeet } from '@presentation/contexts/MeetContext';
import { Icon, IconButton } from '@presentation/components';

import { Message } from './components';
import { useMessages, useSendMessage } from './hooks';
import * as S from './styles';

export const Chat: FC = () => {
    const { send } = useSendMessage();
    const { chat, user } = useMeet();
    const { messages, addMessage } = useMessages();

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
                    {!messages.length ? (
                        <span>Nenhuma mensagem foi enviada ainda!</span>
                    ) : (
                        messages.map(data => (
                            <Message
                                variant={
                                    data.sent.by.id === user?.id
                                        ? 'current-user'
                                        : 'participant'
                                }
                                message={data.message}
                                sent={data.sent}
                            />
                        ))
                    )}
                </div>

                <footer>
                    <Formik
                        initialValues={{ message: '' }}
                        onSubmit={(values, form) => {
                            const message = send(values.message);
                            if (!message) return;

                            form.setFieldValue('message', '');
                            addMessage(message);
                        }}
                    >
                        {form => (
                            <form onSubmit={form.handleSubmit}>
                                <input
                                    type="text"
                                    name="message"
                                    placeholder="Digite sua mensagem"
                                    value={form.values.message}
                                    onChange={event => {
                                        form.setFieldValue(
                                            'message',
                                            event.target.value,
                                        );
                                    }}
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
