import { GetAllUsersCommand } from '@localzet/aura-backend-contract'

export type User = GetAllUsersCommand.Response['response']['users'][number]
