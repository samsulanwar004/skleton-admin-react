import { lazy } from 'react'

const Dashboard = [
  {
    path: '/dashboard',
    component: lazy(() => import('../../../views/backend/dashboard')),
    meta: {
      resource: 'dashboard'
    }
  },
  {
    path: '/user/list',
    component: lazy(() => import('../../../views/backend/user/list')),
    meta: {
      action: 'read',
      resource: 'user'
    }
  },
  {
    path: '/user/save/:id',
    component: lazy(() => import('../../../views/backend/user/save')),
    meta: {
      action: 'read',
      resource: 'user'
    }
  },
  {
    path: '/user/save',
    component: lazy(() => import('../../../views/backend/user/save')),
    meta: {
      action: 'read',
      resource: 'user'
    }
  },
  {
    path: '/role/list',
    component: lazy(() => import('../../../views/backend/role/list')),
    meta: {
      action: 'read',
      resource: 'role'
    }
  },
  {
    path: '/role/save/:id',
    component: lazy(() => import('../../../views/backend/role/save')),
    meta: {
      action: 'read',
      resource: 'role'
    }
  },
  {
    path: '/role/save',
    component: lazy(() => import('../../../views/backend/role/save')),
    meta: {
      action: 'read',
      resource: 'role'
    }
  },
  {
    path: '/menu/list',
    component: lazy(() => import('../../../views/backend/menu/list')),
    meta: {
      action: 'read',
      resource: 'menu'
    }
  },
  {
    path: '/menu/save/:id',
    component: lazy(() => import('../../../views/backend/menu/save')),
    meta: {
      action: 'read',
      resource: 'menu'
    }
  },
  {
    path: '/menu/save',
    component: lazy(() => import('../../../views/backend/menu/save')),
    meta: {
      action: 'read',
      resource: 'menu'
    }
  },
  {
    path: '/role_menu/list',
    component: lazy(() => import('../../../views/backend/role_menu/list')),
    meta: {
      action: 'read',
      resource: 'role_menu'
    }
  },
  {
    path: '/role_menu/save/:id',
    component: lazy(() => import('../../../views/backend/role_menu/save')),
    meta: {
      action: 'read',
      resource: 'role_menu'
    }
  },
  {
    path: '/role_menu/save',
    component: lazy(() => import('../../../views/backend/role_menu/save')),
    meta: {
      action: 'read',
      resource: 'role_menu'
    }
  }
]

export default Dashboard
