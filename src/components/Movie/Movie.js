import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import Image from '../Elements/Image'
import fallback from '../../assets/poster-fallback.jpg'
import { addToFavourites, removeFromFavourites } from '../../store/favourite/favourite-actions'
import { addToWatchlist, removeFromWatchlist } from '../../store/watchlist/watchlist-actions'
import styles from './Movie.module.css'

const Movie = (props) => {
     const history = useHistory()
     const dispatch = useDispatch()

     const userId = useSelector(state => state.auth.userId)
     const favourites = useSelector(state => state.favourite.favourites)
     const watchlist = useSelector(state => state.watchlist.watchlist)

     const poster = props.poster_path ? `https://image.tmdb.org/t/p/original/${props.poster_path}` : fallback

     const releasedYear = props.release_date?.split('-')[0] || 'unknown'

     const selectMovie = () => {
          history.push(`/movie/${props.id}`)
     }

     const isInWatchlist = watchlist.some(watchlistMovie => watchlistMovie.id === props.id)
     const isFavourite = favourites.some(fav => fav.id === props.id)

     const watchlistButtonCaption = isInWatchlist ? 'Remove from watchlist' : 'Add to watchlist'
     const favouriteButtonCaption = isFavourite ? 'Remove from favourite' : 'Add to favourite'

     const watchlistHandler = () => {
          if(!userId) {
               history.push('/auth')
               return
          }

          if(!isInWatchlist) {
               const movie = { ...props }
               dispatch(addToWatchlist(userId, movie))
          }
          else {
               dispatch(removeFromWatchlist(userId, props.id))
          }
     }

     const favouriteHandler = () => {
          if(!userId) {
               history.push('/auth')
               return
          }

          if(!isFavourite) {
               const movie = { ...props }
               dispatch(addToFavourites(userId, movie))
          }
          else {
               dispatch(removeFromFavourites(userId, props.id))
          }
     }

     return (
          <div className={`col text-center ${styles.movie}`}>
               <div className={`${styles.poster} position-relative d-inline-block`}>
                    <div className={`${styles.dropdown} dropdown`}>
                         <i
                              className="fas fa-ellipsis-h"
                              id="dropdownMenuButton1"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                         ></i>

                         <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                              <li>
                                   <p className="dropdown-item m-0" onClick={watchlistHandler}>
                                        <i className="far fa-bookmark me-1"></i>
                                        {watchlistButtonCaption}
                                   </p>
                              </li>
                              <li>
                                   <p className="dropdown-item m-0" onClick={favouriteHandler}>
                                        <i className="far fa-heart me-1"></i>
                                        {favouriteButtonCaption}
                                   </p>
                              </li>
                         </ul>
                    </div>

                    <div className={styles['image-container']}>
                         <Image
                             src={poster}
                             alt={props.title}
                             onClick={selectMovie}
                         />
                    </div>
               </div>

               <div>
                    <p className="mb-0 fs-6 fw-bold" onClick={selectMovie}>{props.title}</p>
                    <span className="text-black-50">{releasedYear}</span>
               </div>
          </div>
     )
}

export default Movie