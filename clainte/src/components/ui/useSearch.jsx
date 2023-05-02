import { useTheme } from '@emotion/react'
import {
  Box,
  CardActionArea,
  IconButton,
  TextField,
  Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { tokens } from '../../theme'
import Model from './Model'
import { useSearchItemsQuery } from '../../features/services/searchApiSlice'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../../features/auth/authSlice'
import { Link } from 'react-router-dom'
import userAvatar from '../../assets/user-avatar.png'
const useSearch = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const user = useSelector(selectCurrentUser)
  const [searchValue, setSearchValue] = useState('')
  const [search, setSearch] = useState('')
  const [openModel, setOpenModel] = useState(false)

  const { data: searchItems = {}, isFetching: isFetchingSearchItems } =
    useSearchItemsQuery({
      search,
    })

  useEffect(() => {
    let timeOut = setTimeout(() => {
      if (searchValue !== '') {
        setSearch(`search=${searchValue}`)
      }
    }, 1000)
    return () => clearTimeout(timeOut)
  }, [searchValue])

  const SearchButton = () => {
    return (
      <IconButton onClick={() => setOpenModel(true)}>
        <SearchOutlinedIcon />
      </IconButton>
    )
  }

  const SearchResult = () => {
    return (
      <Model
        openModel={openModel}
        setOpenModel={setOpenModel}
        modelTitle="Search"
        width="md"
      >
        <Box className="w-full flex flex-col gap-8">
          <Box className="w-full">
            <TextField
              variant="outlined"
              color="secondary"
              fullWidth
              placeholder="search.."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              autoFocus
            />
          </Box>
          <Box className="w-full">
            {!isFetchingSearchItems && (
              <>
                {!!searchItems.products?.length && (
                  <Box className="h-fit w-fit flex flex-col gap-4">
                    <Typography
                      variant="h4"
                      color={colors.grey[100]}
                      fontWeight="bold"
                      className={`text-md md:text-xl  text-left my-4`}
                    >
                      Products
                    </Typography>
                    {searchItems.products?.map((product, ind) => (
                      <Box
                        key={`${product?.title}-${product?.id}-${ind}`}
                        className="h-fit flex flex-col md:flex-row gap-2
                        items-center justify-center pb-4 drop-shadow-md"
                      >
                        <Link
                          to={
                            !!user?.is_superuser
                              ? `/admin/products/${product?.id}`
                              : `/product/${product?.id}`
                          }
                        >
                          <CardActionArea
                            // onClick={() => navigate(`/product/${product?.id}`)}
                            className={`${
                              theme.palette.mode === 'dark'
                                ? 'bg-white/5'
                                : 'bg-black/5'
                            } bg-opacity-90 p-1 w-fit h-[120px] rounded-md flex
                                items-center ease-in-out duration-300`}
                          >
                            <img
                              alt={product?.title}
                              className="w-full h-full rounded-md"
                              src={`${product?.thumbnail}`}
                            />
                          </CardActionArea>
                        </Link>
                        <Box className="h-full flex flex-col px-2 w-full">
                          <Box className="flex justify-between items-center">
                            <Typography fontWeight="bold">
                              {product?.title}
                            </Typography>
                          </Box>
                          <Typography className="mr-4">
                            {product?.description
                              .replaceAll(/<[^>]*>/g, '')
                              .slice(0, 150)}
                            {product?.description?.length > 150 && (
                              <strong> . . .</strong>
                            )}
                          </Typography>
                          <Box className="flex justify-between w-full">
                            <Box className="h-fit w-fit">
                              <Typography fontWeight="bold">
                                <strong>Price</strong> : $
                                {product?.sale_pricing}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                )}
                {!!searchItems.blogs?.length && (
                  <Box className="h-fit w-fit flex flex-col gap-4">
                    <Typography
                      variant="h4"
                      color={colors.grey[100]}
                      fontWeight="bold"
                      className={`text-md md:text-xl  text-left my-4`}
                    >
                      Blogs
                    </Typography>
                    {searchItems.blogs?.map((blog, ind) => (
                      <Box
                        key={`${blog?.title}-${blog?.id}-${ind}`}
                        className="h-fit flex flex-col md:flex-row gap-2
                        items-center justify-center pb-4 drop-shadow-md"
                      >
                        <Link
                          to={
                            !!user?.is_superuser
                              ? `/admin/blogs/${blog.slug}`
                              : `/blogs/${blog.slug}`
                          }
                        >
                          <CardActionArea
                            // onClick={() => navigate(`/blogs/${blog.slug}`)}
                            className={`${
                              theme.palette.mode === 'dark'
                                ? 'bg-white/5'
                                : 'bg-black/5'
                            } bg-opacity-90 p-1 w-fit h-[120px] rounded-md flex
                            items-center ease-in-out duration-300`}
                          >
                            <img
                              alt={blog?.title}
                              className="w-full h-full rounded-md"
                              src={`${blog?.thumbnail}`}
                            />
                          </CardActionArea>
                        </Link>
                        <Box className="h-full flex flex-col px-2 w-full">
                          <Box className="flex justify-between blogs-center">
                            <Typography fontWeight="bold">
                              {blog?.title}
                            </Typography>
                          </Box>
                          <Typography className="mr-4">
                            {blog?.headline}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                )}

                {!!user?.is_superuser && !!searchItems.users?.length && (
                  <Box className="h-fit w-fit flex flex-col gap-4">
                    <Typography
                      variant="h4"
                      color={colors.grey[100]}
                      fontWeight="bold"
                      className={`text-md md:text-xl  text-left my-4`}
                    >
                      users
                    </Typography>
                    {searchItems.users?.map((user, ind) => (
                      <Box
                        key={`${user?.title}-${user?.id}-${ind}`}
                        className="h-fit w-full flex flex-col md:flex-row gap-2
                        items-center justify-center pb-4 drop-shadow-md"
                      >
                        <Link to={`/admin/customers/${user?.id}`}>
                          <CardActionArea
                            className={`${
                              theme.palette.mode === 'dark'
                                ? 'bg-white/5'
                                : 'bg-black/5'
                            } bg-opacity-90 p-1 w-[80px] h-[80px] rounded-full flex
                            items-center ease-in-out duration-300 `}
                          >
                            <img
                              className="rounded-full h-full w-full border bg-slate-300 "
                              alt="customer avatar"
                              src={user?.image || userAvatar}
                            />
                          </CardActionArea>
                        </Link>
                        <Box className="h-full flex flex-col px-2 w-full">
                          <Box className="flex justify-between items-center">
                            <Typography fontWeight="bold">
                              {user?.first_name} {user?.last_name}
                            </Typography>
                          </Box>
                          <Box className="flex justify-between w-full">
                            <Typography
                              variant="subtitle1"
                              color={colors.grey[200]}
                              className={`text-left my-1`}
                            >
                              {user?.date_joined}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                )}
              </>
            )}
          </Box>
        </Box>
      </Model>
    )
  }

  return [SearchButton, SearchResult]
}

export default useSearch
