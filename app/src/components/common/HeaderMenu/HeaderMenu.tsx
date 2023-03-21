import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { logout } from 'src/utils/logout'
import { HeaderMenuProps } from './HeaderMenu.type'

const HeaderMenu = ({ mode }: HeaderMenuProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} sx={{ color: 'white' }}>
        <AccountCircleIcon />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem
          onClick={() => {
            logout(mode)
          }}
        >
          ログアウト
        </MenuItem>
      </Menu>
    </>
  )
}

export default HeaderMenu
