import { UpdateSubscriptionTemplateCommand } from '@localzet/aura-contract'
import { notifications } from '@mantine/notifications'

import { createMutationHook } from '../../tsq-helpers'

export const useUpdateSubscriptionTemplate = createMutationHook({
    endpoint: UpdateSubscriptionTemplateCommand.TSQ_url,
    bodySchema: UpdateSubscriptionTemplateCommand.RequestSchema,
    responseSchema: UpdateSubscriptionTemplateCommand.ResponseSchema,
    requestMethod: UpdateSubscriptionTemplateCommand.endpointDetails.REQUEST_METHOD,
    rMutationParams: {
        onSuccess: () => {
            notifications.show({
                title: 'Выполнено',
                message: 'Шаблон подписки успешно обновлён',
                color: 'teal'
            })
        },
        onError: (error) => {
            notifications.show({
                title: "Обновление шаблона подписки",
                message:
                    error instanceof Error ? error.message : "Неизвестная ошибка",
                color: 'red'
            })
        }
    }
})