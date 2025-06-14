import { UpdateHostCommand } from '@localzet/aura-contract'

export interface IFormValues extends UpdateHostCommand.Request {
    shortUuid: string
    trojanPassword: string
    username: string
}
