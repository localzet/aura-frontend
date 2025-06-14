import { FindAllApiTokensCommand } from '@localzet/aura-contract'

export interface IProps {
    apiTokens: FindAllApiTokensCommand.Response['response']['apiKeys'] | undefined
}
