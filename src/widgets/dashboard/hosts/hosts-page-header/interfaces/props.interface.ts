import { GetInboundsCommand } from '@localzet/aura-contract'

export interface IProps {
    inbounds: GetInboundsCommand.Response['response'] | undefined
}
