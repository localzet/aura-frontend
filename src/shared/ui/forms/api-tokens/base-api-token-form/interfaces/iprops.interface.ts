import { CreateApiTokenCommand } from '@localzet/aura-backend-contract'
import { UseFormReturnType } from '@mantine/form'

export interface IProps<T extends CreateApiTokenCommand.Request> {
    form: UseFormReturnType<T>
    handleSubmit: () => void
    isCreateApiTokenPending: boolean
}
