import {
    Affix,
    Badge,
    Button,
    ComboboxItem,
    Group,
    NumberInput,
    Paper,
    Select,
    Stack,
    Text,
    Transition
} from '@mantine/core'
import {
    PiArrowBendDownLeftDuotone,
    PiProhibitDuotone,
    PiPulseDuotone,
    PiTagDuotone,
    PiTrash
} from 'react-icons/pi'
import { notifications } from '@mantine/notifications'
import { useTranslation } from 'react-i18next'
import { modals } from '@mantine/modals'
import { useField } from '@mantine/form'
import { useEffect } from 'react'

import {
    useBulkDeleteHosts,
    useBulkDisableHosts,
    useSetInboundHosts,
    useSetPortToManyHosts
} from '@shared/api/hooks/hosts/hosts.mutation.hooks'
import { useBulkEnableHosts, useGetHosts } from '@shared/api/hooks'

import { IProps } from './interfaces/props.interface'

export const MultiSelectHostsFeature = (props: IProps) => {
    const { inbounds, hosts, selectedHosts, setSelectedHosts } = props

    const { t } = useTranslation()

    const hasSelection = selectedHosts.length > 0

    const portField = useField<number | undefined>({
        initialValue: undefined
    })

    const { refetch: refetchHosts } = useGetHosts()
    useEffect(() => {
        setSelectedHosts([])
    }, [hosts])

    const { mutate: bulkDeleteHosts } = useBulkDeleteHosts({
        mutationFns: {
            onSuccess: () => {
                refetchHosts()
            }
        }
    })
    const { mutate: bulkEnableHosts } = useBulkEnableHosts({
        mutationFns: {
            onSuccess: () => {
                refetchHosts()
            }
        }
    })
    const { mutate: bulkDisableHosts } = useBulkDisableHosts({
        mutationFns: {
            onSuccess: () => {
                refetchHosts()
            }
        }
    })

    const { mutate: setInboundHosts } = useSetInboundHosts({
        mutationFns: {
            onSuccess: () => {
                refetchHosts()
                modals.closeAll()
            }
        }
    })
    const { mutate: setPortToManyHosts } = useSetPortToManyHosts({
        mutationFns: {
            onSuccess: () => {
                refetchHosts()
                portField.reset()
                modals.closeAll()
            }
        }
    })

    const selectAllHosts = () => {
        setSelectedHosts(hosts?.map((host) => host.uuid) || [])
    }

    const clearSelection = () => {
        setSelectedHosts([])
    }

    const deleteSelectedHosts = () => {
        modals.openConfirmModal({
            title: t('multi-select-hosts.feature.delete-hosts'),
            centered: true,
            children: (
                <Text>
                    {t('multi-select-hosts.feature.are-you-sure-you-want-to-delete-these-hosts')}
                </Text>
            ),
            labels: {
                confirm: t('multi-select-hosts.feature.delete'),
                cancel: t('multi-select-hosts.feature.cancel')
            },
            confirmProps: {
                color: 'red'
            },
            onConfirm: () => {
                bulkDeleteHosts({ variables: { uuids: selectedHosts } })
                clearSelection()
            }
        })
    }

    const enableSelectedHosts = () => {
        bulkEnableHosts({ variables: { uuids: selectedHosts } })
        clearSelection()
    }

    const disableSelectedHosts = () => {
        bulkDisableHosts({ variables: { uuids: selectedHosts } })
        clearSelection()
    }

    if (!inbounds || !hosts) {
        return null
    }

    const setInboundSelectedHosts = () => {
        let localSelectedInbound: ComboboxItem | null = null

        modals.open({
            title: 'Назначить входящий',
            centered: true,
            children: (
                <Stack>
                    <Select
                        data={inbounds.map((inbound) => ({
                            label: inbound.tag,
                            value: inbound.uuid
                        }))}
                        label={'Входящий'}
                        onChange={(_value, option) => {
                            localSelectedInbound = option
                        }}
                    />
                    <Group justify="flex-end">
                        <Button onClick={() => modals.closeAll()} variant="subtle">
                            Отмена
                        </Button>
                        <Button
                            onClick={() => {
                                if (localSelectedInbound) {
                                    setInboundHosts({
                                        variables: {
                                            uuids: selectedHosts,
                                            inboundUuid: localSelectedInbound.value
                                        }
                                    })
                                    modals.closeAll()
                                }
                                if (!localSelectedInbound) {
                                    notifications.show({
                                        title: 'Ошибка',
                                        message: 'Пожалуйста, выберите входящий',
                                        color: 'red'
                                    })
                                }
                            }}
                        >
                            Назначить входящий
                        </Button>
                    </Group>
                </Stack>
            )
        })
    }

    const setPortSelectedHosts = () => {
        modals.open({
            title: 'Установить порт',
            centered: true,
            children: (
                <Stack>
                    <NumberInput
                        label={'Порт'}
                        {...portField.getInputProps()}
                        error={portField.error}
                        max={65535}
                        min={1}
                        required
                    />

                    <Group justify="flex-end">
                        <Button onClick={() => modals.closeAll()} variant="subtle">
                            Отмена
                        </Button>
                        <Button
                            onClick={async () => {
                                const port = portField.getValue()

                                if (port === undefined) {
                                    notifications.show({
                                        title: 'Ошибка',
                                        message: 'Порт обязателен',
                                        color: 'red'
                                    })
                                    return
                                }

                                setPortToManyHosts({
                                    variables: {
                                        uuids: selectedHosts,
                                        port
                                    }
                                })
                            }}
                        >
                            Установить порт
                        </Button>
                    </Group>
                </Stack>
            )
        })
    }

    return (
        <Affix position={{ bottom: 20, right: 20 }} zIndex={100}>
            <Transition mounted={hasSelection} transition="slide-up">
                {(styles) => (
                    <Paper
                        p="md"
                        radius="md"
                        shadow="md"
                        style={{
                            ...styles,
                            width: '300px',
                            maxWidth: '1200px',
                            margin: '0 auto'
                        }}
                        withBorder
                    >
                        <Stack>
                            <Group justify="flex-start">
                                <Group justify="center" w="100%">
                                    <Badge color="blue" size="lg">
                                        Выбрано: {selectedHosts.length}
                                    </Badge>
                                </Group>
                                <Group grow justify="apart" preventGrowOverflow={false} wrap="wrap">
                                    <Button onClick={clearSelection} variant="subtle">
                                        Сбросить
                                    </Button>
                                    <Button onClick={selectAllHosts} variant="subtle">
                                        Выбрать все
                                    </Button>
                                </Group>
                            </Group>

                            <Group grow justify="apart" preventGrowOverflow={false} wrap="wrap">
                                <Button
                                    color="green"
                                    leftSection={<PiPulseDuotone />}
                                    onClick={enableSelectedHosts}
                                >
                                    Включить
                                </Button>
                                <Button
                                    color="gray"
                                    leftSection={<PiProhibitDuotone />}
                                    onClick={disableSelectedHosts}
                                >
                                    Выключить
                                </Button>
                                <Button
                                    color="cyan"
                                    leftSection={<PiTagDuotone />}
                                    onClick={setInboundSelectedHosts}
                                >
                                    Назначить входящий
                                </Button>
                                <Button
                                    color="grape"
                                    leftSection={<PiArrowBendDownLeftDuotone />}
                                    onClick={setPortSelectedHosts}
                                >
                                    Установить порт
                                </Button>
                                <Button
                                    color="red"
                                    leftSection={<PiTrash />}
                                    onClick={deleteSelectedHosts}
                                >
                                    Удалить
                                </Button>
                            </Group>
                        </Stack>
                    </Paper>
                )}
            </Transition>
        </Affix>
    )
}
