import React from 'react';
import { Box, Button, Text, Image } from '@skynexui/components';
import appConfig from '../../config.json';

export function StickerButton(props) {
    const [isOpen, setOpenState] = React.useState('');

    return (
        <Box
            styleSheet={{
                position: 'relative',
            }}
        >
            <Button
                iconName='icons'
                style={{
                    borderRadius: '5px',
                    height: '44px',
                }}
                styleSheet={{
                    marginRight: '5px',
                    fontSize: '24px',
                    lineHeight: '0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: isOpen ? appConfig.theme.colors.primary[700] : appConfig.theme.colors.neutrals[800],
                    hover: {
                        backgroundColor: appConfig.theme.colors.primary[700],
                    },
                    focus: {
                        backgroundColor: isOpen ? appConfig.theme.colors.primary[700] : appConfig.theme.colors.neutrals[800],
                    }
                }}
                onClick={() => setOpenState(!isOpen)}
            />
            {isOpen && (
                <Box
                    styleSheet={{
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: '5px',
                        position: 'absolute',
                        backgroundColor: appConfig.theme.colors.neutrals[800],
                        width: {
                            xs: '200px',
                            sm: '290px',
                        },
                        height: '300px',
                        right: '30px',
                        bottom: '30px',
                        padding: '16px',
                        boxShadow: 'rgba(4, 4, 5, 0.15) 0px 0px 0px 1px, rgba(0, 0, 0, 0.24) 0px 8px 16px 0px',
                    }}
                    onClick={() => setOpenState(false)}
                >
                    <Text
                        styleSheet={{
                            color: appConfig.theme.colors.neutrals["000"],
                            fontWeight: 'bold',
                        }}
                    >
                        Stickers
                    </Text>
                    <Box
                        tag="ul"
                        styleSheet={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between',
                            flex: 1,
                            paddingTop: '16px',
                            overflowY: 'scroll',
                        }}
                    >
                        {appConfig.stickers.map((sticker) => (
                            <Text
                                onClick={() => {
                                    if (Boolean(props.onStickerClick)) {
                                        props.onStickerClick(sticker);
                                    }
                                }}
                                tag="li" key={sticker}
                                styleSheet={{
                                    width: '50%',
                                    borderRadius: '5px',
                                    padding: '10px',
                                    focus: {
                                        backgroundColor: appConfig.theme.colors.neutrals[600],
                                    },
                                    hover: {
                                        backgroundColor: appConfig.theme.colors.neutrals[600],
                                    }
                                }}
                            >
                                <Image src={sticker} />
                            </Text>
                        ))}
                    </Box>
                </Box>
            )}
        </Box>
    )
}