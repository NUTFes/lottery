import React, { FC } from 'react'
import AppBar from '@mui/material/AppBar'
import { createTheme } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import HeaderMenu from '@components/common/HeaderMenu'

const theme = createTheme({
  palette: {
    primary: {
      main: '#0E1841',
    },
  },
})

const AdminHeader: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position="static"
        color="primary"
        sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', height: '4rem', px: '2rem' }}
      >
        <Typography fontSize="24px" noWrap component="div" fontFamily="NOTO SANS JP" sx={{ flexGrow: '1' }}>
          管理者画面
        </Typography>
        <HeaderMenu mode="admin" />
      </AppBar>
    </ThemeProvider>
  )
}

export default AdminHeader
