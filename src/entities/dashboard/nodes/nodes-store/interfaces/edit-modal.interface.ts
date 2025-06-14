import { UpdateNodeCommand } from '@localzet/aura-contract'

export interface IEditModal {
    isLoading: boolean
    isOpen: boolean
    node: null | UpdateNodeCommand.Response['response']
}
