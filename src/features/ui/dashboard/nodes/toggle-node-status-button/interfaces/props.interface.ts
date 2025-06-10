import { GetOneNodeCommand } from '@localzet/aura-backend-contract'

export interface IProps {
    handleClose: () => void
    node: GetOneNodeCommand.Response['response']
}
