import { GetAllNodesCommand } from '@localzet/aura-contract'

export interface IProps {
    nodes: GetAllNodesCommand.Response['response'] | undefined
}
