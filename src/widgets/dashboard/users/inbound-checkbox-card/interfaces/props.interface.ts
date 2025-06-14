import { GetInboundsCommand } from '@localzet/aura-contract'

export interface IProps {
    inbound: GetInboundsCommand.Response['response'][number]
}
