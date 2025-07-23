import { GetUserHwidDevicesCommand } from '@localzet/aura-contract'
import { createQueryKeys } from '@lukemorales/query-key-factory'
import { notifications } from '@mantine/notifications'

import { createGetQueryHook } from '@shared/api/tsq-helpers'
import { sToMs } from '@shared/utils/time-utils'

export const hwidUserDevicesQueryKeys = createQueryKeys('hwid-user-devices', {
    getUserHwidDevices: (route: GetUserHwidDevicesCommand.Request) => ({
        queryKey: [route]
    })
})

export const useGetUserHwidDevices = createGetQueryHook({
    endpoint: GetUserHwidDevicesCommand.TSQ_url,
    responseSchema: GetUserHwidDevicesCommand.ResponseSchema,
    routeParamsSchema: GetUserHwidDevicesCommand.RequestSchema,
    getQueryKey: ({ route }) => hwidUserDevicesQueryKeys.getUserHwidDevices(route!).queryKey,
    rQueryParams: {
        staleTime: sToMs(20),
        refetchInterval: sToMs(20)
    },
    errorHandler: (error) => {
        notifications.show({
            title: 'Получение HWID и устройств пользователя',
            message: error instanceof Error ? error.message : 'Неизвестная ошибка',
            color: 'red'
        })
    }
})
