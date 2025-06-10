import { GetBandwidthStatsCommand, GetStatsCommand } from '@localzet/aura-backend-contract'

export interface IProps {
    bandwidthStats: GetBandwidthStatsCommand.Response['response']
    systemInfo: GetStatsCommand.Response['response']
}
