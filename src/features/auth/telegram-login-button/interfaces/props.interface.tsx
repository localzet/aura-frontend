import { GetStatusCommand } from '@localzet/aura-contract'

export interface IProps {
    tgAuth: GetStatusCommand.Response['response']['tgAuth']
}
