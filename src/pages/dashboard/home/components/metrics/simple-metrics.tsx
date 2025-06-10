import { PiChartBarDuotone, PiClockDuotone, PiMemoryDuotone } from 'react-icons/pi'
import { GetStatsCommand } from '@localzet/aura-backend-contract'
import { TFunction } from 'i18next'
import dayjs from 'dayjs'

import { prettyBytesUtil, prettyBytesUtilWithoutPrefix } from '@shared/utils/bytes'

export const getSimpleMetrics = (
    systemInfo: GetStatsCommand.Response['response'],
    t: TFunction
) => {
    const { memory, users } = systemInfo

    const totalRamGB = prettyBytesUtil(memory.total) ?? 0
    const usedRamGB = prettyBytesUtil(memory.active) ?? 0

    return [
        {
            value: prettyBytesUtilWithoutPrefix(Number(users.totalTrafficBytes)) ?? 0,
            icon: PiChartBarDuotone,
            title: t('simple-metrics.total-traffic'),
            color: 'var(--mantine-color-green-4)'
        },
        {
            value: `${usedRamGB} / ${totalRamGB}`,
            icon: PiMemoryDuotone,
            title: t('simple-metrics.ram-usage'),
            color: 'var(--mantine-color-cyan-4)'
        },
        {
            value: dayjs.duration(systemInfo.uptime, 'seconds').humanize(false),
            title: t('simple-metrics.system-uptime'),
            icon: PiClockDuotone,
            color: 'var(--mantine-color-gray-4)'
        }
    ]
}
