import appConfig from '../config.json';
import { Box, Image, Text } from '@skynexui/components';

export default function Custom404() {
    return (
        <>
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: appConfig.theme.colors.primary[600],
                }}
            >
                <Text
                    variant="display1"
                    styleSheet={{
                        fontSize: '80px',
                        letterSpacing: '20px',
                        marginBottom: '30px'
                    }}
                >
                    404
                </Text>
                <Image
                    styleSheet={{
                        width: 'auto',
                        height: 'auto',
                    }}
                    src={"https://i.pinimg.com/originals/10/54/50/105450a5e5d7f2308e97d3b021fdc29c.gif"}
                />
            </Box>
        </>
    );
}