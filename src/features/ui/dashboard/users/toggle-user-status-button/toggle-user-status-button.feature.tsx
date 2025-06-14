import { PiCellSignalFullDuotone, PiCellSignalSlashDuotone, PiTrashDuotone } from 'react-icons/pi'
import { USERS_STATUS } from '@localzet/aura-contract'
import { ActionIcon, Tooltip } from '@mantine/core'
import { useTranslation } from 'react-i18next'

import { useDisableUser, useEnableUser, usersQueryKeys } from '@shared/api/hooks'
import { queryClient } from '@shared/api'

import { IProps } from './interfaces'

export function ToggleUserStatusButtonFeature(props: IProps) {
    const { t } = useTranslation()

    const { user } = props
    const { uuid } = user

    const { mutate: disableUser, isPending: isDisableUserPending } = useDisableUser({
        mutationFns: {
            onSuccess: (data) => {
                queryClient.setQueryData(usersQueryKeys.getUserByUuid({ uuid }).queryKey, data)
            }
        }
    })

    const { mutate: enableUser, isPending: isEnableUserPending } = useEnableUser({
        mutationFns: {
            onSuccess: (data) => {
                queryClient.setQueryData(usersQueryKeys.getUserByUuid({ uuid }).queryKey, data)
            }
        }
    })

    let buttonLabel = ''
    let color = 'blue'
    let icon = <PiTrashDuotone size="1rem" />

    if (user.status === USERS_STATUS.DISABLED) {
        color = 'green'
        buttonLabel = t('toggle-user-status-button.feature.enable')
        icon = <PiCellSignalFullDuotone size="1rem" />
    } else {
        color = 'var(--mantine-color-red-5)'
        buttonLabel = t('toggle-user-status-button.feature.disable')
        icon = <PiCellSignalSlashDuotone size="1rem" />
    }

    const handleToggleUserStatus = async () => {
        if (user.status !== USERS_STATUS.DISABLED) {
            disableUser({ route: { uuid } })
        } else {
            enableUser({ route: { uuid } })
        }
    }

    return (
        <Tooltip label={buttonLabel}>
            <ActionIcon
                color={color}
                loading={isDisableUserPending || isEnableUserPending}
                onClick={handleToggleUserStatus}
                size="xl"
            >
                {icon}
            </ActionIcon>
        </Tooltip>
    )
}
