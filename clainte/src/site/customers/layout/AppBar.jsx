import { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'

import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'
import { LayoutContext } from './LayoutContext'
import {
  useTheme,
  Badge,
  Box,
  Button,
  CardActionArea,
  IconButton,
  // Typography,
  // Button,
  Avatar,
  Tooltip,
} from '@mui/material'

import { selectWishlists } from '../../../features/services/wishlistReducer'
import { selectCurrentUser } from '../../../features/auth/authSlice'
import { ColorModeContext, tokens } from '../../../theme'
import { setIsCartOpen } from '../../../features/services/cartReducer'
import logo from '../../../data/logo.png'
import useSearch from '../../../components/ui/useSearch'
import userAvatar from '../../../assets/user-avatar.png'
function AppBar({ isAuthenticated }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(selectCurrentUser)
  const cart = useSelector((state) => state.cart.cart)
  const wishlist = useSelector(selectWishlists)
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const colorMode = useContext(ColorModeContext)

  const { openAccountMenu } = useContext(LayoutContext)
  const { handleClickAccountMenu } = useContext(LayoutContext)
  const { handleClickOpenAccountDialog } = useContext(LayoutContext)

  const [SearchButton, SearchResult] = useSearch()
  return (
    <>
      <Box
        className={`sticky top-0 items-center w-full left-0 z-[200] drop-shadow-md ease-in-out duration-500 py-2`}
        backgroundColor={colors.primary[400]}
        // background
      >
        <Box className="w-full max-w-[90%] m-auto flex justify-between items-center">
          <Box>
            <CardActionArea
              className="w-[50px] h-[50px] rounded-full"
              onClick={() => navigate('/')}
              color="secondary"
            >
              <img
                alt="logo"
                src={logo}
                className="w-[50px] h-[50px] rounded-full"
              />
            </CardActionArea>
          </Box>

          <Box className="justify-center flex gap-2">
            <SearchButton />
            <IconButton onClick={colorMode.toggleColorMode}>
              {theme.palette.mode === 'dark' ? (
                <LightModeOutlinedIcon />
              ) : (
                <DarkModeOutlinedIcon />
              )}
            </IconButton>

            <Badge
              badgeContent={cart.length}
              color="secondary"
              invisible={cart.length === 0}
              sx={{
                '& .MuiBadge-badge': {
                  right: 5,
                  top: 5,
                  padding: '0 4px',
                  height: '14px',
                  minWidth: '13px',
                },
              }}
            >
              <IconButton onClick={() => dispatch(setIsCartOpen({}))}>
                <ShoppingBagOutlinedIcon />
              </IconButton>
            </Badge>
            {user && (
              <Badge
                badgeContent={wishlist?.length}
                color="secondary"
                invisible={wishlist?.length === 0}
                sx={{
                  '& .MuiBadge-badge': {
                    right: 5,
                    top: 5,
                    padding: '0 4px',
                    height: '14px',
                    minWidth: '13px',
                  },
                }}
              >
                <IconButton onClick={() => navigate('/profile/wishlist')}>
                  <FavoriteBorderOutlinedIcon />
                </IconButton>
              </Badge>
            )}

            {user === null ? (
              <Box className="flex gap-2">
                <Button
                  onClick={() => handleClickOpenAccountDialog('login')}
                  color="secondary"
                  variant="outlined"
                  size="small"
                >
                  Login
                </Button>
                <Button
                  onClick={() => handleClickOpenAccountDialog('register')}
                  color="secondary"
                  variant="outlined"
                  size="small"
                >
                  Register
                </Button>
              </Box>
            ) : (
              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleClickAccountMenu}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={openAccountMenu ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={openAccountMenu ? 'true' : undefined}
                >
                  <Avatar sx={{ width: 32, height: 32 }}>
                    <img
                      alt="A"
                      src={user?.image || userAvatar}
                      className="border bg-slate-300 "
                    />
                  </Avatar>
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </Box>
      </Box>
      <SearchResult />
    </>
  )
}

export default AppBar
