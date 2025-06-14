import { CreateNodeCommand } from '@localzet/aura-contract'
import { useForm, zodResolver } from '@mantine/form'
import { Group, Modal, Text } from '@mantine/core'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'

import { useNodesStoreActions, useNodesStoreCreateModalIsOpen } from '@entities/dashboard/nodes'
import { BaseNodeForm } from '@shared/ui/forms/nodes/base-node-form/base-node-form'
import { useCreateNode, useGetInbounds, useGetPubKey } from '@shared/api/hooks'
import { gbToBytesUtil } from '@shared/utils/bytes'

export const CreateNodeModalWidget = () => {
    const { t } = useTranslation()

    const isModalOpen = useNodesStoreCreateModalIsOpen()
    const actions = useNodesStoreActions()

    const { data: pubKey } = useGetPubKey()
    const { data: inbounds } = useGetInbounds()

    const [advancedOpened, setAdvancedOpened] = useState(false)

    const form = useForm<CreateNodeCommand.Request>({
        name: 'create-node-form',
        mode: 'uncontrolled',
        validate: zodResolver(CreateNodeCommand.RequestSchema)
    })

    const handleClose = () => {
        actions.toggleCreateModal(false)

        setTimeout(() => {
            form.reset()
            form.resetDirty()
            form.resetTouched()
            setAdvancedOpened(false)
        }, 300)
    }

    const { mutate: createNode, isPending: isCreateNodePending } = useCreateNode({
        mutationFns: {
            onSuccess: () => {
                handleClose()
            }
        }
    })

    const handleSubmit = form.onSubmit(async (values) => {
        createNode({
            variables: {
                ...values,
                name: values.name.trim(),
                address: values.address.trim(),
                trafficLimitBytes: gbToBytesUtil(values.trafficLimitBytes)
            }
        })
    })

    return (
        <Modal
            centered
            onClose={handleClose}
            opened={isModalOpen}
            size="900px"
            title={
                <Group gap="xl" justify="space-between">
                    <Text fw={500}>{t('create-node-modal.widget.create-node')}</Text>
                </Group>
            }
        >
            <BaseNodeForm
                advancedOpened={advancedOpened}
                fetchedNode={undefined}
                form={form}
                handleClose={handleClose}
                handleSubmit={handleSubmit}
                inbounds={inbounds}
                isUpdateNodePending={isCreateNodePending}
                node={null}
                pubKey={pubKey}
                setAdvancedOpened={setAdvancedOpened}
            />
        </Modal>
    )
}
