import { GetAllHostsCommand, GetInboundsCommand } from '@localzet/aura-contract'

export interface IProps {
    hosts: GetAllHostsCommand.Response['response'] | undefined
    inbounds: GetInboundsCommand.Response['response'] | undefined
    selectedHosts: string[]
    setSelectedHosts: React.Dispatch<React.SetStateAction<string[]>>
}
