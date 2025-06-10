import { GetStatusCommand } from '@localzet/aura-backend-contract'

export interface IProps {
    tgAuth: GetStatusCommand.Response['response']['tgAuth']
}
