import { GetAllHostsCommand, GetInboundsCommand } from '@localzet/aura-contract'

export interface IProps {
    inbounds: GetInboundsCommand.Response['response'] | undefined
    index: number
    isSelected?: boolean
    item: GetAllHostsCommand.Response['response'][number]
    onSelect?: () => void
}
