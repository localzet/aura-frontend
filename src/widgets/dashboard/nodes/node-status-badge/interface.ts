import { GetAllNodesCommand } from '@localzet/aura-backend-contract'

export interface IProps {
    fetchedNode?: GetAllNodesCommand.Response['response'][number] | undefined
    node: GetAllNodesCommand.Response['response'][number]
    style?: React.CSSProperties
}
