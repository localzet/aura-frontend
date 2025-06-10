import { GetFullInboundsCommand } from '@localzet/aura-backend-contract'

export interface IProps {
    inbounds: GetFullInboundsCommand.Response['response'] | undefined
    isInboundsLoading: boolean
}
