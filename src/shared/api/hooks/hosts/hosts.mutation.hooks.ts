import {
    BulkDeleteHostsCommand,
    BulkDisableHostsCommand,
    BulkEnableHostsCommand,
    CreateHostCommand,
    DeleteHostCommand,
    ReorderHostCommand,
    SetInboundToManyHostsCommand,
    SetPortToManyHostsCommand,
    UpdateHostCommand
} from '@localzet/aura-contract'
import { notifications } from '@mantine/notifications'

import { createMutationHook } from '../../tsq-helpers'

export const useCreateHost = createMutationHook({
    endpoint: CreateHostCommand.TSQ_url,
    bodySchema: CreateHostCommand.RequestSchema,
    responseSchema: CreateHostCommand.ResponseSchema,
    requestMethod: CreateHostCommand.endpointDetails.REQUEST_METHOD,
    rMutationParams: {
        onSuccess: () => {
            notifications.show({
                title: 'Выполнено',
                message: 'Хост успешно создан',
                color: 'teal'
            })
        },
        onError: (error) => {
            notifications.show({
                title: `Создание хоста`,
                message:
                    error instanceof Error ? error.message : `Неизвестная ошибка`,
                color: 'red'
            })
        }
    }
})

export const useUpdateHost = createMutationHook({
    endpoint: UpdateHostCommand.TSQ_url,
    bodySchema: UpdateHostCommand.RequestSchema,
    responseSchema: UpdateHostCommand.ResponseSchema,
    requestMethod: UpdateHostCommand.endpointDetails.REQUEST_METHOD,
    rMutationParams: {
        onSuccess: () => {
            notifications.show({
                title: 'Выполнено',
                message: 'Хост успешно обновлен',
                color: 'teal'
            })
        },
        onError: (error) => {
            notifications.show({
                title: `Обновление хоста`,
                message:
                    error instanceof Error ? error.message : `Неизвестная ошибка`,
                color: 'red'
            })
        }
    }
})

export const useDeleteHost = createMutationHook({
    endpoint: DeleteHostCommand.TSQ_url,
    responseSchema: DeleteHostCommand.ResponseSchema,
    routeParamsSchema: DeleteHostCommand.RequestSchema,
    requestMethod: DeleteHostCommand.endpointDetails.REQUEST_METHOD,
    rMutationParams: {
        onSuccess: () => {
            notifications.show({
                title: 'Выполнено',
                message: 'Хост успешно удален',
                color: 'teal'
            })
        },
        onError: (error) => {
            notifications.show({
                title: `Удаление хоста`,
                message:
                    error instanceof Error ? error.message : `Неизвестная ошибка`,
                color: 'red'
            })
        }
    }
})

export const useReorderHosts = createMutationHook({
    endpoint: ReorderHostCommand.TSQ_url,
    bodySchema: ReorderHostCommand.RequestSchema,
    responseSchema: ReorderHostCommand.ResponseSchema,
    requestMethod: ReorderHostCommand.endpointDetails.REQUEST_METHOD,
    rMutationParams: {
        onError: (error) => {
            notifications.show({
                title: `Изменение порядка хостов`,
                message:
                    error instanceof Error ? error.message : `Неизвестная ошибка`,
                color: 'red'
            })
        }
    }
})

export const useBulkDeleteHosts = createMutationHook({
    endpoint: BulkDeleteHostsCommand.TSQ_url,
    bodySchema: BulkDeleteHostsCommand.RequestSchema,
    responseSchema: BulkDeleteHostsCommand.ResponseSchema,
    requestMethod: BulkDeleteHostsCommand.endpointDetails.REQUEST_METHOD,
    rMutationParams: {
        onSuccess: () => {
            notifications.show({
                title: 'Выполнено',
                message: 'Хосты успешно удалены',
                color: 'teal'
            })
        },
        onError: (error) => {
            notifications.show({
                title: `Массовое удаление хостов`,
                message:
                    error instanceof Error ? error.message : `Неизвестная ошибка`,
                color: 'red'
            })
        }
    }
})

export const useBulkEnableHosts = createMutationHook({
    endpoint: BulkEnableHostsCommand.TSQ_url,
    bodySchema: BulkEnableHostsCommand.RequestSchema,
    responseSchema: BulkEnableHostsCommand.ResponseSchema,
    requestMethod: BulkEnableHostsCommand.endpointDetails.REQUEST_METHOD,
    rMutationParams: {
        onSuccess: () => {
            notifications.show({
                title: 'Выполнено',
                message: 'Хосты успешно включены',
                color: 'teal'
            })
        },
        onError: (error) => {
            notifications.show({
                title: `Массовое включение хостов`,
                message:
                    error instanceof Error ? error.message : `Неизвестная ошибка`,
                color: 'red'
            })
        }
    }
})

export const useBulkDisableHosts = createMutationHook({
    endpoint: BulkDisableHostsCommand.TSQ_url,
    bodySchema: BulkDisableHostsCommand.RequestSchema,
    responseSchema: BulkDisableHostsCommand.ResponseSchema,
    requestMethod: BulkDisableHostsCommand.endpointDetails.REQUEST_METHOD,
    rMutationParams: {
        onSuccess: () => {
            notifications.show({
                title: 'Выполнено',
                message: 'Хосты успешно отключены',
                color: 'teal'
            })
        },
        onError: (error) => {
            notifications.show({
                title: `Массовое отключение хостов`,
                message:
                    error instanceof Error ? error.message : `Неизвестная ошибка`,
                color: 'red'
            })
        }
    }
})

export const useSetInboundHosts = createMutationHook({
    endpoint: SetInboundToManyHostsCommand.TSQ_url,
    bodySchema: SetInboundToManyHostsCommand.RequestSchema,
    responseSchema: SetInboundToManyHostsCommand.ResponseSchema,
    requestMethod: SetInboundToManyHostsCommand.endpointDetails.REQUEST_METHOD,
    rMutationParams: {
        onSuccess: () => {
            notifications.show({
                title: 'Выполнено',
                message: 'Инбаунд успешно установлен для хостов',
                color: 'teal'
            })
        },
        onError: (error) => {
            notifications.show({
                title: `Установка инбаунда для нескольких хостов`,
                message:
                    error instanceof Error ? error.message : `Неизвестная ошибка`,
                color: 'red'
            })
        }
    }
})

export const useSetPortToManyHosts = createMutationHook({
    endpoint: SetPortToManyHostsCommand.TSQ_url,
    bodySchema: SetPortToManyHostsCommand.RequestSchema,
    responseSchema: SetPortToManyHostsCommand.ResponseSchema,
    requestMethod: SetPortToManyHostsCommand.endpointDetails.REQUEST_METHOD,
    rMutationParams: {
        onSuccess: () => {
            notifications.show({
                title: 'Выполнено',
                message: 'Порт успешно установлен для хостов',
                color: 'teal'
            })
        },
        onError: (error) => {
            notifications.show({
                title: `Установка порта для нескольких хостов`,
                message:
                    error instanceof Error ? error.message : `Неизвестная ошибка`,
                color: 'red'
            })
        }
    }
})