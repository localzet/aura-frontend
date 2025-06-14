import { GetFullInboundsCommand } from '@localzet/aura-contract'

export interface IProps {
    inbound: GetFullInboundsCommand.Response['response'][number]
}
