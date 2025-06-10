import { GetAllNodesCommand } from '@localzet/aura-backend-contract'

export interface IProps {
    isLoading: boolean
    nodes: GetAllNodesCommand.Response['response'] | undefined
}
