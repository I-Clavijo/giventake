import { useMutation } from '@tanstack/react-query'
import useAxiosPrivate from '../useAxiosPrivate'

const useBumpPost = () => {
  const axiosPrivate = useAxiosPrivate()
  return useMutation({
    mutationFn: async () => {
      return axiosPrivate.post('/posts/bump').then(res => res.data)
    },
    onError: error => {
      let errMsg = 'Error on post update. Please try again!'
      enqueueSnackbar(errMsg, { variant: 'error' })
    }
  })
}

export default useBumpPost
