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
    githubLink,
    withGithub = true,
    withLogout = true,
    withRefresh = true,
    withLanguage = true,
    stars,
    isGithubLoading,
    ...others
}: HeaderControlsProps) {
    return (
        <Group gap="xs" {...others}>
            {withGithub && (
                <GithubControl isLoading={isGithubLoading} link={githubLink!} stars={stars} />
            )}
            {withLanguage && <LanguageControl />}
            {withRefresh && <RefreshControl />}
            {withLogout && <LogoutControl />}
        </Group>
    )
}
