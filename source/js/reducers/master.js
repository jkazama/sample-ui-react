import types from "constants/master"

const initialState = {
  // ログイン情報
  login: {
    logined: false,
    account: {}
  },
  // メッセージ
  message: {
    default: {
      // 汎用グローバルメッセージ [message: string, level: Level]
      global: null,
      // カラムスコープのメッセージ一覧 [key: string, level: Level, messages: array]
      columns: [],
    }
  }
}

const master = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_MESSAGE:
      const { key, message, level, columns } = action.payload
      const idx = key || 'default'
      let mergeMessage = Object.assign({}, state)
      mergeMessage.message[idx] = {
        global: {
          message: message,
          level: level,
        },
        columns: columns
      }
      return mergeMessage
    case types.LOGINED:
      const account = action.payload.id ? action.payload : {}
      return Object.assign({}, state,
        {login: {logined: true}}
      , account)
    case types.LOGOUT:
      return initialState
    default:
      return state
  }
}
export default master
