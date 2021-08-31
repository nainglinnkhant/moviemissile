import { sendRequest } from '../../helpers/helpers'
import { watchlistActions } from './watchlist-slice'

const firebaseUrl = process.env.REACT_APP_FIREBASE_URL

export const fetchWatchlist = (userId) => {
     return async (dispatch) => {
          const responseData = await sendRequest(
               `${firebaseUrl}${userId}/watchlist.json`,
               null,
               'Failed to fetch your watchlist!'
          )

          const watchlist = []
          for(const key in responseData) {
               watchlist.push({ ...responseData[key] })
          }

          dispatch(watchlistActions.setWatchlist(watchlist))
     }
}

export const addToWatchlist = (userId, movie) => {
     return async (dispatch) => {
          await sendRequest(
               `${firebaseUrl}${userId}/watchlist/${movie.id}.json`,
               {
                    method: 'PUT',
                    body: JSON.stringify(movie)
               }
          )

          dispatch(watchlistActions.addToWatchlist(movie))
     }
}

export const removeFromWatchlist = (userId, movieId) => {
     return async (dispatch) => {
          await sendRequest(
               `${firebaseUrl}${userId}/watchlist/${movieId}.json`,
               {
                    method: 'DELETE'
               },
               'Failed to connect to server!'
          )

          dispatch(watchlistActions.removeFromWatchlist(movieId))
     }
}