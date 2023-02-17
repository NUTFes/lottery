import * as React from 'react';
import { FC ,useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { get } from 'src/util/api_methods';

export interface User {
  id: number;
  name: string;
  number: number;
}

export interface Props {
  users: User[];
}

// export const getServerSideProps = async () => {
//   const getUrl = process.env.SSR_API_URI + '/users';
//   const users = await get(getUrl);
//   console.log('url', getUrl)
//   console.log('json', users)
//   return {
//     props: {
//       users
//     },
//   };
// }





const ParticpantCard = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch(process.env.CSR_API_URI + '/winners', {
      headers: {
      'Content-Type': 'application/json'},
      method: 'GET',
      mode: 'no-cors'})
    .then(res => res.json())
    .then(data => {
        setUsers(data)
        console.log(data)
    })
    .catch(error => {
      // ネットワークエラーでも !response.ok でもここで処理できる
      console.error('エラーが発生しましたwao', error);
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
          現在の技大祭参加者数:200人  外部参加者数:150人  学内参加者数:50人
                    {
            users.map((user) =>
              <li>{user}</li>)
          }
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ParticpantCard;
