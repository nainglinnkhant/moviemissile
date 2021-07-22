import { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Movie from '../components/Movie/Movie'
import LoadingSpinner from '../components/UI/LoadingSpinner'
import Pagination from '../components/UI/Pagination'
import useControl from '../hooks/use-control'
import { fetchWatchlist } from '../store/watchlist/watchlist-actions'
import { watchlistActions } from '../store/watchlist/watchlist-slice'
import { generateMoviesPerPage } from '../helpers/helpers'
import styles from './Watchlist.module.css'

const Watchlist = () => {
     const dispatch = useDispatch()

     const userId = useSelector(state => state.auth.userId)
     const watchlist = useSelector(state => state.watchlist.watchlist)
     const currentPage = useSelector(state => state.watchlist.currentPage)

     const { isLoading, error, sendRequest: loadWatchlist } = useControl()

     const { length: watchlistLength } = watchlist

     useEffect(() => {
          if(watchlistLength === 0) {
               loadWatchlist(fetchWatchlist.bind(null, userId))
          }
     }, [loadWatchlist, watchlistLength, userId])

     if(watchlistLength > 0) {
          const curPage = watchlistLength <= (currentPage - 1) * 20 ? currentPage - 1 : currentPage
          dispatch(watchlistActions.setCurrentPage(curPage))
     }

     const pageMovies = generateMoviesPerPage(currentPage, watchlist)

     const setPage = (page) => {
          dispatch(watchlistActions.setCurrentPage(page))
     }

     return (
          <div className={`container ${styles['watchlist-container']}`}>
               {isLoading && <LoadingSpinner /> }

               {error && <p className="mt-5 text-center">{error}</p>}

               {!isLoading && !error && <h5 className="fw-bold">My Watchlist</h5>}

               {!isLoading && !error && watchlist.length === 0 && (
                    <p className={styles.message}>No movie is added to the watchlist yet.</p>
               )}

               {!isLoading && !error && watchlist.length !== 0 && (
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

                         {watchlistLength > 20 && (
                              <Pagination
                                   className={styles.pagination}
                                   onPageChange={setPage}
                                   totalCount={watchlist.length}
                                   currentPage={currentPage}
                                   pageSize={20}
                              />
                         )}
                    </Fragment>
               )}
          </div>
     )
}

export default Watchlist