import React from "react"
import ReactDOM from "react-dom"
import {Router, Link, Navigation} from "react-router"
import ReactMixin from 'react-mixin'

import Param from "variables"
import {Ajax} from "platform/plain"
import * as ReactUI from "platform/react-ui"

export class Component extends React.Component {
  constructor(props, context) {
    super(props, context)
    let state = {
      message: {}
    }
    this.mounted = false
    this.state = Object.assign(state, this.initState())
    this.storeListeners = []
    this.initialize()
  }
  static router() { return Router }
  static routerLink() { return Link }
  initState() { return {} }
  initialize() { /* nothing. */ }
  forward(path) {
    this.context.router.transitionTo(path)
  }
  updateState(data) {
    if (!this.mounted) return
    this.setState(data)
  }
  clearMessage() {
    this.updateState({message: {}})
  }
  watchStore(store, listener = () => {}, finishListener = this.handleFinish, messageListener = this.handleMessage) {
    this.storeListeners.push({
      store: store,
      listener: listener,
      finishListener: finishListener,
      messageListener: messageListener
    })
  }
  handleFinish(action) { /* nothing */ }
  handleMessage(message) {
    this.updateState({message: message})
  }
  node(key) {
    return ReactDOM.findDOMNode(this.refs[key])
  }
  refValue(key) {
    let ref = this.refs[key]
    return ref.state ? ref.state.value : ref.value
  }
  refValueSet(key, value) {
    let ref = this.refs[key]
    if (ref.state) {
      ref.setState({value: value})
    } else {
      ref.textContent = value
    }
  }
  refValues(keys = null) {
    let targetKeys= keys ? keys : Object.keys(this.refs)
    let data = {}
    targetKeys.forEach((key) => {
      data[key] = this.refValue(key)
    })
    return data
  }
  refValueClear(keys = null) {
    let targetKeys= keys ? keys : Object.keys(this.refs)
    targetKeys.forEach((key) => {
      this.refValueSet(key, null)
    })
  }
  // React Action
  componentDidMount() {
    this.storeListeners.forEach((v) => {
      v.store.addChangeListener(v.listener.bind(this))
      v.store.addFinishListener(v.finishListener.bind(this))
      v.store.addMessageListener(v.messageListener.bind(this))
    })
    this.mounted = true
  }
  componentWillUnmount() {
    this.storeListeners.forEach((v) => {
      v.store.removeChangeListener(v.listener.bind(this))
      v.store.removeFinishListener(v.finishListener.bind(this))
      v.store.removeMessageListener(v.messageListener.bind(this))
    })
    this.mounted = false
  }
}
ReactMixin.onClass(Component, Navigation)
Component.contextTypes = {
    router: React.PropTypes.object
}

