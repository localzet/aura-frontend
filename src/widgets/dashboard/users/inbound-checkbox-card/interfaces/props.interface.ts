import { GetInboundsCommand } from '@localzet/aura-backend-contract'

export interface IProps {
    inbound: GetInboundsCommand.Response['response'][number]
}
