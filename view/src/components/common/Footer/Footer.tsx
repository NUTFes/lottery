import React,{ FC } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const Footer: FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Box
        component="footer"
        sx={{
          py: 0.49,
          mt: 'auto'
        }}
        bgcolor='#0E1841'
      >
        <Container maxWidth="sm">
          <Typography
          fontSize='20px'
          noWrap
          component='div'
          fontFamily='NOTO SANS JP'
          color="#FFFEF6"
          sx={{ alignSelf: 'flex-start', marginLeft: '30%' , marginTop: '5px' }}
          >
            技大祭実行委員会
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}

export default Footer
