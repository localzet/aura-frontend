import { GetAllNodesCommand } from '@localzet/aura-backend-contract'

export interface IProps {
    nodes: GetAllNodesCommand.Response['response'] | undefined
}
