import { GetUserByUuidCommand } from '@localzet/aura-contract'

export interface IProps {
    user: GetUserByUuidCommand.Response['response']
}
