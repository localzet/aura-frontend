import invariant from 'tiny-invariant'
import { useContext } from 'react'

import { AuthContext } from '@shared/hocs/auth-provider'

export function useAuth() {
    const context = useContext(AuthContext)
    invariant(context, 'useAuth должен использоваться внутри AuthProvider')
    return context
}
