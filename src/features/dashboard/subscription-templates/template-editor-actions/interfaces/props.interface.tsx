import { TSubscriptionTemplateType } from '@localzet/aura-backend-contract'

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Props {
    editorRef: any
    language: 'json' | 'yaml'
    monacoRef: any
    templateType: TSubscriptionTemplateType
}
