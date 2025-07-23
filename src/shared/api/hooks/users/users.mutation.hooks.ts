import {
    BulkAllResetTrafficUsersCommand,
    BulkAllUpdateUsersCommand,
    BulkDeleteUsersByStatusCommand,
    BulkDeleteUsersCommand,
    BulkResetTrafficUsersCommand,
    BulkRevokeUsersSubscriptionCommand,
    BulkUpdateUsersCommand,
    BulkUpdateUsersInboundsCommand,
    CreateUserCommand,
    DeleteUserCommand,
    DisableUserCommand,
    EnableUserCommand,
    ResetUserTrafficCommand,
    RevokeUserSubscriptionCommand,
    UpdateUserCommand
} from '@localzet/aura-contract'
import { notifications } from '@mantine/notifications'
import { createMutationHook } from '../../tsq-helpers'

export const useCreateUser = createMutationHook({
    endpoint: CreateUserCommand.TSQ_url,
    bodySchema: CreateUserCommand.RequestSchema,
    responseSchema: CreateUserCommand.ResponseSchema,
    requestMethod: CreateUserCommand.endpointDetails.REQUEST_METHOD,
    rMutationParams: {
        onSuccess: () => {
            notifications.show({
                title: 'Выполнено',
                message: 'Пользователь успешно создан',
                color: 'teal'
            })
        },
        onError: (error) => {
            notifications.show({
                title: 'Создание пользователя',
                message: error instanceof Error ? error.message : 'Неизвестная ошибка',
                color: 'red'
            })
        }
    }
})

export const useUpdateUser = createMutationHook({
    endpoint: UpdateUserCommand.TSQ_url,
    bodySchema: UpdateUserCommand.RequestSchema,
    responseSchema: UpdateUserCommand.ResponseSchema,
    requestMethod: UpdateUserCommand.endpointDetails.REQUEST_METHOD,
    rMutationParams: {
        onSuccess: () => {
            notifications.show({
                title: 'Выполнено',
                message: 'Пользователь успешно обновлён',
                color: 'teal'
            })
        },
        onError: (error) => {
            notifications.show({
                title: 'Обновление пользователя',
                message: error instanceof Error ? error.message : 'Неизвестная ошибка',
                color: 'red'
            })
        }
    }
})

export const useDeleteUser = createMutationHook({
    endpoint: DeleteUserCommand.TSQ_url,
    responseSchema: DeleteUserCommand.ResponseSchema,
    routeParamsSchema: DeleteUserCommand.RequestSchema,
    requestMethod: DeleteUserCommand.endpointDetails.REQUEST_METHOD,
    rMutationParams: {
        onSuccess: () => {
            notifications.show({
                title: 'Выполнено',
                message: 'Пользователь успешно удалён',
                color: 'teal'
            })
        },
        onError: (error) => {
            notifications.show({
                title: 'Удаление пользователя',
                message: error instanceof Error ? error.message : 'Неизвестная ошибка',
                color: 'red'
            })
        }
    }
})

export const useRevokeUserSubscription = createMutationHook({
    endpoint: RevokeUserSubscriptionCommand.TSQ_url,
    responseSchema: RevokeUserSubscriptionCommand.ResponseSchema,
    routeParamsSchema: RevokeUserSubscriptionCommand.RequestSchema,
    requestMethod: RevokeUserSubscriptionCommand.endpointDetails.REQUEST_METHOD,
    rMutationParams: {
        onSuccess: () => {
            notifications.show({
                title: 'Выполнено',
                message: 'Подписка пользователя успешно отозвана',
                color: 'teal'
            })
        },
        onError: (error) => {
            notifications.show({
                title: 'Отзыв подписки пользователя',
                message: error instanceof Error ? error.message : 'Неизвестная ошибка',
                color: 'red'
            })
        }
    }
})

export const useEnableUser = createMutationHook({
    endpoint: EnableUserCommand.TSQ_url,
    responseSchema: EnableUserCommand.ResponseSchema,
    routeParamsSchema: EnableUserCommand.RequestSchema,
    requestMethod: EnableUserCommand.endpointDetails.REQUEST_METHOD,
    rMutationParams: {
        onSuccess: () => {
            notifications.show({
                title: 'Выполнено',
                message: 'Пользователь успешно включён',
                color: 'teal'
            })
        },
        onError: (error) => {
            notifications.show({
                title: 'Включение пользователя',
                message: error instanceof Error ? error.message : 'Неизвестная ошибка',
                color: 'red'
            })
        }
    }
})

export const useDisableUser = createMutationHook({
    endpoint: DisableUserCommand.TSQ_url,
    responseSchema: DisableUserCommand.ResponseSchema,
    routeParamsSchema: DisableUserCommand.RequestSchema,
    requestMethod: DisableUserCommand.endpointDetails.REQUEST_METHOD,
    rMutationParams: {
        onSuccess: () => {
            notifications.show({
                title: 'Выполнено',
                message: 'Пользователь успешно отключён',
                color: 'teal'
            })
        },
        onError: (error) => {
            notifications.show({
                title: 'Отключение пользователя',
                message: error instanceof Error ? error.message : 'Неизвестная ошибка',
                color: 'red'
            })
        }
    }
})

export const useResetUserTraffic = createMutationHook({
    endpoint: ResetUserTrafficCommand.TSQ_url,
    responseSchema: ResetUserTrafficCommand.ResponseSchema,
    routeParamsSchema: ResetUserTrafficCommand.RequestSchema,
    requestMethod: ResetUserTrafficCommand.endpointDetails.REQUEST_METHOD,
    rMutationParams: {
        onSuccess: () => {
            notifications.show({
                title: 'Выполнено',
                message: 'Трафик пользователя успешно сброшен',
                color: 'teal'
            })
        },
        onError: (error) => {
            notifications.show({
                title: 'Сброс трафика пользователя',
                message: error instanceof Error ? error.message : 'Неизвестная ошибка',
                color: 'red'
            })
        }
    }
})

export const useBulkDeleteUsersByStatus = createMutationHook({
    endpoint: BulkDeleteUsersByStatusCommand.TSQ_url,
    bodySchema: BulkDeleteUsersByStatusCommand.RequestSchema,
    responseSchema: BulkDeleteUsersByStatusCommand.ResponseSchema,
    requestMethod: BulkDeleteUsersByStatusCommand.endpointDetails.REQUEST_METHOD
})

export const useBulkUpdateUsers = createMutationHook({
    endpoint: BulkUpdateUsersCommand.TSQ_url,
    bodySchema: BulkUpdateUsersCommand.RequestSchema,
    responseSchema: BulkUpdateUsersCommand.ResponseSchema,
    requestMethod: BulkUpdateUsersCommand.endpointDetails.REQUEST_METHOD,
    rMutationParams: {
        onSuccess: () => {
            notifications.show({
                title: 'Выполнено',
                message: 'Задача успешно добавлена в очередь',
                color: 'teal'
            })
        },
        onError: (error) => {
            notifications.show({
                title: 'Массовое обновление пользователей',
                message: error instanceof Error ? error.message : 'Неизвестная ошибка',
                color: 'red'
            })
        }
    }
})

export const useBulkResetTraffic = createMutationHook({
    endpoint: BulkResetTrafficUsersCommand.TSQ_url,
    bodySchema: BulkResetTrafficUsersCommand.RequestSchema,
    responseSchema: BulkResetTrafficUsersCommand.ResponseSchema,
    requestMethod: BulkResetTrafficUsersCommand.endpointDetails.REQUEST_METHOD,
    rMutationParams: {
        onSuccess: () => {
            notifications.show({
                title: 'Выполнено',
                message: 'Задача успешно добавлена в очередь',
                color: 'teal'
            })
        },
        onError: (error) => {
            notifications.show({
                title: 'Массовый сброс трафика',
                message: error instanceof Error ? error.message : 'Неизвестная ошибка',
                color: 'red'
            })
        }
    }
})

export const useBulkRevokeUsersSubscription = createMutationHook({
    endpoint: BulkRevokeUsersSubscriptionCommand.TSQ_url,
    bodySchema: BulkRevokeUsersSubscriptionCommand.RequestSchema,
    responseSchema: BulkRevokeUsersSubscriptionCommand.ResponseSchema,
    requestMethod: BulkRevokeUsersSubscriptionCommand.endpointDetails.REQUEST_METHOD,
    rMutationParams: {
        onSuccess: () => {
            notifications.show({
                title: 'Выполнено',
                message: 'Задача успешно добавлена в очередь',
                color: 'teal'
            })
        },
        onError: (error) => {
            notifications.show({
                title: 'Массовый отзыв подписок',
                message: error instanceof Error ? error.message : 'Неизвестная ошибка',
                color: 'red'
            })
        }
    }
})

export const useBulkDeleteUsers = createMutationHook({
    endpoint: BulkDeleteUsersCommand.TSQ_url,
    bodySchema: BulkDeleteUsersCommand.RequestSchema,
    responseSchema: BulkDeleteUsersCommand.ResponseSchema,
    requestMethod: BulkDeleteUsersCommand.endpointDetails.REQUEST_METHOD,
    rMutationParams: {
        onSuccess: () => {
            notifications.show({
                title: 'Выполнено',
                message: 'Задача успешно добавлена в очередь',
                color: 'teal'
            })
        },
        onError: (error) => {
            notifications.show({
                title: 'Массовое удаление пользователей',
                message: error instanceof Error ? error.message : 'Неизвестная ошибка',
                color: 'red'
            })
        }
    }
})

export const useBulkSetActiveInbounds = createMutationHook({
    endpoint: BulkUpdateUsersInboundsCommand.TSQ_url,
    bodySchema: BulkUpdateUsersInboundsCommand.RequestSchema,
    responseSchema: BulkUpdateUsersInboundsCommand.ResponseSchema,
    requestMethod: BulkUpdateUsersInboundsCommand.endpointDetails.REQUEST_METHOD,
    rMutationParams: {
        onSuccess: () => {
            notifications.show({
                title: 'Выполнено',
                message: 'Задача успешно добавлена в очередь',
                color: 'teal'
            })
        },
        onError: (error) => {
            notifications.show({
                title: 'Массовое назначение инбаундов',
                message: error instanceof Error ? error.message : 'Неизвестная ошибка',
                color: 'red'
            })
        }
    }
})

export const useBulkAllUpdateUsers = createMutationHook({
    endpoint: BulkAllUpdateUsersCommand.TSQ_url,
    bodySchema: BulkAllUpdateUsersCommand.RequestSchema,
    responseSchema: BulkAllUpdateUsersCommand.ResponseSchema,
    requestMethod: BulkAllUpdateUsersCommand.endpointDetails.REQUEST_METHOD,
    rMutationParams: {
        onSuccess: () => {
            notifications.show({
                title: 'Выполнено',
                message: 'Задача успешно добавлена в очередь',
                color: 'teal'
            })
        },
        onError: (error) => {
            notifications.show({
                title: 'Массовое обновление всех пользователей',
                message: error instanceof Error ? error.message : 'Неизвестная ошибка',
                color: 'red'
            })
        }
    }
})

export const useBulkAllResetTrafficUsers = createMutationHook({
    endpoint: BulkAllResetTrafficUsersCommand.TSQ_url,
    responseSchema: BulkAllResetTrafficUsersCommand.ResponseSchema,
    requestMethod: BulkAllResetTrafficUsersCommand.endpointDetails.REQUEST_METHOD,
    rMutationParams: {
        onSuccess: () => {
            notifications.show({
                title: 'Выполнено',
                message: 'Задача успешно добавлена в очередь',
                color: 'teal'
            })
        },
        onError: (error) => {
            notifications.show({
                title: 'Массовый сброс трафика для всех пользователей',
                message: error instanceof Error ? error.message : 'Неизвестная ошибка',
                color: 'red'
            })
        }
    }
})
