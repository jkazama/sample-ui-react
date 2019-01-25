import React from "react"

export class Component extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = Object.assign({}, this.initState())
    this.initialize()
  }
  initState(state, props) { return {} }
  initialize() { /* nothing. */ }
  mergeState(data = {}) {
    this.setState((state, props) => Object.assign({}, state, data))
  }
  clearState() {
    this.setState((state, props) => Object.assign({}, this.initState(state, props)))
  }
  handleValue(e, key) {
    this.mergeState({[key]: e.target.value})
  }
}
