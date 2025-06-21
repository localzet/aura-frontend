import { createQueryKeys } from '@lukemorales/query-key-factory'
import { GetStatusCommand } from '@localzet/aura-contract'
import { notifications } from '@mantine/notifications'

import { createGetQueryHook } from '../../tsq-helpers'

export const authQueryKeys = createQueryKeys('auth', {
    getAuthStatus: {
        queryKey: null
    }
})

export const useGetAuthStatus = createGetQueryHook({
    endpoint: GetStatusCommand.TSQ_url,
    responseSchema: GetStatusCommand.ResponseSchema,
    getQueryKey: () => authQueryKeys.getAuthStatus.queryKey,
    rQueryParams: {
        refetchOnMount: false
    },
    errorHandler: (error) => {
        notifications.show({
            title: 'Ошибка аутентификации',
            message: error instanceof Error ? error.message : `Неизвестная ошибка`,
            color: 'red'
        })
    }
})
