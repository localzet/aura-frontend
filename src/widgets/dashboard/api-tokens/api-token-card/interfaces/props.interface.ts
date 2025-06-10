import { FindAllApiTokensCommand } from '@localzet/aura-backend-contract'

export interface IProps {
    apiToken: FindAllApiTokensCommand.Response['response']['apiKeys'][number]
}
