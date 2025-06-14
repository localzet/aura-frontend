import { GetBandwidthStatsCommand, GetStatsCommand } from '@localzet/aura-contract'

export interface IProps {
    bandwidthStats: GetBandwidthStatsCommand.Response['response']
    systemInfo: GetStatsCommand.Response['response']
}
