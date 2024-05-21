import { useMutation } from '@tanstack/react-query'
import { useSnackbar } from 'notistack'
import useAxiosPrivate from '../useAxiosPrivate'
import { getFormData } from '../../utils/lib'

export const useUpdatePost = () => {
  const axiosPrivate = useAxiosPrivate()
  const { enqueueSnackbar } = useSnackbar()

  return useMutation({
    mutationFn: async data => {
      console.log(data)
      const formData = getFormData(data, 'img')

      return await axiosPrivate.patch('/posts', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
    },

    onError: error => {
      let errMsg = 'Error on post update. Please try again!'
      enqueueSnackbar(errMsg, { variant: 'error' })
    }
  })
}
