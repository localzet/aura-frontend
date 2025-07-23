import {
    AddInboundToNodesCommand,
    AddInboundToUsersCommand,
    RemoveInboundFromNodesCommand,
    RemoveInboundFromUsersCommand
} from '@localzet/aura-contract'
import { notifications } from '@mantine/notifications'

import { createMutationHook } from '../../tsq-helpers'

export const useAddInboundToUsers = createMutationHook({
    endpoint: AddInboundToUsersCommand.TSQ_url,
    bodySchema: AddInboundToUsersCommand.RequestSchema,
    responseSchema: AddInboundToUsersCommand.ResponseSchema,
    requestMethod: AddInboundToUsersCommand.endpointDetails.REQUEST_METHOD,
    rMutationParams: {
        onError: (error) => {
            notifications.show({
                title: "Добавление инбаунда пользователям",
                message:
                    error instanceof Error ? error.message : "Неизвестная ошибка",
                color: 'red'
            })
        }
    }
})

export const useRemoveInboundFromUsers = createMutationHook({
    endpoint: RemoveInboundFromUsersCommand.TSQ_url,
    bodySchema: RemoveInboundFromUsersCommand.RequestSchema,
    responseSchema: RemoveInboundFromUsersCommand.ResponseSchema,
    requestMethod: RemoveInboundFromUsersCommand.endpointDetails.REQUEST_METHOD,
    rMutationParams: {
        onError: (error) => {
            notifications.show({
                title: "Удаление инбаунда у пользователей",
                message:
                    error instanceof Error ? error.message : "Неизвестная ошибка",
                color: 'red'
            })
        }
    }
})

export const useAddInboundToNodes = createMutationHook({
    endpoint: AddInboundToNodesCommand.TSQ_url,
    bodySchema: AddInboundToNodesCommand.RequestSchema,
    responseSchema: AddInboundToNodesCommand.ResponseSchema,
    requestMethod: AddInboundToNodesCommand.endpointDetails.REQUEST_METHOD,
    rMutationParams: {
        onError: (error) => {
            notifications.show({
                title: "Добавление инбаунда нодам",
                message:
                    error instanceof Error ? error.message : "Неизвестная ошибка",
                color: 'red'
            })
        }
    }
})

export const useRemoveInboundFromNodes = createMutationHook({
    endpoint: RemoveInboundFromNodesCommand.TSQ_url,
    bodySchema: RemoveInboundFromNodesCommand.RequestSchema,
    responseSchema: RemoveInboundFromNodesCommand.ResponseSchema,
    requestMethod: RemoveInboundFromNodesCommand.endpointDetails.REQUEST_METHOD,
    rMutationParams: {
        onError: (error) => {
            notifications.show({
                title: "Удаление инбаунда у нод",
                message:
                    error instanceof Error ? error.message : "Неизвестная ошибка",
                color: 'red'
            })
        }
    }
})