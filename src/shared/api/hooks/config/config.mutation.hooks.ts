import { UpdateXrayConfigCommand } from '@localzet/aura-contract'
import { notifications } from '@mantine/notifications'

import { createMutationHook } from '../../tsq-helpers'

export const useUpdateConfig = createMutationHook({
    endpoint: UpdateXrayConfigCommand.TSQ_url,
    bodySchema: UpdateXrayConfigCommand.RequestSchema,
    responseSchema: UpdateXrayConfigCommand.ResponseSchema,
    requestMethod: UpdateXrayConfigCommand.endpointDetails.REQUEST_METHOD,
    rMutationParams: {
        onSuccess: () => {
            notifications.show({
                title: 'Выполнено',
                message: 'Конфигурация успешно обновлена',
                color: 'teal'
            })
        },
        onError: (error) => {
            notifications.show({
                title: "Обновление конфигурации",
                message:
                    error instanceof Error ? error.message : "Неизвестная ошибка",
                color: 'red'
            })
        }
    }
})