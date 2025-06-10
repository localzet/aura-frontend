import { UpdateNodeCommand } from '@localzet/aura-backend-contract'

export interface IEditModal {
    isLoading: boolean
    isOpen: boolean
    node: null | UpdateNodeCommand.Response['response']
}
