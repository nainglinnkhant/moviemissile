import { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'

const useControl = () => {
     const dispatch = useDispatch()
     const [isLoading, setIsLoading] = useState(false)
     const [error, setError] = useState(null)

     const sendRequest = useCallback(async (dispatchFunc) => {
          setError(null)
          setIsLoading(true)
          try {
               await dispatch(dispatchFunc())
          }
          catch (error) {
               setError(error.message)
          }
          setIsLoading(false)
     }, [dispatch])

     const confirmError = () => {
          setError(null)
     }

     return {
          isLoading,
          error,
          confirmError,
          sendRequest
     }
}

export default useControl