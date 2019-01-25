import { Level } from "constants/plain"
import { ActionsSupport } from "platform/redux-action-support"
import api from "api/asset.js"
import types from "constants/asset"

export default class AssetActions extends ActionsSupport {
  constructor(dispatch) {
    super(dispatch)
  }

  // 出金依頼をします。
  findUnprocessedOut(success) {
    api.findUnprocessedOut({}, list => {
      success(list)
    }, error => this.handleFailure(error))
  }
  // 未処理の出金情報を検索します。
  requestWithdrawal(data, success) {
    api.withdraw(data, id => {
      const asset = {} //low: API経由で資産系サマリの再取得を行う
      this.dispatch({type: types.UPDATE_ASSET, payload: asset})
      this.emitMessage("出金依頼が完了しました", [], Level.INFO)
      success(id)
    }, error => this.handleFailure(error))
  }
}
