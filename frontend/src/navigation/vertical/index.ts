import home from './home'
import secondPage from './secondPage'
import accessControl from './accessControl'
import rolePermissions from './role&Permissions'
import profile from './profile'
import templateEmail from './templateEmail'
import template from './template'

import type { VerticalNavItems } from '@/@layouts/types'

export default [
  ...home,
  ...secondPage,
  ...accessControl,
  ...rolePermissions,
  ...profile,
  ...templateEmail,
  ...template,
] as VerticalNavItems
