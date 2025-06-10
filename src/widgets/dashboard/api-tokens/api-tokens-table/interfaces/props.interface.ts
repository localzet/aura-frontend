import { FindAllApiTokensCommand } from '@localzet/aura-backend-contract'

export interface IProps {
    apiTokens: FindAllApiTokensCommand.Response['response']['apiKeys'] | undefined
}
