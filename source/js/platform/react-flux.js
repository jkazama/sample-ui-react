import Param from "variables"
import {Level} from "constants/plain"
import {Ajax} from "platform/plain"

import Dispatcher from "dispatcher/dispatcher"
import EventTypes from "constants/event"

// array to object[key: key]
export function KeyMirror(arrays) {
  return arrays.reduce((obj, key) => {obj[key] = key; return obj}, {})
}

// Flux Action Creators
export class ActionCreators {
  dispatch(type, data = {}) {
    Dispatcher.dispatch(Object.assign({type: type}, {data: data}))
  }
}

// Flux Store
export class Store extends EventEmitter {
  constructor(opts) {
    super(opts)
    this.items = []
    this.dispatcherToken = Dispatcher.register(this.action.bind(this))
  }
  init(items) {
    this.items = Array.from(items).map((v) => v)
  }
  action(action) {
    // do dispatch action    
  }
  // # support method
  update(items) {
    this.init(items)
    this.emitChange()
  }
  // APIへのGET処理を行います
  apiGet(path, data, success, failure = this.apiFailure) {
    Ajax.get(this.apiUrl(path), data, success.bind(this), failure.bind(this))
  }
  // APIへのPOST処理を行います
  apiPost(path, data, success, failure = this.apiFailure) {
    Ajax.post(this.apiUrl(path), data, success.bind(this), failure.bind(this))
  }
  // APIへのファイルアップロード処理(POST)を行います
  // アップロード対象キーの値はfileメソッドを利用して定義するようにしてください
  apiUpload(path, data, success, failure = this.apiFailure) {
    Ajax.upload(this.apiUrl(path), data, success.bind(this), failure.bind(this))
  }
  // APIプリフィックスを付与したURLを返します。
  apiUrl(path) {
    return `${Param.Api.root}${path}`
  }
  // API実行時の標準例外ハンドリングを行います。
  apiFailure(error) {
    if (error.response) {
      switch (error.status) {
        case 200:
          this.emitError("要求処理は成功しましたが、戻り値の解析に失敗しました")
          break
        case 400:
          let parsed = this.parseApiError(error)
          this.emitError(parsed.global ? parsed.global : "入力情報を確認してください", parsed.columns, Level.WARN)
          break
        case 401:
          this.emitError("機能実行権限がありません")
          break
        default:
          this.emitError("要求処理に失敗しました")
      }
    } else {
      this.emitError("要求処理に失敗しました。サーバ側に問題が発生した可能性があります。")
    }
  }
  parseApiError(error) {
    let xhr = error.response.xhr
    let errs = JSON.parse(xhr.responseText)
    let parsed = {global: null, columns: []}
    Object.keys(errs).forEach((err) => {
      if (err) parsed.columns.push({key: err, values: errs[err]})
      else parsed.global = errs[err]
    })
    return parsed
  }

  // # control event
  emitChange() {
    this.emit(EventTypes.CHANGE)
  }
  emitMessage(globalMessage, columnMessages = [], level = Level.INFO) {
    this.emit(EventTypes.MESSAGE, {global: globalMessage, columns: columnMessages, level: level})
  }
  emitError(globalMessage, columnMessages = [], level = Level.ERROR) {
    this.emit(EventTypes.MESSAGE, {global: globalMessage, columns: columnMessages, level: level})
  }
  emitFinish(type, data = {}) {
    this.emit(EventTypes.FINISH, {type: type, data: data})
  }
  addChangeListener(callback) {
    this.on(EventTypes.CHANGE, callback)
  }
  removeChangeListener(callback) {
    this.removeListener(EventTypes.CHANGE, callback)
  }
  addMessageListener(callback) {
    this.on(EventTypes.MESSAGE, callback)
  }
  removeMessageListener(callback) {
    this.removeListener(EventTypes.MESSAGE, callback)
  }
  addFinishListener(callback) {
    this.on(EventTypes.FINISH, callback)
  }
  removeFinishListener(callback) {
    this.removeListener(EventTypes.FINISH, callback)
  }
}
