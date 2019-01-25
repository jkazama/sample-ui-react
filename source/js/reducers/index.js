import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import master from "reducers/master"
import asset from "reducers/asset"

export default (history) => combineReducers({
  router: connectRouter(history),
  master,
  asset
})
