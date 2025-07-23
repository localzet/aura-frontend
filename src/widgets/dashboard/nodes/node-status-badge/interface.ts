import { GetAllNodesCommand } from '@localzet/aura-contract'

export interface IProps {
    fetchedNode?: GetAllNodesCommand.Response['response'][number]
    node: GetAllNodesCommand.Response['response'][number]
    style?: React.CSSProperties
}
