import {
    GetBandwidthStatsCommand,
    GetNodesStatisticsCommand,
    GetStatsCommand
} from '@localzet/aura-contract'
import { createQueryKeys } from '@lukemorales/query-key-factory'
import { keepPreviousData } from '@tanstack/react-query'
import { notifications } from '@mantine/notifications'

import { getUserTimezoneUtil, sToMs } from '@shared/utils/time-utils'

import { createGetQueryHook } from '../../tsq-helpers'

const STALE_TIME = 5_000
const REFETCH_INTERVAL = 5_100

export const systemQueryKeys = createQueryKeys('system', {
    getSystemStats: {
        queryKey: null
    },
    getBandwidthStats: {
        queryKey: null
    },
    getNodesStatistics: {
        queryKey: null
    }
})

export const useGetSystemStats = createGetQueryHook({
    endpoint: GetStatsCommand.TSQ_url,
    responseSchema: GetStatsCommand.ResponseSchema,
    requestQuerySchema: GetStatsCommand.RequestQuerySchema,
    getQueryKey: () => systemQueryKeys.getSystemStats.queryKey,
    rQueryParams: {
        placeholderData: keepPreviousData,
        staleTime: STALE_TIME,
        refetchInterval: REFETCH_INTERVAL
    },
    queryParams: {
        tz: getUserTimezoneUtil()
    },
    errorHandler: (error) => {
        notifications.show({
            title: `Получение статистики системы`,
            message: error instanceof Error ? error.message : `Неизвестная ошибка`,
            color: 'red'
        })
    }
})

export const useGetBandwidthStats = createGetQueryHook({
    endpoint: GetBandwidthStatsCommand.TSQ_url,
    responseSchema: GetBandwidthStatsCommand.ResponseSchema,
    requestQuerySchema: GetBandwidthStatsCommand.RequestQuerySchema,
    getQueryKey: () => systemQueryKeys.getBandwidthStats.queryKey,
    rQueryParams: {
        placeholderData: keepPreviousData,
        staleTime: STALE_TIME,
        refetchInterval: REFETCH_INTERVAL
    },
    queryParams: {
        tz: getUserTimezoneUtil()
    },
    errorHandler: (error) => {
        notifications.show({
            title: `Получение статистики пропускной способности`,
            message: error instanceof Error ? error.message : `Неизвестная ошибка`,
            color: 'red'
        })
    }
})

export const useGetNodesStatisticsCommand = createGetQueryHook({
    endpoint: GetNodesStatisticsCommand.TSQ_url,
    responseSchema: GetNodesStatisticsCommand.ResponseSchema,
    requestQuerySchema: GetNodesStatisticsCommand.RequestQuerySchema,
    getQueryKey: () => systemQueryKeys.getNodesStatistics.queryKey,
    rQueryParams: {
        placeholderData: keepPreviousData,
        staleTime: sToMs(30),
        refetchInterval: sToMs(30)
    },
    queryParams: {
        tz: getUserTimezoneUtil()
    },
    errorHandler: (error) => {
        notifications.show({
            title: `Получение статистики нод`,
            message: error instanceof Error ? error.message : `Неизвестная ошибка`,
            color: 'red'
        })
    }
})