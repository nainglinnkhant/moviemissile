import { authActions } from './auth-slice'
import { sendRequest } from '../../helpers/helpers'
import { fetchFavourites } from '../favourite/favourite-actions'
import { fetchWatchlist } from '../watchlist/watchlist-actions'

const apiKey = 'AIzaSyDiOA8eSYn4FOQU8XLE1x6BlOFUKy7fWIo'

export const authenticate = (username, email, password, authMode) => {
     return async (dispatch) => {
          let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`

          if(authMode === 'Sign Up') {
               url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`
          }

          const errorMsg = authMode === 'Login' 
               ? 'Please enter the correct email and password.' 
               : 'This email is already registered.'

          const responseData = await sendRequest(
               url,
               {
                    method: 'POST',
                    headers: {
                         'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                         email: email,
                         password: password,
                         returnSecureToken: true
                    })
               },
               errorMsg
          )
          
          if(authMode === 'Sign Up') {
               await sendRequest(
                    `https://moviemissile-a309e-default-rtdb.firebaseio.com/${responseData.localId}.json`,
                    {
                         method: 'PUT',
                         body: JSON.stringify({
                              username: username
                         })
                    },
                    'Failed to connect to server.'
               )
          }

          let fetchedUsername;

          if(authMode === 'Login') {
               fetchedUsername = await sendRequest(
                    `https://moviemissile-a309e-default-rtdb.firebaseio.com/${responseData.localId}/username.json`,
                    null,
                    'Failed to connect to server.'
               )
          }

          localStorage.setItem('userId', responseData.localId)
          localStorage.setItem('username', username || fetchedUsername)
          
          dispatch(authActions.authenticate(responseData.localId))
          dispatch(authActions.setUsername(username || fetchedUsername))
          dispatch(fetchFavourites(responseData.localId))
          dispatch(fetchWatchlist(responseData.localId))
     }
}