import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import { Modal, Typography } from '@mui/material';
import { post } from 'src/utils/api_methods';
import { SubmitHandler, useForm } from 'react-hook-form';

interface EventData {
  name: string;
  description: string;
  max_attendee: number;
  start_at: string;
  end_at: string;
}

const EventRegister = () => {

  const { register, handleSubmit } = useForm<EventData>()

  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  const onSubmit: SubmitHandler<EventData> = async (data: EventData) => {
    const name = data.name
    const description = data.description
    const max_attendee = data.max_attendee
    const start_at = data.start_at.replace('T',' ') + ":00"
    const end_at = data.end_at.replace('T', ' ') + ":00"
    const url = process.env.CSR_API_URI + '/events?name=' + name + '&description=' + description + '&max_attendee=' + max_attendee + '&start_at=' + start_at + '&end_at=' + end_at
    await post(url,{
      name,
      description,
      max_attendee,
      start_at,
      end_at
    })

    setOpen(true);
  }

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{display: 'flex', alignItems: 'center', flexDirection: 'column' }}
    >
      <Typography
        fontSize='36px'
        noWrap
        component='div'
        fontFamily='NOTO SANS JP'
        sx={{ alignSelf: 'center' , marginTop: '16px' }}
      >
        企画登録
      </Typography>
      <TextField
        label='企画名'
        type='text'
        variant='filled'
        margin='dense'
        {...register('name')}
      />

      <TextField
        label="企画説明"
        type="text"
        variant='filled'
        margin='dense'
        {...register('description')}
        multiline
        minRows={5}
      />

      <TextField
        label="参加上限人数"
        type="number"
        variant='filled'
        margin='dense'
        {...register('max_attendee')}
      />

      <TextField
        label="開始時刻"
        type="datetime-local"
        variant='filled'
        InputLabelProps={{ shrink: true }}
        margin='dense'
        {...register('start_at')}
      />

      <TextField
        label="終了時刻"
        type="datetime-local"
        variant='filled'
        InputLabelProps={{ shrink: true }}
        margin='dense'
        {...register('end_at')}
      />

      <Button
        type="submit"
        variant="outlined"
        sx={{ mt: 3, mb: 4 }}
        onClick={handleSubmit(onSubmit)}
      >
      企画作成
      </Button>

      {/* modal画面 */}
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={{position: 'absolute' as 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 30,
          p: 4,}}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            イベントを作成しました。
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            イベント一覧画面でご確認ください。
          </Typography>
        </Box>
      </Modal>

    </Box>
  );
}

export default EventRegister
