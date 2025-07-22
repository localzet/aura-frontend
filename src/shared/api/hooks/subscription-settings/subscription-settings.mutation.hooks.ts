import { UpdateSubscriptionSettingsCommand } from '@localzet/aura-contract'
import { notifications } from '@mantine/notifications'

import { createMutationHook } from '../../tsq-helpers'

export const useUpdateSubscriptionSettings = createMutationHook({
    endpoint: UpdateSubscriptionSettingsCommand.TSQ_url,
    bodySchema: UpdateSubscriptionSettingsCommand.RequestSchema,
    responseSchema: UpdateSubscriptionSettingsCommand.ResponseSchema,
    requestMethod: UpdateSubscriptionSettingsCommand.endpointDetails.REQUEST_METHOD,
    rMutationParams: {
        onSuccess: () => {
            notifications.show({
                title: 'Выполнено',
                message: 'Настройки подписки успешно обновлены',
                color: 'teal'
            })
        },
        onError: (error) => {
            notifications.show({
                title: 'Обновление настроек подписки',
                message: error instanceof Error ? error.message : `Неизвестная ошибка`,
                color: 'red'
            })
        }
    }
})
