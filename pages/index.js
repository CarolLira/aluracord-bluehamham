import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, Text, TextField, Image } from '@skynexui/components';

import appConfig from '../config.json';

import { Title } from '../components/Title';


export default function Login() {
    const unknownUserImage = 'https://cdn0.iconfinder.com/data/icons/set-ui-app-android/32/8-512.png';
    const [username, setUsername] = useState('carollira');
    const [userData, setUserData] = useState();
    const [image, setImage] = useState(unknownUserImage);

    const router = useRouter();

    async function getUser() {
        if (username.length > 2) {
            try {
                const response = await fetch(`https://api.github.com/users/${username}`);
                const data = await response.json();
                data.id ? setUserData(data) : setUserData({});
                data.avatar_url ? setImage(data.avatar_url) : setImage(unknownUserImage);
            } catch (error) {
                console.log(error);
                setImage(unknownUserImage);
            }
        } else {
            setImage(unknownUserImage);
        }
    }

    useEffect(() => {
        getUser();
    }, [username]);

    return (
        <>
            <Box
                styleSheet={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: appConfig.theme.colors.primary[500],
                    backgroundImage: 'url("https://stickershop.line-scdn.net/sticonshop/v1/product/5fe59c1d54f13c078a4b7753/iPhone/main.png")',
                    backgroundRepeat: 'repeat',
                    backgroundSize: 'auto',
                    backgroundBlendMode: 'multiply',
                }}
            >
                <Box
                    styleSheet={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: {
                            xs: 'column',
                            sm: 'row',
                        },
                        width: '100%',
                        maxWidth: '700px',
                        borderRadius: '5px',
                        padding: '32px',
                        margin: '16px',
                        boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                        backgroundColor: appConfig.theme.colors.neutrals[700],
                    }}
                >
                    {/* Formulário */}
                    <Box
                        as="form"
                        onSubmit={(event) => {
                            event.preventDefault();
                            router.push('/chat');
                        }}
                        styleSheet={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: {
                                xs: '100%',
                                sm: '50%'
                            },
                            textAlign: 'center',
                            marginBottom: '32px',
                        }}
                    >
                        <Title tag="h2">Boas vindas de volta!</Title>
                        <Text
                            variant="body3"
                            styleSheet={{
                                marginBottom: '32px',
                                color: appConfig.theme.colors.neutrals[300]
                            }}>
                            {appConfig.name}
                        </Text>

                        <TextField
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            fullWidth
                            textFieldColors={{
                                neutral: {
                                    textColor: appConfig.theme.colors.neutrals[200],
                                    mainColor: appConfig.theme.colors.neutrals[900],
                                    mainColorHighlight: appConfig.theme.colors.primary[500],
                                    backgroundColor: appConfig.theme.colors.neutrals[800],
                                },
                            }}
                        />
                        <Button
                            type='submit'
                            label='Entrar'
                            fullWidth
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.primary[500],
                                mainColorLight: appConfig.theme.colors.primary[400],
                                mainColorStrong: appConfig.theme.colors.primary[600],
                            }}
                        />
                    </Box>
                    {/* Formulário */}


                    {/* Photo Area */}
                    <Box
                        styleSheet={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            maxWidth: '200px',
                            padding: '16px',
                            backgroundColor: appConfig.theme.colors.neutrals[800],
                            border: '1px solid',
                            borderColor: appConfig.theme.colors.primary[500],
                            borderRadius: '10px',
                            flex: 1,
                            minHeight: '240px',
                        }}
                    >
                        <Image
                            styleSheet={{
                                borderRadius: '50%',
                                marginBottom: '16px',
                            }}
                            src={image}
                        />
                        <Text
                            variant="body4"
                            styleSheet={{
                                fontSize: '14px',
                                color: appConfig.theme.colors.primary[100],
                                backgroundColor: appConfig.theme.colors.neutrals[900],
                                padding: '3px 10px',
                                marginBottom: '10px',
                                borderRadius: '1000px'
                            }}
                        >
                            {username}
                        </Text>
                        <Text
                            variant="body4"
                            styleSheet={{
                                color: appConfig.theme.colors.neutrals[200],
                                backgroundColor: appConfig.theme.colors.neutrals[900],
                                padding: '3px 10px',
                                borderRadius: '1000px'
                            }}
                        >
                            {userData &&
                                `Repositórios: ${userData.public_repos || ''}`
                            }

                        </Text>
                    </Box>
                    {/* Photo Area */}
                </Box>
            </Box>
        </>
    );
}