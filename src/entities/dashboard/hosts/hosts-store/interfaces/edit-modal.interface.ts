import { UpdateHostCommand } from '@localzet/aura-contract'

export interface IEditModal {
    host: null | UpdateHostCommand.Response['response']
    isLoading: boolean
    isOpen: boolean
}
