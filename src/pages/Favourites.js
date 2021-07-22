import { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Movie from '../components/Movie/Movie'
import LoadingSpinner from '../components/UI/LoadingSpinner'
import Pagination from '../components/UI/Pagination'
import useControl from '../hooks/use-control'
import { fetchFavourites } from '../store/favourite/favourite-actions'
import { favouriteActions } from '../store/favourite/favourite-slice'
import { generateMoviesPerPage } from '../helpers/helpers'
import styles from './Favourites.module.css'

const Favourites = () => {
     const dispatch = useDispatch()

     const userId = useSelector(state => state.auth.userId)
     const favourites = useSelector(state => state.favourite.favourites)
     const currentPage = useSelector(state => state.favourite.currentPage)

     const { isLoading, error, sendRequest: loadFavourites } = useControl()

     const { length: favouritesLength } = favourites

     useEffect(() => {
          if(favouritesLength === 0) {
               loadFavourites(fetchFavourites.bind(null, userId))
          }
     }, [loadFavourites, favouritesLength, userId])

     if(favouritesLength > 0) {
          const curPage = favouritesLength <= (currentPage - 1) * 20 ? currentPage - 1 : currentPage
          dispatch(favouriteActions.setCurrentPage(curPage))
     }

     const pageMovies = generateMoviesPerPage(currentPage, favourites)

     const setPage = (page) => {
          dispatch(favouriteActions.setCurrentPage(page))
     }

     return (
          <div className={`container ${styles['favourites-container']}`}>
               {isLoading && <LoadingSpinner /> }

               {error && <p className="mt-5 text-center">{error}</p>}

               {!isLoading && !error && <h5 className="fw-bold">My Favourites</h5>}

               {!isLoading && !error && favourites.length === 0 && (
                    <p className={styles.message}>No favourite movies found.</p>
               )}

               {!isLoading && !error && favourites.length !== 0 && (
                    <Fragment>
                         <div className="row gx-3 gx-sm-5 gy-4 gy-md-5 mt-2 mb-5 row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5">
                              {pageMovies.map(movie => (
                                   <Movie
                                        key={movie.id}
                                        id={movie.id}
                                        title={movie.title}
                                        release_date={movie.release_date}
                                        poster_path={movie.poster_path}
                                   />
                              ))}
                         </div>

                         {favouritesLength > 20 && (
                              <Pagination
                                   className={styles.pagination}
                                   onPageChange={setPage}
                                   totalCount={favourites.length}
                                   currentPage={currentPage}
                                   pageSize={20}
                              />
                         )}
                    </Fragment>
               )}
          </div>
     )
}

export default Favourites