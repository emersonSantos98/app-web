import home from './home'
import secondPage from './secondPage'
import rolePermissions from './role&Permissions'
import profile from './profile'
import type { VerticalNavItems } from '@/@layouts/types'

export default [
  ...home,
  ...secondPage,
  ...rolePermissions,
  ...profile,
] as VerticalNavItems
