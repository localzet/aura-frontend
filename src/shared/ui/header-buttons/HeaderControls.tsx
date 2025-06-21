import { BoxProps, Group } from '@mantine/core'

import { TelegramControl } from './TelegramControl'
import { LanguageControl } from './LanguageControl'
import { SupportControl } from './SupportControl'
import { RefreshControl } from './RefreshControl'
import { GithubControl } from './GithubControl'
import { LogoutControl } from './LogoutControl'

interface HeaderControlsProps extends BoxProps {
    githubLink?: string
    isGithubLoading?: boolean
    stars?: number
    withGithub?: boolean
    withLanguage?: boolean
    withLogout?: boolean
    withRefresh?: boolean
}

export function HeaderControls({
    withLogout = true,
    withRefresh = true,
    withLanguage = true,
    ...others
}: HeaderControlsProps) {
    return (
        <Group gap="xs" {...others}>
            {withLanguage && <LanguageControl />}
            {withRefresh && <RefreshControl />}
            {withLogout && <LogoutControl />}
        </Group>
    )
}
