
import { createMuiTheme } from '@material-ui/core/styles'
export default createMuiTheme({
  palette: {
  },
  typography: {
    useNextVariants: true,
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    fontSize: 14,
  },
})

export const color = {
  default: "#9e9e9e",
  info: "#4caf50",
  warning: "#ffa726",
  error: "#c62828",
}

// for page

export const styleUi = {
  alignCenter: {textAlign: "center"},
  alignRight: {textAlign: "right"},
  paper: { padding: 20, textAlign: "center" },
  alert: {
    warning: {
      padding: "9px",
      margin: "20px auto",
      color: "white",
      backgroundColor: "#ffb74d",
      fontSize: "90%",
      width: "80%",
      textAlign: "center",
    }
  },
}

export const styleUiLogin = {
  main: {
    padding: 20,
    textAlign: "center",
  },
  loginButton: {width: 250, marginTop: 20},
}

export const styleUiAsset = {
  main: {
    textAlign: "center",
    margin: "10px",
    padding: "0 20px 20px 20px",
  },
  requestWithdrawButton: {
    verticalAlign: "top",
    margin: "12px 0 0 12px",
  },
  absAmountText: {marginLeft: 20},
}
