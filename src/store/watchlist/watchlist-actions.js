import { sendRequest } from '../../helpers/helpers'
import { watchlistActions } from './watchlist-slice'

export const fetchWatchlist = (userId) => {
     return async (dispatch) => {
          const responseData = await sendRequest(
               `https://moviemissile-a309e-default-rtdb.firebaseio.com/${userId}/watchlist.json`,
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
               `https://moviemissile-a309e-default-rtdb.firebaseio.com/${userId}/watchlist/${movie.id}.json`,
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
               `https://moviemissile-a309e-default-rtdb.firebaseio.com/${userId}/watchlist/${movieId}.json`,
               {
                    method: 'DELETE'
               },
               'Failed to connect to server!'
          )

          dispatch(watchlistActions.removeFromWatchlist(movieId))
     }
}