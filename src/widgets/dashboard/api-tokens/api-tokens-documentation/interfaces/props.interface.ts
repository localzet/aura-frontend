import { FindAllApiTokensCommand } from '@localzet/aura-backend-contract'

export interface IProps {
    docs: FindAllApiTokensCommand.Response['response']['docs'] | undefined
}
