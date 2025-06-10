import { Badge, Box, Center, Group, Stack, Text, Title } from '@mantine/core'
import { useLayoutEffect } from 'react'

import { TelegramLoginButtonFeature } from '@features/auth/telegram-login-button/telegram-login-button.feature'
import { useGetAuthStatus } from '@shared/api/hooks/auth/auth.query.hooks'
import { RegisterFormFeature } from '@features/auth/register-form'
import { LoginFormFeature } from '@features/auth/login-form'
import { UnderlineShape } from '@shared/ui/underline-shape'
import { clearQueryClient } from '@shared/api/query-client'
import { LoadingScreen } from '@shared/ui'
import { Logo } from '@shared/ui/logo'
import { Page } from '@shared/ui/page'

export const LoginPage = () => {
    const { data: authStatus, isFetching } = useGetAuthStatus()

    useLayoutEffect(() => {
        clearQueryClient()
    }, [])

    if (isFetching) {
        return <LoadingScreen height="60vh" />
    }

    const isSimpleLogin =
        authStatus?.isLoginAllowed && !authStatus?.isRegisterAllowed && !authStatus?.tgAuth

    const isTelegramLogin =
        authStatus?.isLoginAllowed && !authStatus?.isRegisterAllowed && authStatus?.tgAuth

    const isRegister = !authStatus?.isLoginAllowed && authStatus?.isRegisterAllowed

    return (
        <Page title="Login">
            <Stack align="center" gap="xl">
                <Group align="center" gap={4} justify="center">
                    <Logo c="cyan" w="3rem" />
                    <Title order={1} pos="relative">
                        <Text c="cyan" component="span" fw="inherit" fz="inherit" pos="relative">
                            Aura
                        </Text>

                        <UnderlineShape
                            bottom="-1rem"
                            c="cyan"
                            h="0.625rem"
                            left="0"
                            pos="absolute"
                            style={{ zIndex: 1 }}
                            w="7.852rem"
                        />
                    </Title>
                </Group>

                {!authStatus && (
                    <Badge color="cyan" mt={10} size="lg" variant="filled">
                        Server is not responding. Check logs.
                    </Badge>
                )}

                {isSimpleLogin && (
                    <Box maw={800} w={{ base: 440, sm: 500, md: 500 }}>
                        <LoginFormFeature />
                    </Box>
                )}

                {isTelegramLogin && (
                    <Center maw={800} mt={20} w={{ base: 440, sm: 500, md: 500 }}>
                        <TelegramLoginButtonFeature tgAuth={authStatus.tgAuth} />
                    </Center>
                )}

                {isRegister && (
                    <Box maw={800} w={{ base: 440, sm: 500, md: 500 }}>
                        <RegisterFormFeature />
                    </Box>
                )}
            </Stack>
        </Page>
    )
}

export default LoginPage
