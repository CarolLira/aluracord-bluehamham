import appConfig from '../config.json';
import { Box, Text, Image, Button } from '@skynexui/components';

export function MessageList(props) {
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.messages.map((message) => {
                return (
                    <Box
                        styleSheet={{
                            display: 'flex',
                        }}
                    >
                        <Text
                            key={message.id}
                            tag="li"
                            style={{
                                width: '98.5%',
                            }}
                            styleSheet={{
                                borderRadius: '5px',
                                padding: '6px',
                                marginBottom: '12px',
                                backgroundColor: appConfig.theme.colors.neutrals[700]
                            }}
                        >
                            <Box
                                styleSheet={{
                                    marginBottom: '8px',
                                }}
                            >
                                <Image
                                    styleSheet={{
                                        width: '20px',
                                        height: '20px',
                                        borderRadius: '50%',
                                        display: 'inline-block',
                                        marginRight: '8px',
                                    }}
                                    src={`https://github.com/carollira.png`}
                                />
                                <Text tag="strong">
                                    {message.user}
                                </Text>
                                <Text
                                    styleSheet={{
                                        fontSize: '10px',
                                        marginLeft: '8px',
                                        color: appConfig.theme.colors.neutrals[300],
                                    }}
                                    tag="span"
                                >
                                    {(new Date().toLocaleDateString())}
                                </Text>
                            </Box>
                            {message.text}
                        </Text>
                        <Button
                            iconName='times'
                            onClick={() => props.handleRemoveMessage(message.id)}
                            style={{
                                fontSize: '12px',
                                height: '18px',
                                width: '18px',
                            }}
                            styleSheet={{
                                marginLeft: '-8px',
                                marginTop: '-8px',
                                backgroundColor: appConfig.theme.colors.neutrals[700],
                                hover: {
                                    backgroundColor: appConfig.theme.colors.primary[700]
                                },
                                focus: {
                                    backgroundColor: appConfig.theme.colors.primary[700]
                                }
                            }}
                        >
                        </Button>
                    </Box>
                );
            })}
        </Box >
    )
}