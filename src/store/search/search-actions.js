import { sendRequest } from '../../helpers/helpers'
import { searchActions } from './search-slice'

const apiKey = process.env.REACT_APP_API_KEY

export const searchMovies = (page = 1, query) => {
     return async (dispatch) => {
          const responseData = await sendRequest(
               `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&page=${page}&query=${query}&include_adult=false`,
               null,
               'Failed to search movies!'
          )

          dispatch(searchActions.setSearchedMovies(responseData))
     }
}