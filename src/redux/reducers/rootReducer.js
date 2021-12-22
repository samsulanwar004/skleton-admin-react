// ** Redux Imports
import { combineReducers } from 'redux'

// ** Reducers Imports
import auth from './auth'
import navbar from './navbar'
import layout from './layout'

// ** navigation
import navigations from '@src/navigation/store/reducer'
// ** profile
import profile from '@src/views/backend/auth/profile/store/reducer'
// ** management
import users from '@src/views/backend/user/store/reducer'
import roles from '@src/views/backend/role/store/reducer'
import menus from '@src/views/backend/menu/store/reducer'
import rolemenus from '@src/views/backend/role_menu/store/reducer'

const rootReducer = combineReducers({
  navigations,
  auth,
  profile,
  users,
  navbar,
  layout,
  roles,
  menus,
  rolemenus
})

export default rootReducer
