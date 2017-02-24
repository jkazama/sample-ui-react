import { combineReducers } from 'redux'
import { UPDATE_ASSET } from "constants/asset"

const initialState = {
  // 資産 (例: 残高や出金可能金額 等、コンポーネント横断的に保持したい資産情報 )
  asset: {}
}

const cashInOuts = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ASSET:
      return Object.assign({}, state,
        {asset: action.payload}
      )
    default:
      return state
  }
}
export default combineReducers({
  cashInOuts
})