import { Button, Container, Paper, PasswordInput, TextInput } from '@mantine/core'
import { LoginCommand } from '@localzet/aura-backend-contract'
import { useForm, zodResolver } from '@mantine/form'
import { PiSignInDuotone } from 'react-icons/pi'
import { useTranslation } from 'react-i18next'

import { handleFormErrors } from '@shared/utils/misc'
import { useAuth } from '@shared/hooks/use-auth'
import { useLogin } from '@shared/api/hooks'

export const LoginFormFeature = () => {
    const { t } = useTranslation()

    const { setIsAuthenticated } = useAuth()

    const form = useForm({
        mode: 'uncontrolled',
        validate: zodResolver(LoginCommand.RequestSchema),
        initialValues: { username: '', password: '' }
    })

    const { mutate: login, isPending: isLoading } = useLogin()

    const handleSubmit = form.onSubmit((variables) => {
        login(
            {
                variables: {
                    username: variables.username,
                    password: variables.password
                }
            },
            {
                onSuccess: () => {
                    setIsAuthenticated(true)
                },
                onError: (error) => handleFormErrors(form, error)
            }
        )
    })

    return (
        <form onSubmit={handleSubmit}>
            <Container my={40} size={'100%'}>
                <Paper mt={30} p={30}>
                    <TextInput
                        label={t('login-form.feature.username')}
                        name="username"
                        placeholder={t('login-form.feature.username')}
                        required
                        {...form.getInputProps('username')}
                    />
                    <PasswordInput
                        label={t('login-form.feature.password')}
                        mt="md"
                        name="password"
                        placeholder={t('login-form.feature.your-password')}
                        required
                        {...form.getInputProps('password')}
                    />
                    <Button
                        fullWidth
                        leftSection={<PiSignInDuotone size="1rem" />}
                        loading={isLoading}
                        mt="xl"
                        type="submit"
                    >
                        {t('login-form.feature.sign-in')}
                    </Button>
                </Paper>
            </Container>
        </form>
    )
}
