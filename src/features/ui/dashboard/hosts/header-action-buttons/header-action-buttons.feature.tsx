import { PiArrowsClockwise, PiBookmarks, PiPlus } from 'react-icons/pi'
import { Button, Group, Select } from '@mantine/core'
import { useTranslation } from 'react-i18next'

import { useHostsStoreActions, useHostsStoreSelectedInboundTag } from '@entities/dashboard'
import { QueryKeys, useGetHosts } from '@shared/api/hooks'
import { queryClient } from '@shared/api'

import { IProps } from './interfaces'

export const HeaderActionButtonsFeature = (props: IProps) => {
    const { t } = useTranslation()

    const { inbounds } = props

    const actions = useHostsStoreActions()
    const selectedInboundTag = useHostsStoreSelectedInboundTag()

    const { isFetching } = useGetHosts()

    const handleCreate = () => {
        actions.toggleCreateModal(true)
    }

    const handleUpdate = async () => {
        await queryClient.refetchQueries({
            queryKey: QueryKeys.hosts._def
        })
    }

    return (
        <Group grow preventGrowOverflow={false} wrap="wrap">
            <Select
                data={[
                    { value: 'ALL', label: t('header-action-buttons.feature.all') },
                    ...inbounds.map((inbound) => ({
                        value: inbound.tag,
                        label: inbound.tag
                    }))
                ]}
                defaultValue="ALL"
                leftSection={<PiBookmarks size="1rem" />}
                leftSectionPointerEvents="none"
                onChange={(value) => actions.setSelectedInboundTag(value || 'ALL')}
                radius="lg"
                size="xs"
                value={selectedInboundTag}
            />
            <Button
                leftSection={<PiArrowsClockwise size="1rem" />}
                loading={isFetching}
                onClick={handleUpdate}
                size="xs"
                variant="default"
            >
                {t('header-action-buttons.feature.update')}
            </Button>

            <Button
                leftSection={<PiPlus size="1rem" />}
                onClick={handleCreate}
                size="xs"
                variant="default"
            >
                {t('header-action-buttons.feature.create-new-host')}
            </Button>
        </Group>
    )
}
