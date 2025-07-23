import {
    GetAllTagsCommand,
    GetAllUsersCommand,
    GetSubscriptionInfoByShortUuidCommand,
    GetUserByUuidCommand,
    GetUserUsageByRangeCommand
} from '@localzet/aura-contract'
import { createQueryKeys } from '@lukemorales/query-key-factory'
import { keepPreviousData } from '@tanstack/react-query'
import { notifications } from '@mantine/notifications'

import { createGetQueryHook } from '@shared/api/tsq-helpers'
import { sToMs } from '@shared/utils/time-utils'

export const usersQueryKeys = createQueryKeys('users', {
    getAllUsers: (filters: GetAllUsersCommand.RequestQuery) => ({
        queryKey: [filters]
    }),
    getUserByUuid: (route: GetUserByUuidCommand.Request) => ({
        queryKey: [route]
    }),
    getSubscriptionInfoByShortUuid: (route: GetSubscriptionInfoByShortUuidCommand.Request) => ({
        queryKey: [route]
    }),
    getUserUsageByRange: (
        query: GetUserUsageByRangeCommand.Request & GetUserUsageByRangeCommand.RequestQuery
    ) => ({
        queryKey: [query]
    }),
    getUserTags: {
        queryKey: null
    }
})

export const useGetUserByUuid = createGetQueryHook({
    endpoint: GetUserByUuidCommand.TSQ_url,
    responseSchema: GetUserByUuidCommand.ResponseSchema,
    routeParamsSchema: GetUserByUuidCommand.RequestSchema,
    getQueryKey: ({ route }) => usersQueryKeys.getUserByUuid(route!).queryKey,
    rQueryParams: {
        staleTime: sToMs(3),
        refetchInterval: sToMs(35)
    },
    errorHandler: (error) => {
        notifications.show({
            title: 'Получение пользователя по UUID',
            message: error instanceof Error ? error.message : 'Неизвестная ошибка',
            color: 'red'
        })
    }
})

export const useGetUsersV2 = createGetQueryHook({
    endpoint: GetAllUsersCommand.TSQ_url,
    responseSchema: GetAllUsersCommand.ResponseSchema,
    requestQuerySchema: GetAllUsersCommand.RequestQuerySchema,
    getQueryKey: ({ query }) => usersQueryKeys.getAllUsers(query!).queryKey,
    rQueryParams: {
        staleTime: sToMs(20),
        refetchInterval: sToMs(25),
        placeholderData: keepPreviousData,
        refetchOnMount: true
    },
    errorHandler: (error) => {
        notifications.show({
            title: 'Получение всех пользователей',
            message: error instanceof Error ? error.message : 'Неизвестная ошибка',
            color: 'red'
        })
    }
})

export const useGetSubscriptionInfoByShortUuid = createGetQueryHook({
    endpoint: GetSubscriptionInfoByShortUuidCommand.TSQ_url,
    responseSchema: GetSubscriptionInfoByShortUuidCommand.ResponseSchema,
    routeParamsSchema: GetSubscriptionInfoByShortUuidCommand.RequestSchema,
    getQueryKey: ({ route }) => usersQueryKeys.getSubscriptionInfoByShortUuid(route!).queryKey,
    rQueryParams: {
        staleTime: sToMs(40)
    },
    errorHandler: (error) => {
        notifications.show({
            title: 'Получение информации о подписке по короткому UUID',
            message: error instanceof Error ? error.message : 'Неизвестная ошибка',
            color: 'red'
        })
    }
})

export const useGetUserUsageByRange = createGetQueryHook({
    endpoint: GetUserUsageByRangeCommand.TSQ_url,
    responseSchema: GetUserUsageByRangeCommand.ResponseSchema,
    requestQuerySchema: GetUserUsageByRangeCommand.RequestQuerySchema,
    routeParamsSchema: GetUserUsageByRangeCommand.RequestSchema,
    getQueryKey: ({ route, query }) =>
        usersQueryKeys.getUserUsageByRange({ ...route!, ...query! }).queryKey,
    rQueryParams: {
        staleTime: sToMs(15)
    },
    errorHandler: (error) => {
        notifications.show({
            title: 'Получение статистики использования пользователя за период',
            message: error instanceof Error ? error.message : 'Неизвестная ошибка',
            color: 'red'
        })
    }
})

export const useGetUserTags = createGetQueryHook({
    endpoint: GetAllTagsCommand.TSQ_url,
    responseSchema: GetAllTagsCommand.ResponseSchema,
    getQueryKey: () => usersQueryKeys.getUserTags.queryKey,
    rQueryParams: {
        staleTime: sToMs(15),
        refetchInterval: sToMs(15)
    },
    errorHandler: (error) => {
        notifications.show({
            title: 'Получение тегов пользователей',
            message: error instanceof Error ? error.message : 'Неизвестная ошибка',
            color: 'red'
        })
    }
})
