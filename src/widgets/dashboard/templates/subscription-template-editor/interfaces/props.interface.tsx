import { TSubscriptionTemplateType } from '@localzet/aura-contract'

export interface Props {
    encodedTemplateYaml: null | string | undefined
    language: 'json' | 'yaml'
    templateJson: null | string | undefined
    templateType: TSubscriptionTemplateType
}
