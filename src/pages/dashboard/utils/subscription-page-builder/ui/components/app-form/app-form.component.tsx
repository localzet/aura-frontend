import {
    PiCheckBold,
    PiCloudArrowDownBold,
    PiDownloadBold,
    PiInfoBold,
    PiMinus,
    PiPlus,
    PiStarBold
} from 'react-icons/pi'
import {
    Accordion,
    Box,
    Button,
    Checkbox,
    Flex,
    Group,
    Stack,
    TextInput,
    Title
} from '@mantine/core'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'

import { updateLocalizedField } from './lib/localized-fields.utils'
import { emptyLocalizedText } from '../../../model/config'
import { LocalizedFields } from './lib/localized-fields'
import { ButtonFields } from './lib/button-fields'
import { AppConfig } from '../../../model/types'
import { AppFormProps } from './interfaces'

export const AppForm = (props: AppFormProps) => {
    const { app, onChange, onDelete } = props
    const { t } = useTranslation()
    const [localApp, setLocalApp] = useState<AppConfig>(app)

    useEffect(() => {
        setLocalApp(app)
    }, [app])

    const updateApp = (newData: Partial<AppConfig>) => {
        const updated = { ...localApp, ...newData }
        setLocalApp(updated)
        onChange(updated)
    }

    const handleUpdateLocalizedField = (
        section: keyof AppConfig,
        field: string,
        lang: 'en' | 'fa' | 'ru',
        value: string
    ) => {
        updateLocalizedField(localApp, section, field, lang, value, setLocalApp, onChange)
    }

    return (
        <Box mb={30}>
            <Group mb="lg" style={{ justifyContent: 'space-between' }}>
                <Title order={3}>{localApp.name}</Title>
                {onDelete && (
                    <Button color="red" onClick={onDelete} variant="outline">
                        {t('app-form.component.delete-app')}
                    </Button>
                )}
            </Group>

            <Stack gap="sm">
                <TextInput
                    label={t('app-form.component.app-id')}
                    onChange={(e) => {
                        const oldId = localApp.id
                        const newId = e.target.value as `${Lowercase<string>}`

                        const updatedApp: AppConfig = {
                            ...localApp,
                            id: newId
                        }

                        setLocalApp(updatedApp)

                        onChange({ ...updatedApp, _oldId: oldId } as AppConfig)
                    }}
                    value={localApp.id}
                />

                <TextInput
                    label={t('app-form.component.app-name')}
                    onChange={(e) => updateApp({ name: e.target.value })}
                    value={localApp.name}
                />

                <TextInput
                    label={t('app-form.component.url-scheme')}
                    onChange={(e) => updateApp({ urlScheme: e.target.value })}
                    value={localApp.urlScheme}
                />

                <Group>
                    <Checkbox
                        checked={localApp.isFeatured}
                        label={t('app-form.component.featured-app')}
                        onChange={(e) => updateApp({ isFeatured: e.target.checked })}
                    />

                    <Checkbox
                        checked={!!localApp.isNeedBase64Encoding}
                        label={t('app-form.component.need-base64-encoding')}
                        onChange={(e) => updateApp({ isNeedBase64Encoding: e.target.checked })}
                    />
                </Group>
            </Stack>

            <Accordion defaultValue="installation" mt="xl" variant="separated">
                <Accordion.Item value="installation">
                    <Accordion.Control>
                        <Flex align="center" gap="xs">
                            <PiDownloadBold size="1.5rem" />
                            {t('app-form.component.installation-step')}
                        </Flex>
                    </Accordion.Control>
                    <Accordion.Panel>
                        <Title mb="md" order={4}>
                            {t('app-form.component.description')}
                        </Title>
                        <LocalizedFields
                            field="description"
                            isDescription
                            section="installationStep"
                            updateField={handleUpdateLocalizedField}
                            value={localApp.installationStep.description}
                        />

                        <Title mb="md" mt="lg" order={4}>
                            {t('app-form.component.buttons')}
                        </Title>
                        <ButtonFields
                            buttons={localApp.installationStep.buttons}
                            localApp={localApp}
                            section="installationStep"
                            updateApp={updateApp}
                        />
                    </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item value="before-subscription">
                    <Accordion.Control>
                        <Flex align="center" gap="xs">
                            <PiInfoBold size="1.5rem" />
                            {t('app-form.component.additional-before-subscription-step')}
                            {localApp.additionalBeforeAddSubscriptionStep && (
                                <Button
                                    color="red"
                                    component="p"
                                    leftSection={<PiMinus size="1.25rem" />}
                                    ml={'xs'}
                                    onClick={() =>
                                        updateApp({
                                            additionalBeforeAddSubscriptionStep: undefined
                                        })
                                    }
                                    size="xs"
                                    variant="outline"
                                >
                                    {t('app-form.component.remove-step')}
                                </Button>
                            )}
                            {!localApp.additionalBeforeAddSubscriptionStep && (
                                <Button
                                    component="p"
                                    leftSection={<PiPlus size="1.25rem" />}
                                    ml={'xs'}
                                    onClick={() =>
                                        updateApp({
                                            additionalBeforeAddSubscriptionStep: {
                                                title: { ...emptyLocalizedText },
                                                description: { ...emptyLocalizedText },
                                                buttons: []
                                            }
                                        })
                                    }
                                    size="xs"
                                    variant="outline"
                                >
                                    {t('app-form.component.add-step')}
                                </Button>
                            )}
                        </Flex>
                    </Accordion.Control>
                    <Accordion.Panel>
                        {localApp.additionalBeforeAddSubscriptionStep && (
                            <>
                                <Title mb="md" order={4}>
                                    {t('app-form.component.title')}
                                </Title>
                                <LocalizedFields
                                    field="title"
                                    section="additionalBeforeAddSubscriptionStep"
                                    updateField={handleUpdateLocalizedField}
                                    value={localApp.additionalBeforeAddSubscriptionStep.title}
                                />

                                <Title mb="md" mt="lg" order={4}>
                                    {t('app-form.component.description')}
                                </Title>
                                <LocalizedFields
                                    field="description"
                                    isDescription
                                    section="additionalBeforeAddSubscriptionStep"
                                    updateField={handleUpdateLocalizedField}
                                    value={localApp.additionalBeforeAddSubscriptionStep.description}
                                />

                                <Title mb="md" mt="lg" order={4}>
                                    {t('app-form.component.buttons')}
                                </Title>
                                <ButtonFields
                                    buttons={localApp.additionalBeforeAddSubscriptionStep.buttons}
                                    localApp={localApp}
                                    section="additionalBeforeAddSubscriptionStep"
                                    updateApp={updateApp}
                                />
                            </>
                        )}
                    </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item value="subscription">
                    <Accordion.Control>
                        <Flex align="center" gap="xs">
                            <PiCloudArrowDownBold size="1.5rem" />
                            {t('app-form.component.add-subscription-step')}
                        </Flex>
                    </Accordion.Control>
                    <Accordion.Panel>
                        <Title mb="md" order={4}>
                            {t('app-form.component.description')}
                        </Title>
                        <LocalizedFields
                            field="description"
                            isDescription
                            section="addSubscriptionStep"
                            updateField={handleUpdateLocalizedField}
                            value={localApp.addSubscriptionStep.description}
                        />
                    </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item value="after-subscription">
                    <Accordion.Control>
                        <Flex align="center" gap="xs">
                            <PiStarBold size="1.5rem" />
                            {t('app-form.component.additional-after-subscription-step')}
                            {localApp.additionalAfterAddSubscriptionStep && (
                                <Button
                                    color="red"
                                    component="p"
                                    leftSection={<PiMinus size="1.25rem" />}
                                    ml={'xs'}
                                    onClick={() =>
                                        updateApp({
                                            additionalAfterAddSubscriptionStep: undefined
                                        })
                                    }
                                    size="xs"
                                    variant="outline"
                                >
                                    {t('app-form.component.remove-step')}
                                </Button>
                            )}
                            {!localApp.additionalAfterAddSubscriptionStep && (
                                <Button
                                    component="p"
                                    leftSection={<PiPlus size="1.25rem" />}
                                    ml={'xs'}
                                    onClick={() =>
                                        updateApp({
                                            additionalAfterAddSubscriptionStep: {
                                                title: { ...emptyLocalizedText },
                                                description: { ...emptyLocalizedText },
                                                buttons: []
                                            }
                                        })
                                    }
                                    size="xs"
                                    variant="outline"
                                >
                                    {t('app-form.component.add-step')}
                                </Button>
                            )}
                        </Flex>
                    </Accordion.Control>
                    <Accordion.Panel>
                        {localApp.additionalAfterAddSubscriptionStep && (
                            <>
                                <Title mb="md" order={4}>
                                    {t('app-form.component.title')}
                                </Title>
                                <LocalizedFields
                                    field="title"
                                    section="additionalAfterAddSubscriptionStep"
                                    updateField={handleUpdateLocalizedField}
                                    value={localApp.additionalAfterAddSubscriptionStep.title}
                                />

                                <Title mb="md" mt="lg" order={4}>
                                    {t('app-form.component.description')}
                                </Title>
                                <LocalizedFields
                                    field="description"
                                    isDescription
                                    section="additionalAfterAddSubscriptionStep"
                                    updateField={handleUpdateLocalizedField}
                                    value={localApp.additionalAfterAddSubscriptionStep.description}
                                />

                                <Title mb="md" mt="lg" order={4}>
                                    {t('app-form.component.buttons')}
                                </Title>
                                <ButtonFields
                                    buttons={localApp.additionalAfterAddSubscriptionStep.buttons}
                                    localApp={localApp}
                                    section="additionalAfterAddSubscriptionStep"
                                    updateApp={updateApp}
                                />
                            </>
                        )}
                    </Accordion.Panel>
                </Accordion.Item>

                <Accordion.Item value="connect">
                    <Accordion.Control>
                        <Flex align="center" gap="xs">
                            <PiCheckBold size="1.5rem" />
                            {t('app-form.component.connect-and-use-step')}
                        </Flex>
                    </Accordion.Control>
                    <Accordion.Panel>
                        <Title mb="md" order={4}>
                            {t('app-form.component.description')}
                        </Title>
                        <LocalizedFields
                            field="description"
                            isDescription
                            section="connectAndUseStep"
                            updateField={handleUpdateLocalizedField}
                            value={localApp.connectAndUseStep.description}
                        />
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
        </Box>
    )
}
