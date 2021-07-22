import { Fragment, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { fetchSelectedMovie } from '../store/movie-details/movie-details-actions' 
import useControl from '../hooks/use-control'
import LoadingSpinner from '../components/UI/LoadingSpinner'
import MovieInfo from '../components/Movie/MovieInfo'
import MovieCast from '../components/Movie/MovieCast'
import MovieReviews from '../components/Movie/MovieReviews'
import MovieRecommendations from '../components/Movie/MovieRecommendations'
import styles from './MovieDetails.module.css'

const MovieDetails = () => {
     const params = useParams()

     const { movieId } = params

     const movie = useSelector(state => state.movieDetails.selectedMovie)

     const { isLoading, error, sendRequest: loadSelectedMovie } = useControl()

     useEffect(() => {
          loadSelectedMovie(fetchSelectedMovie.bind(null, movieId))
     }, [loadSelectedMovie, movieId])

     return (
          <div className={`container ${styles['movie-details-container']}`}>
               {isLoading && <LoadingSpinner />}

               {error && <p className="mt-5 text-center">{error}</p>}

               {!isLoading && !error && (
                    <Fragment>
                         <MovieInfo movie={movie} />

                         <MovieCast movie={movie} />

                         <MovieReviews movie={movie} />

                         <MovieRecommendations />
                    </Fragment>
               )}
          </div>
     )
}

export default MovieDetails