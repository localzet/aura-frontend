import { TSubscriptionTemplateType } from '@localzet/aura-backend-contract'

import {
    IDownloadableSubscriptionTemplate,
    IDownloadableSubscriptionTemplateList
} from '@shared/constants/templates'

export interface TemplateSelectorProps {
    editorType: 'SUBSCRIPTION' | 'XRAY_CORE'
    onSelect: (template: IDownloadableSubscriptionTemplate) => void
    selectedTemplate?: IDownloadableSubscriptionTemplate
    templates: IDownloadableSubscriptionTemplateList['templates']
    templateType: TSubscriptionTemplateType
}
