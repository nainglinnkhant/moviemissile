import { sendRequest } from '../../helpers/helpers'
import { favouriteActions } from './favourite-slice'

export const fetchFavourites = (userId) => {
     return async (dispatch) => {
          const responseData = await sendRequest(
               `https://moviemissile-a309e-default-rtdb.firebaseio.com/${userId}/favourites.json`,
               null,
               'Failed to fetch your favourite movies!'
          )

          const favourites = []
          for(const key in responseData) {
               favourites.push({ ...responseData[key] })
          }

          dispatch(favouriteActions.setFavourites(favourites))
     }
}

export const addToFavourites = (userId, movie) => {
     return async (dispatch) => {
          await sendRequest(
               `https://moviemissile-a309e-default-rtdb.firebaseio.com/${userId}/favourites/${movie.id}.json`,
               {
                    method: 'PUT',
                    body: JSON.stringify(movie)
               }
          )

          dispatch(favouriteActions.addToFavourites(movie))
     }
}

export const removeFromFavourites = (userId, movieId) => {
     return async (dispatch) => {
          await sendRequest(
               `https://moviemissile-a309e-default-rtdb.firebaseio.com/${userId}/favourites/${movieId}.json`,
               {
                    method: 'DELETE'
               },
               'Failed to connect to server!'
          )

          dispatch(favouriteActions.removeFromFavourites(movieId))
     }
}