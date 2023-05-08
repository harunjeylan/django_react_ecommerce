import {
  Box,
  CircularProgress,
  IconButton,
  TextField,
  useTheme,
} from '@mui/material'
import { Accordion, Breadcrumbs, Button } from '@mui/material'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useNavigate } from 'react-router-dom'
import { tokens } from '../../../../theme'
import Header from '../../../../components/Header'
import { useEffect, useRef, useState } from 'react'
import { useSnackbar } from 'notistack'
import useAlert from '../../../../components/ui/useAlert'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import {
  useAddFaqMutation,
  useGetAllFaqQuery,
  useDeleteFaqMutation,
} from '../../../../features/services/faqApiSlice'
import { useUpdateFaqMutation } from '../../../../features/services/faqApiSlice'

const AdminFAQ = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const navigate = useNavigate()
  const [editingFAQ, setEditingFAQ] = useState(undefined)
  const questionInputRef = useRef()
  const answerInputRef = useRef()
  const { enqueueSnackbar } = useSnackbar()
  const [CustomAlert, setMessages] = useAlert()
  const [addFaq] = useAddFaqMutation()
  const [updateFaq] = useUpdateFaqMutation()
  const [deleteFaq] = useDeleteFaqMutation()
  const { data: FaQs = [], isFetching: isFetchingFaq } = useGetAllFaqQuery()
  useEffect(() => {
    questionInputRef.current.value = editingFAQ?.question || ''
    answerInputRef.current.value = editingFAQ?.answer || ''
  }, [editingFAQ])
  const handelDelete = ({ id }) => {
    deleteFaq({
      post: { id },
    }).then((data) => {
      if (!data?.error?.data) {
        questionInputRef.current.value = ''
        answerInputRef.current.value = ''
        setEditingFAQ(undefined)
        enqueueSnackbar(`FQA is Deleted successfully!`, {
          variant: 'success',
        })
      }
    })
  }
  const handleSubmit = () => {
    if (editingFAQ?.id) {
      updateFaq({
        post: {
          id: editingFAQ?.id,
          question: questionInputRef.current.value,
          answer: answerInputRef.current.value,
        },
      }).then((data) => {
        if (data?.error?.data) {
          Object.keys(data.error.data).forEach((key) => {
            setMessages((prev) => [
              ...prev,
              {
                id: key,
                variant: 'error',
                description: data.error.data[key],
              },
            ])
          })
        } else {
          questionInputRef.current.value = ''
          answerInputRef.current.value = ''
          setEditingFAQ(undefined)
          enqueueSnackbar(`FQA is Updated successfully!`, {
            variant: 'success',
          })
        }
      })
    } else {
      addFaq({
        post: {
          question: questionInputRef.current.value,
          answer: answerInputRef.current.value,
        },
      }).then((data) => {
        if (data?.error?.data) {
          Object.keys(data.error.data).forEach((key) => {
            setMessages((prev) => [
              ...prev,
              {
                id: key,
                variant: 'error',
                description: data.error.data[key],
              },
            ])
          })
        } else {
          questionInputRef.current.value = ''
          answerInputRef.current.value = ''
          setEditingFAQ(undefined)
          enqueueSnackbar(`FQA is Created successfully!`, {
            variant: 'success',
          })
        }
      })
    }
  }
  return (
    <Box className={`flex flex-col gap-4 md:gap-8 md:mt-20 mb-10`}>
      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        <Breadcrumbs aria-label="breadcrumb">
          <Button
            onClick={() => navigate(`/`)}
            variant="text"
            color="secondary"
          >
            Admin Dashboard
          </Button>
          <Typography color="text.primary">New Product</Typography>
        </Breadcrumbs>
      </Box>
      <Box className={`md:container px-2 md:mx-auto md:px-auto`}>
        <Header title="AdminFAQ" subtitle="Frequently Asked Questions Page" />
      </Box>
      <Box
        className={`md:container px-2 md:mx-auto md:px-auto flex flex-col-reverse  md:flex-row  gap-8`}
      >
        <Box className={`w-full `}>
          {!isFetchingFaq ? (
            FaQs.length ? (
              FaQs.map((faq) => (
                <Accordion
                  key={faq.id}
                  defaultExpanded
                  sx={{ backgroundColor: colors.primary[400] }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Box className="w-full flex justify-between items-center">
                      <Typography color={colors.greenAccent[500]} variant="h5">
                        {faq.question}
                      </Typography>
                      <Box className="w-fit flex justify-around gap-2">
                        <IconButton onClick={() => setEditingFAQ(faq)}>
                          <EditOutlinedIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => handelDelete(faq)}
                        >
                          <DeleteOutlineOutlinedIcon />
                        </IconButton>
                      </Box>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>{faq.answer}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))
            ) : (
              <Box className="w-full flex items-center justify-center h-full min-h-40">
                <Typography>No data</Typography>
              </Box>
            )
          ) : (
            <Box className="h-full w-full flex justify-center items-center">
              <CircularProgress />
            </Box>
          )}
        </Box>
        <Box className={`min-w-[30%]`}>
          <Box
            backgroundColor={colors.primary[400]}
            className={`w-full h-fit flex flex-col gap-4 p-2 rounded-md`}
          >
            <CustomAlert />
            <Typography
              variant="h1"
              color={colors.grey[100]}
              fontWeight="bold"
              className={`text-xl md:text-2xl  text-left mb-2 py-1`}
            >
              Add New FQA
            </Typography>
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Question"
              inputRef={questionInputRef}
              className={`col-span-1`}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Answer"
              inputRef={answerInputRef}
              className={`col-span-2`}
              multiline
              minRows={3}
            />
            <Box>
              <Button
                onClick={handleSubmit}
                variant="outlined"
                color="secondary"
                className={`bg-opacity-0 hover:bg-opacity-100 px-[40px] py-2 ${
                  'hover:bg-' + colors.greenAccent[400]
                }`}
              >
                Save
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default AdminFAQ
