import * as Color from '@material-ui/core/colors'
import commonFunc from '@/functions/common.func'
import React from 'react'
import { CircularProgress, Box } from '@material-ui/core'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
interface LoadingComponentProps {
  isLoading?: boolean
  pastDelay?: boolean
  timedOut?: boolean
  error?: any
}

const Loading: React.FunctionComponent<LoadingComponentProps> = (props) => {
  let Theme = Color[commonFunc.Theme]
  let ThemeData = createMuiTheme({
    palette: {
      primary: Object.assign({}, Theme),
      secondary: Object.assign({}, Theme),
      type: commonFunc.Dark ? 'dark' : 'light'
    }
  })
  return (
    <MuiThemeProvider theme={ThemeData}>
      <Box
        className="full"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress size={50} />
      </Box>
    </MuiThemeProvider>
  )
}

export default Loading
