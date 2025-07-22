import {
    CreateNodeCommand,
    DeleteNodeCommand,
    DisableNodeCommand,
    EnableNodeCommand,
    ReorderNodeCommand,
    RestartAllNodesCommand,
    UpdateNodeCommand
} from '@localzet/aura-contract'
import { notifications } from '@mantine/notifications'

import { createMutationHook } from '../../tsq-helpers'

export const useCreateNode = createMutationHook({
    endpoint: CreateNodeCommand.TSQ_url,
    bodySchema: CreateNodeCommand.RequestSchema,
    responseSchema: CreateNodeCommand.ResponseSchema,
    requestMethod: CreateNodeCommand.endpointDetails.REQUEST_METHOD,
    rMutationParams: {
        onSuccess: () => {
            notifications.show({
                title: 'Выполнено',
                message: 'Нода успешно создана',
                color: 'teal'
            })
        },
        onError: (error) => {
            notifications.show({
                title: `Создание ноды`,
                message: error instanceof Error ? error.message : `Неизвестная ошибка`,
                color: 'red'
            })
        }
    }
})

export const useUpdateNode = createMutationHook({
    endpoint: UpdateNodeCommand.TSQ_url,
    bodySchema: UpdateNodeCommand.RequestSchema,
    responseSchema: UpdateNodeCommand.ResponseSchema,
    requestMethod: UpdateNodeCommand.endpointDetails.REQUEST_METHOD,
    rMutationParams: {
        onSuccess: () => {
            notifications.show({
                title: 'Выполнено',
                message: 'Нода успешно обновлена',
                color: 'teal'
            })
        },
        onError: (error) => {
            notifications.show({
                title: `Обновление ноды`,
                message: error instanceof Error ? error.message : `Неизвестная ошибка`,
                color: 'red'
            })
        }
    }
})

export const useDeleteNode = createMutationHook({
    endpoint: DeleteNodeCommand.TSQ_url,
    responseSchema: DeleteNodeCommand.ResponseSchema,
    routeParamsSchema: DeleteNodeCommand.RequestSchema,
    requestMethod: DeleteNodeCommand.endpointDetails.REQUEST_METHOD,
    rMutationParams: {
        onSuccess: () => {
            notifications.show({
                title: 'Выполнено',
                message: 'Нода успешно удалена',
                color: 'teal'
            })
        },
        onError: (error) => {
            notifications.show({
                title: `Удаление ноды`,
                message: error instanceof Error ? error.message : `Неизвестная ошибка`,
                color: 'red'
            })
        }
    }
})

export const useEnableNode = createMutationHook({
    endpoint: EnableNodeCommand.TSQ_url,
    responseSchema: EnableNodeCommand.ResponseSchema,
    routeParamsSchema: EnableNodeCommand.RequestSchema,
    requestMethod: EnableNodeCommand.endpointDetails.REQUEST_METHOD,
    rMutationParams: {
        onSuccess: () => {
            notifications.show({
                title: 'Выполнено',
                message: 'Нода успешно включена',
                color: 'teal'
            })
        },
        onError: (error) => {
            notifications.show({
                title: `Включение ноды`,
                message: error instanceof Error ? error.message : `Неизвестная ошибка`,
                color: 'red'
            })
        }
    }
})

export const useDisableNode = createMutationHook({
    endpoint: DisableNodeCommand.TSQ_url,
    responseSchema: DisableNodeCommand.ResponseSchema,
    routeParamsSchema: DisableNodeCommand.RequestSchema,
    requestMethod: DisableNodeCommand.endpointDetails.REQUEST_METHOD,
    rMutationParams: {
        onSuccess: () => {
            notifications.show({
                title: 'Выполнено',
                message: 'Нода успешно отключена',
                color: 'teal'
            })
        },
        onError: (error) => {
            notifications.show({
                title: `Отключение ноды`,
                message: error instanceof Error ? error.message : `Неизвестная ошибка`,
                color: 'red'
            })
        }
    }
})

export const useRestartAllNodes = createMutationHook({
    endpoint: RestartAllNodesCommand.TSQ_url,
    responseSchema: RestartAllNodesCommand.ResponseSchema,
    requestMethod: RestartAllNodesCommand.endpointDetails.REQUEST_METHOD,
    rMutationParams: {
        onSuccess: () => {
            notifications.show({
                title: 'Выполнено',
                message: 'Пожалуйста, подождите пока ноды переподключатся',
                color: 'teal'
            })
        },
        onError: (error) => {
            notifications.show({
                title: `Перезапуск всех нод`,
                message: error instanceof Error ? error.message : `Неизвестная ошибка`,
                color: 'red'
            })
        }
    }
})

export const useReorderNodes = createMutationHook({
    endpoint: ReorderNodeCommand.TSQ_url,
    bodySchema: ReorderNodeCommand.RequestSchema,
    responseSchema: ReorderNodeCommand.ResponseSchema,
    requestMethod: ReorderNodeCommand.endpointDetails.REQUEST_METHOD,
    rMutationParams: {
        onError: (error) => {
            notifications.show({
                title: `Изменение порядка нод`,
                message: error instanceof Error ? error.message : `Неизвестная ошибка`,
                color: 'red'
            })
        }
    }
})
