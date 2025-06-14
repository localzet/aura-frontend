import { GetAllNodesCommand } from '@localzet/aura-contract'

export interface IProps {
    isLoading: boolean
    nodes: GetAllNodesCommand.Response['response'] | undefined
}
