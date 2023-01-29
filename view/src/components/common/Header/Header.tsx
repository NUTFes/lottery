import React, { FC } from 'react'
import AppBar from '@mui/material/AppBar';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0E1841',
    },
  }
});

const Header: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppBar position='static' color='primary' sx={{height: '64px'}}>
      <Typography
        fontSize='24px'
        noWrap
        component='div'
        fontFamily='NOTO SANS JP'
        sx={{ alignSelf: 'flex-start', marginLeft: '4%' , marginTop: '16px' }}
      >
        管理者画面
      </Typography>
      </AppBar>
    </ThemeProvider>
  )
}

export default Header
