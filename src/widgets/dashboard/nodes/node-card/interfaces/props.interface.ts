import { GetAllNodesCommand } from '@localzet/aura-backend-contract'

export interface IProps {
    index: number
    node: GetAllNodesCommand.Response['response'][number]
}
