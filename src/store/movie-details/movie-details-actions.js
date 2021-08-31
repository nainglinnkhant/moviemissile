import { sendRequest } from '../../helpers/helpers'
import { movieDetailsActions } from './movie-details-slice'

const apiKey = process.env.REACT_APP_API_KEY

export const fetchSelectedMovie = (movieId) => {
     return async (dispatch) => {
          const results = await Promise.all([
               sendRequest(
                    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`,
                    null,
                    'Failed to load movie!'
               ),
               sendRequest(
                    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}&language=en-US`,
                    null,
                    'Failed to load casts!'
               ),
               sendRequest(
                    `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${apiKey}&language=en-US&page=1`,
                    null,
                    'Failed to load reviews!'
               ),
               sendRequest(
                    `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${apiKey}&language=en-US&page=1`,
                    null,
                    'Failed to load similar movies!'
               )
          ]);

          dispatch(movieDetailsActions.setSelectedMovie(results[0]))
          dispatch(movieDetailsActions.setCredits(results[1]))
          dispatch(movieDetailsActions.setReviews(results[2].results))
          dispatch(movieDetailsActions.setRecommendations(results[3].results))
     }
}

export const fetchCast = (movieId) => {
     return async (dispatch) => {
          const responseData = await sendRequest(
               `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}&language=en-US`,
               null,
               'Failed to load casts!'
          )
     
          dispatch(movieDetailsActions.setCredits(responseData))
     }
}

export const fetchReviews = (movieId) => {
     return async (dispatch) => {
          const responseData = await sendRequest(
               `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${apiKey}&language=en-US&page=1`,
               null,
               'Failed to load reviews!'
          )

          dispatch(movieDetailsActions.setReviews(responseData.results))
     }
}