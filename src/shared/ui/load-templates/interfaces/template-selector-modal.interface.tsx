import { TSubscriptionTemplateType } from '@localzet/aura-backend-contract'

import { IDownloadableSubscriptionTemplate } from '@shared/constants/templates'

export interface TemplateSelectorModalProps {
    editorType: 'SUBSCRIPTION' | 'XRAY_CORE'
    onCancel: () => void
    onLoadTemplate: (template: IDownloadableSubscriptionTemplate) => Promise<void>
    templateType: TSubscriptionTemplateType
}
