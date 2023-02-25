import * as React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import PeopleIcon from '@mui/icons-material/People'
import PersonIcon from '@mui/icons-material/Person'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material'
import { EventParticipantCardProps } from './EventParticipantCard.type'
import { useMemo } from 'react'

const EventParticipantCard = (props: EventParticipantCardProps) => {
  const { participantType, participantParsent, participantCount } = props

  const participant = useMemo(() => {
    switch (participantType) {
      case 'all':
        return '技大祭 全体'
      case 'inside':
        return '技大祭 内部'
      case 'outside':
        return '技大祭 外部'
      default:
        return ''
    }
  }, [participantType])

  const participantIcon = useMemo(() => {
    switch (participantType) {
      case 'all':
        return <PeopleIcon />
      case 'inside':
        return <PersonIcon />
      case 'outside':
        return <PersonAddIcon />
      default:
        return <PeopleIcon />
    }
  }, [participantType])

  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardActionArea sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
        <Box>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {participant}
            </Typography>

            <Typography variant="h5">{participantCount}人</Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}
            >
              {participantParsent < 0 ? (
                <Typography sx={{ color: 'red' }}>{participantParsent} % </Typography>
              ) : (
                <Typography sx={{ color: 'green' }}>{participantParsent} % </Typography>
              )}
              <Typography sx={{ display: 'flex', justifyContent: 'center' }}> Sinse last hour</Typography>
            </Typography>
          </CardContent>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>{participantIcon}</Box>
      </CardActionArea>
    </Card>
  )
}

export default EventParticipantCard
