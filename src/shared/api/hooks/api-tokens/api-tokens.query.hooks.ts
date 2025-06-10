import { FindAllApiTokensCommand } from '@localzet/aura-backend-contract'
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
            title: `Get All Api Tokens`,
            message: error instanceof Error ? error.message : `Request failed with unknown error.`,
            color: 'red'
        })
    }
})
