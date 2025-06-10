import { GetSubscriptionSettingsCommand } from '@localzet/aura-backend-contract'

export interface IProps {
    subscriptionSettings: GetSubscriptionSettingsCommand.Response['response']
}
