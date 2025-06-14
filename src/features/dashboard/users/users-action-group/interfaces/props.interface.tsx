/* eslint-disable camelcase */
import { GetAllUsersCommand } from '@localzet/aura-contract'
import { MRT_TableInstance } from 'mantine-react-table'

export interface IProps {
    isLoading: boolean
    refetch: () => void

    table: MRT_TableInstance<GetAllUsersCommand.Response['response']['users'][0]>
}
