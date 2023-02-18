import * as React from 'react';
import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const ParticpantCard = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch(process.env.CSR_API_URI + '/users', {
      method: 'GET',})
    .then(res => res.json())
    .then(data => {
        setUsers(data)
        console.log(data)
    })
    .catch(error => {
      console.error('エラーが発生しました', error);
    });
  },[])

  return (
    <Card sx={{ maxWidth: 1009 , maxHeight: 500 } }>
      <CardContent>
        <Typography
          fontSize='24px'
          noWrap
          component='div'
          fontFamily='NOTO SANS JP'
          sx={{ alignSelf: 'flex-start'}}
        >
          現在の技大祭参加者数:{users.length}人
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ParticpantCard;
