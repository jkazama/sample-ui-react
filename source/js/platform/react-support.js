import React from "react"
import { findDOMNode } from "react-dom"

export class Component extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = Object.assign({}, this.initState())
    this.initialize()
  }
  initState() { return {} }
  initialize() { /* nothing. */ }
  mergeState(data = {}) {
    this.setState(Object.assign({}, this.state, data))
  }
  clearState() {
    this.setState(Object.assign({}, this.initState()))
  }
  handleValue(e, key) {
    this.mergeState({[key]: e.target.value})
  }
}
