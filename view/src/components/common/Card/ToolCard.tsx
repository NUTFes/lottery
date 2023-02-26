import * as React from 'react'
import Card from '@mui/material/Card'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
//icons
import HomeIcon from '@mui/icons-material/Home'
import SettingsIcon from '@mui/icons-material/Settings'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import EventIcon from '@mui/icons-material/Event'
import ListAltIcon from '@mui/icons-material/ListAlt'

const ToolCard = () => {
  const toolList = [
    {
      name: 'home',
      displayName: 'ホーム',
      icon: <HomeIcon />,
      url: '/',
    },
    {
      name: 'toolList',
      displayName: 'イベント一覧',
      icon: <EventIcon />,
      url: '/',
    },
    {
      name: 'participantList',
      displayName: '参加者一覧',
      icon: <ListAltIcon />,
      url: '/',
    },
    {
      name: 'participantEventRegistration',
      displayName: '参加者・イベント登録',
      icon: <PersonAddIcon />,
      url: '/',
    },
    {
      name: 'setting',
      displayName: '設定',
      icon: <SettingsIcon />,
      url: '/',
    },
  ]

  return (
    <Card sx={{ maxWidth: 275 }}>
      <Typography fontWeight="bold" color="text.secondary" sx={{ mx: 5, my: 2 }}>
        ツール
      </Typography>
      <List>
        {toolList.map((tool) => (
          <ListItem key={tool.name} disablePadding>
            <ListItemButton href={tool.url}>
              {tool.icon ? <ListItemIcon>{tool.icon}</ListItemIcon> : null}
              <ListItemText primary={tool.displayName} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  )
}

export default ToolCard
