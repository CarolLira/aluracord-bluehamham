import { Box, Button, TextField } from '@skynexui/components';
import React, { useEffect, useState } from 'react';
import appConfig from '../config.json';

import { Header } from '../src/components/Header';
import { MessageList } from '../src/components/MessageList';
import { StickerButton } from '../src/components/StickerButton';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/router';

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzU0NzM1NSwiZXhwIjoxOTU5MTIzMzU1fQ.-HN_qLXIyr2hS05qgKh58Q5uZlUbaOHs1ACbuFj9hvg';
const SUPABASE_URL = 'https://tvmgdwwnhcuaukrsvrxl.supabase.co';

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function listenToRealTimeMessages(addNewMessage, getAllMessages) {
    return supabaseClient
        .from('messages')
        .on('INSERT', (response) => addNewMessage(response.new))
        .on('DELETE', () => getAllMessages())
        .subscribe();
}

export default function ChatPage() {
    const router = useRouter();
    const loggedUser = router.query.username;
    const [message, setMessage] = useState('');
    const [messageHistory, setMessageHistory] = useState([]);

    useEffect(() => {
        getAllMessages();

        const subscription = listenToRealTimeMessages((newMessage) => {
            setMessageHistory((currentList) => {
                return [
                    newMessage,
                    ...currentList,
                ]
            });
        }, getAllMessages);

        return () => {
            subscription.unsubscribe();
        }
    }, []);

    function getAllMessages() {
        supabaseClient
            .from('messages')
            .select('*')
            .order('id', { ascending: false })
            .then(({ data }) => {
                console.log('Dados da consulta:', data);
                setMessageHistory(data);
            });
    }

    function handleNewMessage(newMessage) {
        const messageData = {
            user: loggedUser,
            text: newMessage,
        }

        if (newMessage) {
            supabaseClient
                .from('messages')
                .insert([
                    messageData
                ])
                .then((response) => {
                    console.log('criando msg: ', response);
                });
        }
        setMessage('');
    }

    function handleRemoveMessage(messageId) {
        supabaseClient
            .from('messages')
            .delete()
            .match({ id: messageId })
            .then((response) => {
                console.log('criando msg: ', response);
            });
    }

    return (
        <Box
            styleSheet={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: 'url(https://stickershop.line-scdn.net/sticonshop/v1/product/5fe59c1d54f13c078a4b7753/iPhone/main.png)',
                backgroundRepeat: 'repeat',
                backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >
                    <MessageList
                        messages={messageHistory}
                        handleRemoveMessage={(id) => handleRemoveMessage(id)}
                    />
                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            flexDirection: 'row',
                        }}
                    >
                        <TextField
                            value={message}
                            onChange={(event) => setMessage(event.target.value)}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault();
                                    handleNewMessage(message);
                                }
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '10px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />
                        <StickerButton
                            onStickerClick={(sticker) => handleNewMessage(`:sticker: ${sticker}`)}
                        />
                        <Button
                            iconName='paperPlane'
                            type='submit'
                            onClick={(event) => {
                                event.preventDefault();
                                handleNewMessage(message)
                            }}
                            style={{
                                height: '44px',
                                padding: '6px 8px',
                                borderRadius: '5px',
                                fontSize: '16px'
                            }}
                            styleSheet={{
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                hover: {
                                    backgroundColor: appConfig.theme.colors.primary[700]
                                },
                                focus: {
                                    backgroundColor: appConfig.theme.colors.primary[700]
                                }
                            }}

                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}