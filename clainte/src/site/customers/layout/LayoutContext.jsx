import { createContext, useState } from 'react'

export const LayoutContext = createContext()

const LayoutProvider = ({ children }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const openAccountMemu = Boolean(anchorEl)
  const [openAccountDialog, setOpenAccountDialog] = useState({
    isOpen: false,
    mode: 'login',
  })
  const handleClickAccountMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleCloseAccountMenu = () => {
    setAnchorEl(null)
  }
  const handleClickOpenAccountDialog = (mode) => {
    setOpenAccountDialog({
      isOpen: true,
      mode: mode,
    })
  }
  const handleCloseAccountDialog = () => {
    setOpenAccountDialog({
      isOpen: false,
      mode: 'login',
    })
  }

  const values = {
    anchorEl,
    openAccountMemu,
    openAccountDialog,
    handleClickAccountMenu,
    handleCloseAccountMenu,
    setOpenAccountDialog,
    handleClickOpenAccountDialog,
    handleCloseAccountDialog,
  }
  return (
    <LayoutContext.Provider value={values}>{children}</LayoutContext.Provider>
  )
}

export default LayoutProvider
