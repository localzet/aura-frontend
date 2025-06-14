import { GetSubscriptionSettingsCommand } from '@localzet/aura-contract'

export interface IProps {
    subscriptionSettings: GetSubscriptionSettingsCommand.Response['response']
}
