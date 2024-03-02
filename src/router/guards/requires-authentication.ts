import type { NavigationGuard } from 'vue-router'
import { useAuth } from '@/modules/auth/hooks/use-auth'
import { AuthRouteName } from '@/modules/auth/routes'

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuthentication?: boolean
  }
}

export const requiresAuthenticationGuard: NavigationGuard = (to) => {
  if (to.matched.some((record) => record.meta.requiresAuthentication)) {
    const { isAuthenticated } = useAuth()

    if (isAuthenticated()) {
      return true
    } else {
      return { name: AuthRouteName.SIGN_IN }
    }
  }
  return true
}