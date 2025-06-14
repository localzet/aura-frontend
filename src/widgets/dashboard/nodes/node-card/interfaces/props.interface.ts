import { GetAllNodesCommand } from '@localzet/aura-contract'

export interface IProps {
    index: number
    node: GetAllNodesCommand.Response['response'][number]
}
