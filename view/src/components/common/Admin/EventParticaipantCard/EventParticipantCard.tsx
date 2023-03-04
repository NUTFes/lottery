import * as React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import PeopleIcon from '@mui/icons-material/People'
import PersonIcon from '@mui/icons-material/Person'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material'
import { EventParticipantCardProps } from './EventParticipantCard.type'
import { useState, useEffect, useMemo } from 'react'

const EventParticipantCard = (props: EventParticipantCardProps) => {
  const { participantType, participantParsent, participantCount } = props

  const participant = useMemo(
    () =>
      ({
        all: '技大祭 全体',
        inside: '技大祭 内部',
        outside: '技大祭 外部',
      }[participantType] || ''),
    [participantType]
  )

  const participantIconColor = useMemo(
    () =>
      ({
        all: 'primary.main',
        inside: 'success.main',
        outside: 'warning.main',
      }[participantType] || 'primary.main'),
    [participantType]
  )

  const participantIcon = useMemo(
    () =>
      ({
        all: <PeopleIcon />,
        inside: <PersonIcon />,
        outside: <PersonAddIcon />,
      }[participantType] || <></>),
    [participantType]
  )

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
                <Typography sx={{ color: 'warning.main' }}>{participantParsent} % </Typography>
              ) : (
                <Typography sx={{ color: 'success.main' }}>{participantParsent} % </Typography>
              )}
              <Typography sx={{ display: 'flex', justifyContent: 'center', mx: 1 }}> Sinse last hour</Typography>
            </Typography>
          </CardContent>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Avatar sx={{ mx: 2, width: 56, height: 56, bgcolor: participantIconColor }}>{participantIcon}</Avatar>
        </Box>
      </CardActionArea>
    </Card>
  )
}

export default EventParticipantCard
