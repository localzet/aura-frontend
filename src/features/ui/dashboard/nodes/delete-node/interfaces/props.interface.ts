import { GetOneNodeCommand } from '@localzet/aura-contract'

export interface IProps {
    handleClose: () => void
    node: GetOneNodeCommand.Response['response']
}
