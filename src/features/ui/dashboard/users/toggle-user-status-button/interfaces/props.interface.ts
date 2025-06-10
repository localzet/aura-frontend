import { GetUserByUuidCommand } from '@localzet/aura-backend-contract'

export interface IProps {
    user: GetUserByUuidCommand.Response['response']
}
