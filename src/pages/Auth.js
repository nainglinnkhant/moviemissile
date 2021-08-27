import { Fragment, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Dialog from '../components/UI/Dialog'
import useInput from '../hooks/use-input'
import { validateEmail } from '../helpers/helpers'
import useControl from '../hooks/use-control'
import { authenticate } from '../store/auth/auth-actions'
import styles from './Auth.module.css'

const Auth = () => {
     const history = useHistory()

     const {
          input: username,
          isInputValid: isUsernameValid,
          isInputInvalid: isUsernameInvalid,
          inputChangeHandler: usernameChangeHandler,
          inputBlurHandler: usernameBlurHandler
     } = useInput(input => input.trim().length >= 3)

     const {
          input: email,
          isInputValid: isEmailValid,
          isInputInvalid: isEmailInvalid,
          inputChangeHandler: emailChangeHandler,
          inputBlurHandler: emailBlurHandler
     } = useInput(input => validateEmail(input))

     const {
          input: password,
          isInputValid: isPasswordValid,
          isInputInvalid: isPasswordInvalid,
          inputChangeHandler: passwordChangeHandler,
          inputBlurHandler: passwordBlurHandler
     } = useInput(input => input.trim().length > 5)

     const {
          input: confirmPassword,
          isInputValid: isConfirmPasswordValid,
          isInputInvalid: isConfirmPasswordInvalid,
          inputChangeHandler: confirmPasswordChangeHandler,
          inputBlurHandler: confirmPasswordBlurHandler
     } = useInput(input => input.trim() === password)

     const [authMode, setAuthMode] = useState('Login')

     const title = authMode === 'Login' ? 'Login to your account' : 'Sign up for an account'

     const message = authMode === 'Login' ? 'Logging in...' : 'Signing up...'
     
     const loginValidity = isEmailValid && isPasswordValid
     
     const signupValidity = isUsernameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid

     const isFormValid = authMode === 'Login' ? loginValidity : signupValidity

     const switchAuthMode = () => {
          setAuthMode(prevMode => prevMode === 'Login' ? 'Sign Up' : 'Login')
     }

     const usernameClasses = `mt-2 mt-sm-3 ${isUsernameInvalid ? styles.invalid : ''}`
     const emailClasses = `mt-2 mt-sm-3  ${isEmailInvalid ? styles.invalid : ''}`
     const passwordClasses = `mt-2 mt-sm-3 ${isPasswordInvalid ? styles.invalid : ''}`
     const confirmPasswordClasses = `mt-2 mt-sm-3 ${isConfirmPasswordInvalid ? styles.invalid : ''}`

     const { isLoading, error, sendRequest: sendAuthRequest, confirmError } = useControl()

     const userId = useSelector(state => state.auth.userId)
     const uname = useSelector(state => state.auth.username)

     useEffect(() => {
          if(userId && uname) {
               history.replace('/movies')
          }
     }, [history, userId, uname])

     const submitHandler = (event) => {
          event.preventDefault()

          sendAuthRequest(authenticate.bind(null, username, email, password, authMode))
     }

     const closeHandler = () => {
          confirmError()
     }

     return (
          <Fragment>
               {isLoading && <Dialog message={message} fixed />}

               {error && <Dialog message={error} fixed={false} onClose={closeHandler} />}

               <div className={`container ${styles['auth-container']}`}>
                    <div className="col-md-6 offset-md-3">
                         <h5 className="fw-bold">{title}</h5>

                         <form onSubmit={submitHandler} className={styles.form}>
                              {authMode === 'Sign Up' && (
                                   <div className={usernameClasses}>
                                        <label htmlFor="username">Username</label>
                                        <input
                                             type="text"
                                             id="username"
                                             className="form-control"
                                             value={username}
                                             onChange={usernameChangeHandler}
                                             onBlur={usernameBlurHandler}
                                        />
                                        {isUsernameInvalid && (
                                             <p className={styles['error-message']}>
                                                  Please enter a valid username. (at least 3 characters).
                                             </p>
                                        )}
                                   </div>
                              )}

                              <div className={emailClasses}>
                                   <label htmlFor="email">Email</label>
                                   <input
                                        type="email"
                                        id="email"
                                        className="form-control"
                                        value={email}
                                        onChange={emailChangeHandler}
                                        onBlur={emailBlurHandler}
                                   />
                                   {isEmailInvalid && (
                                        <p className={styles['error-message']}>
                                             Please enter a valid email.
                                        </p>
                                   )}
                              </div>

                              <div className={passwordClasses}>
                                   <label htmlFor="password">Password</label>
                                   <input
                                        type="password"
                                        id="password"
                                        className="form-control"
                                        value={password}
                                        onChange={passwordChangeHandler}
                                        onBlur={passwordBlurHandler}
                                   />
                                   {isPasswordInvalid && (
                                        <p className={styles['error-message']}>
                                             Please enter a valid password. (at least 6 characters).
                                        </p>
                                   )}
                              </div>

                              {authMode === 'Sign Up' && (
                                   <div className={confirmPasswordClasses}>
                                        <label htmlFor="confirmPassword">Confirm Password</label>
                                        <input
                                             type="password"
                                             id="confirmPassword"
                                             className="form-control"
                                             value={confirmPassword}
                                             onChange={confirmPasswordChangeHandler}
                                             onBlur={confirmPasswordBlurHandler}
                                        />
                                        {isConfirmPasswordInvalid && (
                                             <p className={styles['error-message']}>
                                                  Passwords don't match.
                                             </p>
                                        )}
                                   </div>
                              )}

                              <button disabled={!isFormValid}>{authMode}</button>
                         </form>

                         <p className={styles['auth-switch']}>
                              {authMode === 'Login' ? `Don't have an account?` : `Already have an account?`}

                              <span onClick={switchAuthMode} className="ms-1">
                                   {authMode === 'Login' ? 'Sign Up' : 'Login'}
                              </span>
                         </p>
                    </div>
               </div>
          </Fragment>
     )
}

export default Auth