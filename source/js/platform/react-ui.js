import React from "react"

import {Level} from "constants/plain"
import {Formatter} from "platform/plain"

// # Reference Component

class Reference extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: null,
    }
  }
}

export class Label extends Reference {
  render() {
    let value = Formatter.format(this.props.type, this.props.value)
    if (this.props.inline) {
      return <span id={this.props.id} className={this.props.className}>{value}</span>
    } else {
      return <div id={this.props.id} className={this.props.className}>{value}</div>
    }
  }
}

export class Message extends Reference {
  parseMessage() {
    let msg = this.props.message
    if (msg && msg.global) {
      return {message: msg.global, level: msg.level}
    }
    return {}
  }
  render() {
    let {message, level} = this.parseMessage()
    let levelClass = (() => {
      switch (level) {
        case Level.INFO:
          return "success"
        case Level.WARN:
          return "warning"
        case Level.ERROR:
          return "danger"
        default:
          return "default"
      }
    })()
    let className = `alert alert-${levelClass} text-${levelClass}`
    if (!message) return null
    return <div className={className}>{message}</div>
  }
}

// # Input Component

class Input extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: null,
    }
  }
  onChange(e) {
    this.setState({value: e.target.value})
  }
  error() {
    let msg = this.props.message
    if (msg && msg.columns && 0 < msg.columns.length) {
      let err = Array.from(msg.columns).find((err) =>
        (msg.level === Level.WARN || msg.level === Level.ERROR) && err.key === this.props.id)
      if (err) return err.values[0]
    }
    return null
  }
}

export class Text extends Input {
  render() {
    let classRow = this.props.row ? 'l-row ' : ''
    let className = `form-control ${classRow}${this.props.className}`
    let input = (
      <input type='text' id={this.props.id} className={className} placeholder={this.props.placeholder} value={this.state.value || ""} onChange={this.onChange.bind(this)} />
    )
    let message = this.error()
    if (message) {
      let error = message ? <div className="l-message-group-item text-danger">{message}</div> : null
      return (
        <div className="l-message-group">
          {input}
          {error}
        </div>
      )
    } else {
      return input
    }
  }
}

// export class RitchText extends Input {
//   render() {
//     let prefix = this.props.prefix ? <span className="input-group-addon">{this.props.prefix}</span> : null
//     let suffix = this.props.suffix ? <span className="input-group-addon">{this.props.suffix}</span> : null
//     let className = `form-control ${this.props.className}`
//     let input = (
//       <input type='text' id={this.props.id} className={className} placeholder={this.props.placeholder} maxsize={this.props.maxsize} value={this.state.value} onChange={this.onChange.bind(this)} />
//     )
//     let message = this.error()
//     if (message) {
//       let error = message ? <div className="l-message-group-item text-danger">{message}</div> : null
//       return (
//         <div className="l-message-group ${this.props.className}">
//           <div className="input-group">
//             {prefix}
//             {input}
//             {suffix}
//           </div>
//           {error}
//         </div>
//       )
//     } else {
//       return (
//         <div className="input-group form-control l-row">
//           {prefix}
//           {input}
//           {suffix}
//         </div>
//       )
//     }
//   }
// }
