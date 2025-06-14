import { GetAllUsersCommand } from '@localzet/aura-contract'

export type User = GetAllUsersCommand.Response['response']['users'][number]
