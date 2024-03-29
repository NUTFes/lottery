import * as React from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import Box from '@mui/material/Box'
import { EventParticpantCardProps } from './EventParticpantCard.type'

const EventParticpantCard = (props: EventParticpantCardProps) => {
  const { userList } = props
  // const [eventusers, setEventUsers] = useState<Events[]>()

  // useEffect(() => {
  //   fetch(process.env.CSR_API_URI + '/events/7/users', {
  //     method: 'GET',})
  //   .then(res => res.json())
  //   .then(data => {
  //       setEventUsers(data)
  //       console.log(data)
  //   })
  //   .catch(error => {
  //     console.error('エラーが発生しました', error);
  //   });
  // },[])

  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <Box sx={{ maxHeight: 444, maxWidth: 363 }}>
      <Paper sx={{ overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 444, maxWidth: 363 }}>
          <Table stickyHeader aria-label="sticky table" style={{ tableLayout: 'fixed' }}>
            <TableHead>
              <TableRow>
                <TableCell>名前</TableCell>
                <TableCell align="left">学籍番号</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userList?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={user.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{user.name}</TableCell>
                  <TableCell align="left">{user.number}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100, { label: 'All', value: -1 }]}
          component="div"
          count={userList?.length || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  )
}

export default EventParticpantCard
