import { PiTrendDown, PiTrendUp } from 'react-icons/pi'
import { Flex, Text } from '@mantine/core'

import { formatPercentage, match } from '@shared/utils/misc'

import { MetricCardTextMuted, MetricCardTextMutedProps } from './metric-card-text-muted'

interface MetricCardTextTrendProps extends MetricCardTextMutedProps {
    value: number | string
}

export function MetricCardTextTrend({ value, children, ...props }: MetricCardTextTrendProps) {
    let sign = ''
    let color = ''
    let Icon = PiTrendUp
    let valuePrinted = value

    if (typeof value === 'number') {
        const result = match(
            [
                Number(value) > 0,
                { sign: '+', color: 'var(--mantine-color-teal-6)', icon: PiTrendUp }
            ],
            [
                Number(value) < 0,
                { sign: '', color: 'var(--mantine-color-red-6)', icon: PiTrendDown }
            ]
        )
        sign = result.sign
        color = result.color
        Icon = result.icon
        valuePrinted = formatPercentage(value, {
            prefix: sign,
            precision: 0,
            thousandSeparator: ' '
        })
    } else if (typeof value === 'string') {
        if (value.startsWith('-')) {
            color = 'var(--mantine-color-red-6)'
            Icon = PiTrendDown
            sign = ''
        } else {
            color = 'var(--mantine-color-teal-6)'
            Icon = PiTrendUp
            sign = '+'
        }

        valuePrinted = value
    }

    // fz="inherit"

    return (
        <Flex align="center" style={{ textWrap: 'nowrap' }}>
            <Icon color={color} size="1rem" />
            <Text c={color} component="span" fz="sm" mx="0.25rem">
                {valuePrinted}
            </Text>
            <MetricCardTextMuted {...props}>{children}</MetricCardTextMuted>
        </Flex>
    )
}
