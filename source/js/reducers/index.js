
import { combineReducers } from 'redux'
import master from "reducers/master"
import asset from "reducers/asset"

export default combineReducers({
  master,
  asset
})
