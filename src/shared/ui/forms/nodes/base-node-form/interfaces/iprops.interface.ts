import {
    CreateNodeCommand,
    GetInboundsCommand,
    GetOneNodeCommand,
    GetPubKeyCommand,
    UpdateNodeCommand
} from '@localzet/aura-backend-contract'
import { UseFormReturnType } from '@mantine/form'

export interface IProps<T extends CreateNodeCommand.Request | UpdateNodeCommand.Request> {
    advancedOpened: boolean
    fetchedNode: GetOneNodeCommand.Response['response'] | undefined
    form: UseFormReturnType<T>
    handleClose: () => void
    handleSubmit: () => void
    inbounds: GetInboundsCommand.Response['response'] | undefined
    isUpdateNodePending: boolean
    node: GetOneNodeCommand.Response['response'] | null
    pubKey: GetPubKeyCommand.Response['response'] | undefined
    setAdvancedOpened: (value: boolean) => void
}
