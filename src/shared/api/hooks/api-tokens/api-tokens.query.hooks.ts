import { FindAllApiTokensCommand } from '@localzet/aura-contract'
import { createQueryKeys } from '@lukemorales/query-key-factory'
import { keepPreviousData } from '@tanstack/react-query'
import { notifications } from '@mantine/notifications'

import { createGetQueryHook } from '../../tsq-helpers'

export const apiTokensQueryKeys = createQueryKeys('apiTokens', {
    getAllApiTokens: {
        queryKey: null
    }
})

export const useGetApiTokens = createGetQueryHook({
    endpoint: FindAllApiTokensCommand.TSQ_url,
    responseSchema: FindAllApiTokensCommand.ResponseSchema,
    getQueryKey: () => apiTokensQueryKeys.getAllApiTokens.queryKey,
    rQueryParams: {
        placeholderData: keepPreviousData,
        refetchOnMount: true
    },
    errorHandler: (error) => {
        notifications.show({
            title: "Получение всех API-токенов",
            message: error instanceof Error ? error.message : "Неизвестная ошибка",
            color: 'red'
        })
    }
})