import { useState } from 'react'

export default function useInput(checkValidity) {
     const [input, setInput] = useState('')
     const [isInputTouched, setIsInputTouched] = useState(false)

     const isInputValid = checkValidity(input)
     const isInputInvalid = !isInputValid && isInputTouched

     const inputChangeHandler = (event) => {
          setInput(event.target.value)
     }

     const inputBlurHandler = () => {
          setIsInputTouched(true)
     }

     return {
          input,
          isInputValid,
          isInputInvalid,
          inputChangeHandler,
          inputBlurHandler
     }
}