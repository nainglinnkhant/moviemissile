import { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import SecondarySpinner from '../UI/SecondarySpinner'
import { formatNumber } from '../../helpers/helpers'
import useControl from '../../hooks/use-control'
import { addToWatchlist, removeFromWatchlist } from '../../store/watchlist/watchlist-actions'
import { addToFavourites, removeFromFavourites } from '../../store/favourite/favourite-actions'
import fallback from '../../assets/poster-fallback.jpg'
import styles from './MovieInfo.module.css'

const MovieInfo = (props) => {
     const { movie } = props

     const history = useHistory()

     const userId = useSelector(state => state.auth.userId)
     const favourites = useSelector(state => state.favourite.favourites)
     const watchlist = useSelector(state => state.watchlist.watchlist)

     const genres = movie.genres?.map(genre => genre.name).join(', ')

     const poster = movie.poster_path ? `https://image.tmdb.org/t/p/original/${movie.poster_path}` : fallback

     const releasedYear = movie.release_date?.split('-')[0]

     const isInWatchlist = watchlist.some(watchlistMovie => watchlistMovie.id === movie.id)
     const isFavourite = favourites.some(fav => fav.id === movie.id)

     const watchlistButtonCaption = isInWatchlist ? 'Remove from watchlist' : 'Add to watchlist'
     const favouriteButtonCaption = isFavourite ? 'Remove from favourite' : 'Mark as favourite'

     const { 
          isLoading: watchlistIsLoading,
          sendRequest: sendWatchlistRequest 
     } = useControl()

     const { 
          isLoading: favouriteIsLoading,
          sendRequest: sendFavouriteRequest 
     } = useControl()

     const watchlistHandler = () => {
          if(!userId) {
               history.push('/watchlist')
               return
          }

          if(!isInWatchlist) {
               const newMovie = {
                    id: movie.id,
                    title: movie.title,
                    release_date: movie.release_date,
                    poster_path: movie.poster_path
               }
               sendWatchlistRequest(addToWatchlist.bind(null, userId, newMovie))
          }
          else {
               sendWatchlistRequest(removeFromWatchlist.bind(null, userId, movie.id))
          }
     }

     const favouriteHandler = () => {
          if(!userId) {
               history.push('/auth')
               return
          }

          if(!isFavourite) {
               const newMovie = {
                    id: movie.id,
                    title: movie.title,
                    release_date: movie.release_date,
                    poster_path: movie.poster_path
               }
               sendFavouriteRequest(addToFavourites.bind(null, userId, newMovie))
          }
          else {
               sendFavouriteRequest(removeFromFavourites.bind(null, userId, movie.id))
          }
     }

     return (
          <Fragment>
               <div className={`row mt-4 ${styles['movie-info']}`}>
                    <div className={`col-4 col-md-3 ${styles.poster}`}>
                         <img src={poster} className="img-fluid" alt={movie.title} />
                    </div>

                    <div className="col-8 col-md-9 mt-0 mt-md-2 mt-xl-4">
                         <h4 className="fw-bold mb-3">{movie.title}</h4>

                         <p className="mb-2">{releasedYear}</p>

                         <p className="mb-2">{genres}</p>

                         <p className="mb-2">
                              <i className="fas fa-star me-1 text-warning"></i>
                              User Score - {movie.vote_average}/10
                              ({formatNumber(movie.vote_count)})
                         </p>

                         <button 
                              className={`btn me-3 d-block d-lg-inline-block ${styles['btn-bookmark']}`}
                              onClick={watchlistHandler}
                         >
                              {watchlistIsLoading && <SecondarySpinner />}

                              {!watchlistIsLoading && (
                                   <Fragment>
                                        <i className="far fa-bookmark me-1"></i>
                                        <span>{watchlistButtonCaption}</span>
                                   </Fragment>
                              )}
                         </button>

                         <button 
                              className={`btn d-block d-lg-inline-block ${styles['btn-favourite']}`} 
                              onClick={favouriteHandler}
                         >
                              {favouriteIsLoading && <SecondarySpinner />}

                              {!favouriteIsLoading && (
                                   <Fragment>
                                        <i className="far fa-heart me-1"></i>
                                        <span>{favouriteButtonCaption}</span>
                                   </Fragment>
                              )}
                         </button>

                         <div className="mt-2 mt-lg-3 d-none d-lg-block">
                              <h5 className="mb-2 fw-bold me-1">Overview</h5>
                              <p>{movie.overview}</p>
                         </div>
                    </div>
               </div>

               <div className="row mt-3 d-block d-lg-none">
                    <h5 className="fw-bold mb-2">Overview</h5>
                    <p>{movie.overview}</p>
               </div>
          </Fragment>
     )
}

export default MovieInfo