import { sendRequest } from '../../helpers/helpers'
import { moviesActions } from './movies-slice'

const apiKey = '5b9e66d672af4b02f4004c0c212c488f'

export const fetchMovies = (page = 1) => {
     return async (dispatch) => {
          const responseData = await sendRequest(
               `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate`,
               null,
               'Failed to load movies!'
          )

          dispatch(moviesActions.setMovies(responseData))
     }
}