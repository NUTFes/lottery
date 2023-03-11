import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box'
import { useState, useEffect } from 'react';
import { EventParticipantCardProps } from './EventParticipantCard.type';

interface User {
  id: number
  name: string
  number: number
  created_at: number
  updated_at: number
};

interface Events {
  id: number
  name: string
  description: string
  max_attendee: number
  start_at: number
  end_at: number
  created_at: number
  updated_at: number
  user: User[]
};

const EventParticipantCard = (props: EventParticipantCardProps) => {
  const [eventUsers, setEventUsers] = useState<Events>()

  useEffect(() => {
    fetch(process.env.CSR_API_URI + `/events/${props.eventId}/users`, {
      method: 'GET',})
    .then(res => res.json())
    .then(data => {
        setEventUsers(data)
        console.log(data)
    })
    .catch(error => {
      console.error('エラーが発生しました', error);
    });
  },[])

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(Number(event.target.value));
    setPage(0);
  };

  return (
    <Box sx={{ maxHeight:444, maxWidth:363}}>
    <Paper sx={{ overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 444, maxWidth: 363}}>
        <Table stickyHeader aria-label="sticky table" style={{tableLayout: "fixed"}}>
          <TableHead>
            <TableRow>
              <TableCell>名前</TableCell>
              <TableCell align="left">学籍番号</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {eventUsers?.user
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map(user => (
            <TableRow
              hover role="checkbox" tabIndex={-1}
              key={user.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell >
                {user.name}
              </TableCell>
              <TableCell>
                {user.number}
              </TableCell>
            </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5,10,25,100,{ label: 'All', value: -1 }]}
        component="div"
        count={eventUsers?.user.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </Box>
  );
}

export default EventParticipantCard
