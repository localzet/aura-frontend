import { DeleteUserHwidDeviceCommand } from '@localzet/aura-contract'
import { notifications } from '@mantine/notifications'

import { createMutationHook } from '../../tsq-helpers'

export const useDeleteUserHwidDevice = createMutationHook({
    endpoint: DeleteUserHwidDeviceCommand.TSQ_url,
    bodySchema: DeleteUserHwidDeviceCommand.RequestSchema,
    responseSchema: DeleteUserHwidDeviceCommand.ResponseSchema,
    requestMethod: DeleteUserHwidDeviceCommand.endpointDetails.REQUEST_METHOD,
    rMutationParams: {
        onSuccess: () => {
            notifications.show({
                title: 'Выполнено',
                message: 'Устройство успешно удалено',
                color: 'teal'
            })
        },
        onError: (error) => {
            notifications.show({
                title: 'Удаление устройства',
                message: error instanceof Error ? error.message : 'Неизвестная ошибка',
                color: 'red'
            })
        }
    }
})
