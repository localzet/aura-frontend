import { FindAllApiTokensCommand } from '@localzet/aura-contract'

export interface IProps {
    apiToken: FindAllApiTokensCommand.Response['response']['apiKeys'][number]
}
