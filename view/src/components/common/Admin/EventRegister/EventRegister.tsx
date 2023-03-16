import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import FormControl from '@mui/material';
import { Typography } from '@mui/material';
import { post } from 'src/util/api_methods';
import { useState } from 'react';

const url = process.env.CSR_API_URI + '/events'

const EventRegister = () => {

  const [values, setValues] = useState(
    {
      name: "",
      description: "",
      max_attendee: "",
      start_at: "",
      end_at: "",
    }
  );

  const handleChange = (e) => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async () => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
    // console.log({
    //   name: data.get('name'),
    //   description: data.get('description'),
    //   max_attendee: data.get('max_attendee'),
    //   start_at: data.get('start_at'),
    //   end_at: data.get('end_at')
    // });
    console.log(values)
    await post(url,{
      'name':values.name,
      'description':values.description,
      'max_attendee':values.max_attendee,
      'start_at':values.start_at,
      'end_at':values.end_at,
    })
  };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
      sx={{maxWidth:800, maxHeight:640}}
    >
      <Typography
        fontSize='36px'
        noWrap
        component='div'
        fontFamily='NOTO SANS JP'
        sx={{ alignSelf: 'flex-start', marginLeft: '4%' , marginTop: '16px' }}
      >
        企画登録
      </Typography>
      <TextField
        name='name'
        id='name'
        label='企画名'
        type='name'
        autoComplete='name'
        variant='filled'
        margin='dense'
        value={values.name}
        onChange={handleChange}
        required
      />
      <br/>
      <TextField
        name='description'
        id="description"
        label="説明"
        type="description"
        autoComplete='current-description'
        variant='filled'
        margin='dense'
        value={values.description}
        onChange={handleChange}
        multiline
        minRows={5}
      />
      <br/>
      <TextField
        name='max_attendee'
        id="max_attendee"
        label="参加上限人数"
        type="max_attendee"
        autoComplete="current-max_attendee"
        variant='filled'
        margin='dense'
        value={values.max_attendee}
        onChange={handleChange}
      />
      <br/>
      <TextField
        name='start_at'
        id="start_at"
        label="開始時刻"
        type="start_at"
        autoComplete="current-start_at"
        variant='filled'
        margin='dense'
        value={values.start_at}
        onChange={handleChange}
      />
      <br/>
      <TextField
        name='end_at'
        id="end_at"
        label="終了時刻"
        type="end_at"
        autoComplete="current-end_at"
        variant='filled'
        margin='dense'
        value={values.end_at}
        onChange={handleChange}
      />
      <br />
      <Button
      type="submit"
      variant="outlined"
      sx={{ mt: 3, mb: 2 }}
      >
      企画作成
      </Button>
    </Box>
  );
}

export default EventRegister
