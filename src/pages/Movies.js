import { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useRouteMatch } from 'react-router-dom'

import Movie from '../components/Movie/Movie'
import LoadingSpinner from '../components/UI/LoadingSpinner'
import Pagination from '../components/UI/Pagination'
import { fetchMovies } from '../store/movies/movies-actions'
import { moviesActions } from '../store/movies/movies-slice'
import useControl from '../hooks/use-control'
import { searchActions } from '../store/search/search-slice'
import { searchMovies } from '../store/search/search-actions'
import styles from './Movies.module.css'

const Movies = () => {
     const dispatch = useDispatch()
     const match = useRouteMatch()
     const location = useLocation()

     const query = new URLSearchParams(location.search)
     const searchWord = query.get('query')
     
     const route = match.url.slice(1)

     const movieObj = useSelector(state => state[route].movies)
     const currentPage = useSelector(state => state[route].currentPage)

     const { results: movies, total_results: totalResults } = movieObj

     const { isLoading, error, sendRequest: loadMovies } = useControl()

     const setPage = (page) => {
          if(route === 'movies') {
               dispatch(moviesActions.setCurrentPage(page))
          } else {
               dispatch(searchActions.setCurrentPage(page))
          }
     }

     useEffect(() => {
          if(route === 'movies') {
               loadMovies(fetchMovies.bind(null, currentPage))
          } else {
               loadMovies(searchMovies.bind(null, currentPage, searchWord))
          }
     }, [loadMovies, currentPage, route, searchWord])

     return (
          <Fragment>
               <div className={`container ${styles['movies-container']}`}>
                    {isLoading && <LoadingSpinner /> }

                    {error && <p className="mt-5 text-center">{error}</p>}

                    {!isLoading && !error && movies.length === 0 && (
                         <p className="mt-5 text-center">No movies found.</p>
                    )}

                    {!isLoading && !error && (
                         <Fragment>
                              <div className="row gx-3 gx-sm-5 gy-4 gy-md-5 mt-2 mb-5 row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5">
                                   {movies.map(movie => (
                                        <Movie
                                             key={movie.id}
                                             id={movie.id}
                                             title={movie.title}
                                             release_date={movie.release_date}
                                             poster_path={movie.poster_path}
                                        />
                                   ))}
                              </div>

                              {totalResults > 20 && (
                                   <Pagination
                                        className={styles.pagination}
                                        onPageChange={setPage}
                                        totalCount={totalResults}
                                        currentPage={currentPage}
                                        pageSize={20}
                                   />
                              )}
                         </Fragment>
                    )}
               </div>
               
               {!isLoading && !error && (
                    <footer>
                         The movie data are provided by
                         <a href="https://www.themoviedb.org/"> The Movie DB</a>
                    </footer>
               )}
          </Fragment>
     )
}

export default Movies