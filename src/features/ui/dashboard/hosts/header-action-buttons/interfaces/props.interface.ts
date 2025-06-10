import { GetInboundsCommand } from '@localzet/aura-backend-contract'

export interface IProps {
    inbounds: GetInboundsCommand.Response['response']
}
