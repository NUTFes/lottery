import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import { Typography } from '@mui/material';
import { post } from 'src/util/api_methods';
import { useState ,useEffect} from 'react';

interface EventData {
  name: string
  description: string
  max_attendee: number
  start_at: string
  end_at: string
}

const EventRegister = () => {

  const [values, setValues] = useState<EventData>(
    {
      name: "",
      description: "",
      max_attendee: 0,
      start_at: "",
      end_at: "",
    }
  );

  // useEffect(() => {
  //   setValues(values);
  // },[values])

  const handleChange = (input: string) =>
  (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [input]: e.target.value });
    console.log(e.target.value)
  };

  const handleSubmit = async (data: EventData) => {
    event.preventDefault();
    const url = process.env.CSR_API_URI + '/events'
    console.log(values)
    console.log(data)
    const DataPost = await post(url,data)
    console.log(DataPost)
  };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
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
        type='text'
        variant='filled'
        margin='dense'
        value={values.name}
        onChange={handleChange('name')}
        required
      />
      <br/>
      <TextField
        name='description'
        id="description"
        label="説明"
        autoComplete='current-description'
        variant='filled'
        margin='dense'
        value={values.description}
        onChange={handleChange('description')}
        multiline
        minRows={5}
      />
      <br/>
      <TextField
        name='max_attendee'
        id="max_attendee"
        label="参加上限人数"
        autoComplete="current-max_attendee"
        variant='filled'
        margin='dense'
        value={values.max_attendee}
        onChange={handleChange('max_attendee')}
      />
      <br/>
      <TextField
        name='start_at'
        id="start_at"
        label="開始時刻"
        autoComplete="current-start_at"
        variant='filled'
        margin='dense'
        value={values.start_at}
        onChange={handleChange('start_at')}
      />
      <br/>
      <TextField
        name='end_at'
        id="end_at"
        label="終了時刻"
        autoComplete="current-end_at"
        variant='filled'
        margin='dense'
        value={values.end_at}
        onChange={handleChange('end_at')}
      />
      <br />
      <Button
        type="submit"
        variant="outlined"
        disabled={(values.name && values.description && values.start_at && values.end_at) ? false : true}
        sx={{ mt: 3, mb: 2 }}
        onClick={() => {handleSubmit(values)}}
      >
      企画作成
      </Button>
    </Box>
  );
}

export default EventRegister
