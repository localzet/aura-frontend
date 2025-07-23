import { UpdateNodeCommand } from '@localzet/aura-contract'
import { zodResolver } from 'mantine-form-zod-resolver'
import { Group, Modal, Text } from '@mantine/core'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import { useForm } from '@mantine/form'

import {
    useNodesStoreActions,
    useNodesStoreEditModalIsOpen,
    useNodesStoreEditModalNode
} from '@entities/dashboard/nodes'
import {
    nodesQueryKeys,
    useGetInbounds,
    useGetNode,
    useGetPubKey,
    useUpdateNode
} from '@shared/api/hooks'
import { BaseNodeForm } from '@shared/ui/forms/nodes/base-node-form/base-node-form'
import { bytesToGbUtil, gbToBytesUtil } from '@shared/utils/bytes'
import { queryClient } from '@shared/api'

import { NodeXrayVersionBadgeWidget } from '../node-xray-version-badge/node-xray-version-badge.widget'
import { NodeStatusBadgeWidget } from '../node-status-badge/node-status-badge.widget'

export const EditNodeModalConnectorWidget = () => {
    const { t } = useTranslation()

    const isModalOpen = useNodesStoreEditModalIsOpen()
    const actions = useNodesStoreActions()
    const node = useNodesStoreEditModalNode()

    const [advancedOpened, setAdvancedOpened] = useState(false)

    const form = useForm<UpdateNodeCommand.Request>({
        name: 'edit-node-form',
        mode: 'uncontrolled',
        validate: zodResolver(UpdateNodeCommand.RequestSchema.omit({ uuid: true }))
    })

    const { data: pubKey } = useGetPubKey()
    const { data: inbounds } = useGetInbounds()

    const { data: fetchedNode } = useGetNode({
        route: {
            uuid: node?.uuid ?? ''
        },
        rQueryParams: {
            enabled: !!node?.uuid
        }
    })

    const handleClose = (closeModal = false) => {
        if (closeModal) {
            actions.toggleEditModal(false)
        }

        queryClient.removeQueries({
            queryKey: nodesQueryKeys.getNode({ uuid: node?.uuid ?? '' }).queryKey
        })

        form.reset()
        form.resetDirty()
        form.resetTouched()

        setTimeout(() => {
            actions.clearEditModal()
            setAdvancedOpened(false)
        }, 300)
    }

    const { mutate: updateNode, isPending: isUpdateNodePending } = useUpdateNode({
        mutationFns: {
            onSuccess: async () => {
                handleClose(true)
            }
        }
    })

    useEffect(() => {
        if (node) {
            setAdvancedOpened(node.isTrafficTrackingActive ?? false)
            form.setValues({
                countryCode: node.countryCode,
                name: node.name,
                address: node.address,
                port: node.port ?? undefined,
                isTrafficTrackingActive: node.isTrafficTrackingActive ?? undefined,
                trafficLimitBytes: bytesToGbUtil(node.trafficLimitBytes ?? undefined),
                trafficResetDay: node.trafficResetDay ?? undefined,
                notifyPercent: node.notifyPercent ?? undefined,
                excludedInbounds: node.excludedInbounds.map((inbound) => inbound.uuid) ?? [],
                consumptionMultiplier: node.consumptionMultiplier ?? undefined
            })
        }
    }, [node])

    const handleSubmit = form.onSubmit(async (values) => {
        if (!node) {
            return
        }

        updateNode({
            variables: {
                ...values,
                uuid: node.uuid,
                name: values.name?.trim(),
                address: values.address?.trim(),
                trafficLimitBytes: gbToBytesUtil(values.trafficLimitBytes)
            }
        })
    })

    return (
        <Modal
            centered
            onClose={() => actions.toggleEditModal(false)}
            onExitTransitionEnd={() => handleClose}
            opened={isModalOpen}
            size="900px"
            title={
                <Group gap="xl" justify="space-between">
                    <Text fw={500}>{t('edit-node-modal.widget.edit-node')}</Text>
                    {node && <NodeStatusBadgeWidget fetchedNode={fetchedNode} node={node} />}
                    {node?.isConnected && (
                        <NodeXrayVersionBadgeWidget fetchedNode={fetchedNode} node={node} />
                    )}
                </Group>
            }
        >
            <BaseNodeForm
                advancedOpened={advancedOpened}
                fetchedNode={fetchedNode}
                form={form}
                handleClose={() => handleClose(true)}
                handleSubmit={handleSubmit}
                inbounds={inbounds}
                isUpdateNodePending={isUpdateNodePending}
                node={node}
                pubKey={pubKey}
                setAdvancedOpened={setAdvancedOpened}
            />
        </Modal>
    )
}
