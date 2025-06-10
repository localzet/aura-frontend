import { GetFullInboundsCommand } from '@localzet/aura-backend-contract'

export interface IProps {
    inbound: GetFullInboundsCommand.Response['response'][number]
}
