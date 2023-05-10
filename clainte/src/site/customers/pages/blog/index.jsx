import React, { useEffect, useState } from 'react'
import Header2 from '../../../../components/Header2.jsx'
import {
  Box,
  TextField,
  Typography,
  List,
  useMediaQuery,
  Checkbox,
  FormControlLabel,
  CircularProgress,
} from '@mui/material'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import { tokens } from '../../../../theme.js'
import { useTheme } from '@emotion/react'
import { Link } from 'react-router-dom'
import {
  useGetBlogCollectionsQuery,
  useGetBlogFilterQuery,
  useSearchAndFilterBlogsQuery,
} from '../../../../features/services/blogApiSlice.js'
import BlogCard from '../../components/BlogCard.jsx'
import LargeBlogCard from '../../components/LargeBlogCard'
import Subscribe from '../../components/Subscribe.jsx'

const Blog = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const isNoneMobile = useMediaQuery('(min-width:1024px)')
  const [searchAndFilter, setSearchAndFilter] = useState('')
  const [categoryValue, setCategoryValue] = useState([])
  const [archiveValue, setArchiveValue] = useState([])
  const [tagValue, setTagValue] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [search, setSearch] = useState('')

  const { data: blogs=[], isFetching: isFetchingBlogs } =
    useSearchAndFilterBlogsQuery({ searchAndFilter })
  const { data: collection={}, isFetching: isFetchingCollection } =
    useGetBlogCollectionsQuery()
  const { data: filters={}, isFetching: isFetchingFilters } =
    useGetBlogFilterQuery()
  useEffect(() => {
    let timeOut = setTimeout(() => {
      setSearchValue(search)
    }, 1000)
    return () => clearTimeout(timeOut)
  }, [search])

  const handleCheckFilter = (e, setValue) => {
    setValue((prevValues) => {
      if (e.target.checked) {
        return [...prevValues, e.target.value]
      } else {
        return prevValues.filter((prevValue) => prevValue !== e.target.value)
      }
    })
  }

  const handleSearch = () => {
    let searchAndFilterValue = ''
    if (searchValue !== '') {
      searchAndFilterValue = searchAndFilterValue + `search=${searchValue}&`
    }

    categoryValue.forEach((category) => {
      if (category !== '') {
        searchAndFilterValue = searchAndFilterValue + `category=${category}&`
      }
    })
    archiveValue.forEach((archive) => {
      if (archive !== '') {
        searchAndFilterValue = searchAndFilterValue + `archive=${archive}&`
      }
    })
    tagValue.forEach((tag) => {
      if (tag !== '') {
        searchAndFilterValue = searchAndFilterValue + `tag=${tag}&`
      }
    })

    setSearchAndFilter(searchAndFilterValue)
  }

  useEffect(() => {
    handleSearch()
  }, [archiveValue, categoryValue, searchValue, tagValue])

  return (
    <Box className={`flex flex-col gap-4 md:gap-8 mt-20 md:mt-40`}>
      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        <Header2
          title="Alif Newsroom"
          subtitle="Geeks Newsroom Geeks Newsroom"
        />
      </Box>
      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        <Box className="max-w-lg mx-auto flex justify-between items-center gap-4">
          <Subscribe />
        </Box>
      </Box>
      <Box
        className={`md:container px-2 md:mx-auto md:px-auto flex flex-col-reverse md:flex-row gap-4`}
      >
        <Box className="w-full md:w-3/4 rounded-md px-2">
          {!isFetchingBlogs && blogs?.length ? (
            <LargeBlogCard blog={blogs[0]} />
          ) : undefined}
          {!isFetchingBlogs ? (
            blogs?.length ? (
              <Box className="w-full flex flex-col md:flex-row my-8 gap-8">
                <Box className="w-full flex flex-col gap-8">
                  {blogs?.map(
                    (blog, index) =>
                      index % 2 === 0 &&
                      index !== 0 && (
                        <BlogCard key={`${blog.slug}-${index}`} blog={blog} />
                      )
                  )}
                </Box>
                <Box className="w-full flex flex-col gap-8">
                  {blogs?.map(
                    (blog, index) =>
                      index % 2 === 1 &&
                      index !== 0 && (
                        <BlogCard
                          blog={blog}
                          key={`${blog?.title}-${blog?.slug}`}
                        />
                      )
                  )}
                </Box>
              </Box>
            ) : (
              <Box className="w-full flex mt-[20%] justify-center h-full min-h-40">
                <Typography
                  variant="h4"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  className={`text-lg md:text-xl px-4 text-left`}
                >
                  No Blog Found
                </Typography>
              </Box>
            )
          ) : (
            <Box className="w-full flex mt-[20%] justify-center h-full min-h-40">
              <CircularProgress color="secondary" />
            </Box>
          )}
        </Box>
        <Box className="w-full md:w-1/4 flex flex-col gap-1 md:gap-4">
          <Box
            backgroundColor={colors.primary[400]}
            className=" w-full rounded-md mb-4"
          >
            <TextField
              variant="outlined"
              color="secondary"
              fullWidth
              placeholder="search.."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Box>
          <Accordion
            sx={{ backgroundColor: colors.primary[400] }}
            className="w-full"
            defaultExpanded={isNoneMobile}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography
                variant="h4"
                color={colors.grey[100]}
                fontWeight="bold"
                className={`text-lg md:text-xl px-4 text-left`}
              >
                Pin
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List className={`flex flex-col gap-2`}>
                {!isFetchingCollection &&
                  collection?.pin_blogs?.map((blog) => (
                    <Link key={`blogs-${blog.slug}`} to={`/blogs/${blog.slug}`}>
                      <Typography
                        variant="p"
                        fontWeight="bold"
                        className={`hover:text-green-400 flex justify-between items-center`}
                      >
                        {blog.title}
                        <ArrowRightAltIcon fontSize="large" />
                      </Typography>
                    </Link>
                  ))}
              </List>
            </AccordionDetails>
          </Accordion>
          <Accordion
            sx={{ backgroundColor: colors.primary[400] }}
            className="w-full"
            defaultExpanded={isNoneMobile}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography
                variant="h4"
                color={colors.grey[100]}
                fontWeight="bold"
                className={`text-lg md:text-xl px-4 text-left`}
              >
                Recent Posts
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List className={`flex flex-col gap-2`}>
                {!isFetchingCollection &&
                  collection?.recent_blogs?.map((blog) => (
                    <Link key={`blogs-${blog.slug}`} to={`/blogs/${blog.slug}`}>
                      <Typography
                        variant="p"
                        fontWeight="bold"
                        className={`hover:text-green-400 flex justify-between items-center`}
                      >
                        {blog.title}
                        <ArrowRightAltIcon fontSize="large" />
                      </Typography>
                    </Link>
                  ))}
              </List>
            </AccordionDetails>
          </Accordion>

          <Accordion
            sx={{ backgroundColor: colors.primary[400] }}
            className="w-full"
            defaultExpanded={isNoneMobile}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography
                variant="h4"
                color={colors.grey[100]}
                fontWeight="bold"
                className={`text-lg md:text-xl px-4 text-left`}
              >
                Categories
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List className={``}>
                {!isFetchingFilters &&
                  filters?.categories?.map((category) => (
                    <FormControlLabel
                      key={category.id}
                      value={category.name}
                      name="category"
                      onClick={(e) => handleCheckFilter(e, setCategoryValue)}
                      control={<Checkbox color="secondary" />}
                      label={category.name}
                      labelPlacement="end"
                      className="block ml-4"
                    />
                  ))}
              </List>
            </AccordionDetails>
          </Accordion>
          <Accordion
            sx={{ backgroundColor: colors.primary[400] }}
            className="w-full"
            defaultExpanded={isNoneMobile}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography
                variant="h4"
                color={colors.grey[100]}
                fontWeight="bold"
                className={`text-lg md:text-xl px-4 text-left`}
              >
                Archive
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List className={``}>
                {!isFetchingFilters &&
                  filters?.archives?.map((archive) => (
                    <FormControlLabel
                      key={archive}
                      value={archive}
                      name="archive"
                      onClick={(e) => handleCheckFilter(e, setArchiveValue)}
                      control={<Checkbox color="secondary" />}
                      label={archive}
                      labelPlacement="end"
                      className="block ml-4"
                    />
                  ))}
              </List>
            </AccordionDetails>
          </Accordion>
          <Accordion
            sx={{ backgroundColor: colors.primary[400] }}
            className="w-full"
            defaultExpanded={isNoneMobile}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography
                variant="h4"
                color={colors.grey[100]}
                fontWeight="bold"
                className={`text-lg md:text-xl px-4 text-left`}
              >
                Tags
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List className={``}>
                {!isFetchingFilters &&
                  filters?.tags?.map((tag) => (
                    <FormControlLabel
                      key={tag.id}
                      value={tag.name}
                      name="tag"
                      onClick={(e) => handleCheckFilter(e, setTagValue)}
                      control={<Checkbox color="secondary" />}
                      label={tag.name}
                      labelPlacement="end"
                      className="block ml-4"
                    />
                  ))}
              </List>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Box>
    </Box>
  )
}

export default Blog
