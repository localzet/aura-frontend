import { CreateApiTokenCommand, DeleteApiTokenCommand } from '@localzet/aura-contract'
import { notifications } from '@mantine/notifications'

import { createMutationHook } from '@shared/api/tsq-helpers/create-mutation-hook'

export const useCreateApiToken = createMutationHook({
    endpoint: CreateApiTokenCommand.TSQ_url,
    bodySchema: CreateApiTokenCommand.RequestSchema,
    responseSchema: CreateApiTokenCommand.ResponseSchema,
    requestMethod: CreateApiTokenCommand.endpointDetails.REQUEST_METHOD,
    rMutationParams: {
        onSuccess: () => {
            notifications.show({
                title: 'Выполнено',
                message: 'API-токен успешно создан',
                color: 'teal'
            })
        },
        onError: (error) => {
            notifications.show({
                title: `Создание API-токена`,
                message: error instanceof Error ? error.message : `Неизвестная ошибка`,
                color: 'red'
            })
        }
    }
})

export const useDeleteApiToken = createMutationHook({
    endpoint: DeleteApiTokenCommand.TSQ_url,
    responseSchema: DeleteApiTokenCommand.ResponseSchema,
    routeParamsSchema: DeleteApiTokenCommand.RequestSchema,
    requestMethod: DeleteApiTokenCommand.endpointDetails.REQUEST_METHOD,
    rMutationParams: {
        onSuccess: () => {
            notifications.show({
                title: 'Выполнено',
                message: 'API-токен успешно удален',
                color: 'teal'
            })
        },
        onError: (error) => {
            notifications.show({
                title: `Удаление API-токена`,
                message: error instanceof Error ? error.message : `Неизвестная ошибка`,
                color: 'red'
            })
        }
    }
})
