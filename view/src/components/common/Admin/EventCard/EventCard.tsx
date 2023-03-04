import * as React from 'react'
import Card from '@mui/material/Card'
import { EventCardProps } from './EventCard.type'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

const EventCard = (props: EventCardProps) => {
  const { eventList } = props
  const nowTime = new Date()
  const holdingEventList = eventList.filter((event) => event.openingTime <= nowTime && event.closingTime >= nowTime)
  const scheduledEventList = eventList.filter((event) => event.openingTime > nowTime)
  const endEventList = eventList.filter((event) => event.closingTime < nowTime)

  return (
    <Card sx={{ maxWidth: 275 }}>
      <Typography fontWeight='bold' color='text.secondary' sx={{ mx: 5, my: 2 }}>
        イベント
      </Typography>
      <Divider textAlign="left">
        <Typography variant="inherit" color="text.secondary" sx={{ justifyContent: 'space-around' }}>
          開催中
        </Typography>
      </Divider>
      <List>
        {holdingEventList.map((event) => (
          <ListItem key={event.name} disablePadding>
            <ListItemButton href={event.url}>
              {event.icon ? <ListItemIcon>{event.icon}</ListItemIcon> : null}
              <ListItemText primary={event.displayName} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider textAlign="left">
        <Typography variant="inherit" color="text.secondary" sx={{ justifyContent: 'space-around' }}>
          開催予定
        </Typography>
      </Divider>
      <List>
        {scheduledEventList.map((event) => (
          <ListItem key={event.name} disablePadding>
            <ListItemButton href={event.url}>
              {event.icon ? <ListItemIcon>{event.icon}</ListItemIcon> : null}
              <ListItemText primary={event.displayName} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider textAlign="left">
        <Typography variant="inherit" color="text.secondary" sx={{ justifyContent: 'space-around' }}>
          開催終了
        </Typography>
      </Divider>
      <List>
        {endEventList.map((event) => (
          <ListItem key={event.name} disablePadding>
            <ListItemButton href={event.url}>
              {event.icon ? <ListItemIcon>{event.icon}</ListItemIcon> : null}
              <ListItemText primary={event.displayName} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  )
}

export default EventCard
