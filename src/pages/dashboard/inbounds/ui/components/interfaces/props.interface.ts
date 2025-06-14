import { GetFullInboundsCommand } from '@localzet/aura-contract'

export interface IProps {
    inbounds: GetFullInboundsCommand.Response['response'] | undefined
    isInboundsLoading: boolean
}
