import Param from 'variables'
import {Ajax} from "platform/plain"

const apiUrl = (path) => `${Param.Api.root}${path}`

export default {
  login(data, success, failure) {
    Ajax.post(apiUrl('/login'), data, success, failure)
  },
  logout() {
    Ajax.post(apiUrl('/logout'), {}, v => true, e => false)
  },
  loginStatus(success, failure) {
    Ajax.get(apiUrl('/account/loginStatus'), {}, success, failure)
  },
  loginAccount(success) {
    Ajax.get(apiUrl('/account/loginAccount'), {}, success, e => false)
  }
}