import { FindAllApiTokensCommand } from '@localzet/aura-contract'

export interface IProps {
    docs: FindAllApiTokensCommand.Response['response']['docs'] | undefined
}
