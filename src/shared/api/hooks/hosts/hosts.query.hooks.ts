import { GetAllHostsCommand } from '@localzet/aura-contract'
import { createQueryKeys } from '@lukemorales/query-key-factory'
import { notifications } from '@mantine/notifications'

import { createGetQueryHook } from '../../tsq-helpers'

export const hostsQueryKeys = createQueryKeys('hosts', {
    getAllHosts: {
        queryKey: null
    }
})

export const useGetHosts = createGetQueryHook({
    endpoint: GetAllHostsCommand.TSQ_url,
    responseSchema: GetAllHostsCommand.ResponseSchema,
    getQueryKey: () => hostsQueryKeys.getAllHosts.queryKey,
    rQueryParams: {
        refetchOnMount: true
    },
    errorHandler: (error) => {
        notifications.show({
            title: `Получение всех хостов`,
            message: error instanceof Error ? error.message : `Неизвестная ошибка`,
            color: 'red'
        })
    }
})
