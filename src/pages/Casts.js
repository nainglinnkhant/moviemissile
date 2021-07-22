import { Fragment, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'

import { fetchCast } from '../store/movie-details/movie-details-actions'
import useControl from '../hooks/use-control'
import LoadingSpinner from '../components/UI/LoadingSpinner'
import CastItem from '../components/Movie/CastItem'
import styles from './Casts.module.css'

const Casts = () => {
     const params = useParams()
     const location = useLocation()

     const query = new URLSearchParams(location.search)

     const title = query.get('title')
     const year = query.get('year')

     const casts = useSelector(state => state.movieDetails.credits.cast)

     const { movieId } = params
     const { length: castsLength } = casts

     const { isLoading, error, sendRequest: loadCast } = useControl()

     useEffect(() => {
          window.scrollTo(0, 0)

          if(castsLength === 0) {
               loadCast(fetchCast.bind(null, movieId))
          }
     }, [castsLength, loadCast, movieId])

     return (
          <div className={`container ${styles['cast-container']}`}>
               {isLoading && <LoadingSpinner />}

               {error && <p className="mt-4 text-center">{error}</p>}

               {!isLoading && !error && (
                    <Fragment>
                         {title && year && (
                              <h5 className="mb-2 mb-sm-4 fw-bold">{`${title} (${year})`} Cast</h5>
                         )}

                         <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 row-cols-xl-6 gx-3 gy-3 gx-md-4 gy-md-4 gx-xxl-5 gy-xxl-5">
                              {casts.map(cast => (
                                   <CastItem key={cast.id} cast={cast} />
                              ))}
                         </div>
                    </Fragment>
               )}
          </div>
     )
}

export default Casts