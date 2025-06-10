import { GetOneNodeCommand, GetPubKeyCommand } from '@localzet/aura-backend-contract'

export interface IProps {
    fetchedNode: GetOneNodeCommand.Response['response'] | undefined
    node: GetOneNodeCommand.Response['response'] | null
    pubKey: GetPubKeyCommand.Response['response'] | undefined
}
