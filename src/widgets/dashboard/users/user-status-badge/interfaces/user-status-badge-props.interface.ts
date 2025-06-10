import { TUsersStatus } from '@localzet/aura-backend-contract'
import { BadgeProps } from '@mantine/core'

export interface UserStatusBadgeProps extends Omit<BadgeProps, 'children' | 'color'> {
    status: TUsersStatus
}
