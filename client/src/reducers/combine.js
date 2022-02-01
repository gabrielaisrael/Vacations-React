import { combineReducers } from "redux"
import isLoggedReducer from './IsLogged'
import isAdminReducer from './isAdmin'
import followReducer from './follow'
import searchReducer from './search'

const allReducers = combineReducers({
    isLogged: isLoggedReducer,
    isAdmin: isAdminReducer,
    followReducer: followReducer,
    isSearch: searchReducer
})

export default allReducers