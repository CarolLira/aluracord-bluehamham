import { Box, Button, TextField } from '@skynexui/components';
import React, { useState } from 'react';
import appConfig from '../config.json';

import { Header } from '../components/Header';
import { MessageList } from '../components/MessageList';

export default function ChatPage() {
    const [message, setMessage] = useState('');
    const [messageHistory, setMessageHistory] = useState([]);

    function handleNewMessage(newMessage) {
        const messageData = {
            id: messageHistory.length + 1,
            user: 'carollira',
            text: newMessage,
        }

        setMessageHistory([
            messageData,
            ...messageHistory

        ]);
        setMessage('');
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
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />
                        <Button
                            iconName='paperPlane'
                            type='submit'
                            onClick={(event) => {
                                event.preventDefault();
                                handleNewMessage(message)
                            }}
                            style={{
                                borderRadius: '0%',
                                height: '44px',
                                padding: '6px 8px',
                                borderRadius: '5px',
                            }}
                            styleSheet={{
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                hover: {
                                    backgroundColor: appConfig.theme.colors.primary[500]
                                },
                                focus: {
                                    backgroundColor: appConfig.theme.colors.primary[500]
                                }
                            }}

                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}