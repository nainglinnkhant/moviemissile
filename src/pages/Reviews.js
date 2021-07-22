import { Fragment, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'

import LoadingSpinner from '../components/UI/LoadingSpinner'
import ReviewItem from '../components/Movie/ReviewItem'
import useControl from '../hooks/use-control'
import { fetchReviews } from '../store/movie-details/movie-details-actions'
import styles from './Reviews.module.css'

const Reviews = () => {
     const params = useParams()
     const location = useLocation()

     const query = new URLSearchParams(location.search)

     const title = query.get('title')
     const year = query.get('year')

     const reviews = useSelector(state => state.movieDetails.reviews)

     const { movieId } = params
     const { length: reviewsLength } = reviews

     const { isLoading, error, sendRequest: loadReviews } = useControl()

     useEffect(() => {
          window.scrollTo(0, 0)

          if(reviewsLength === 0) {
               loadReviews(fetchReviews.bind(null, movieId))
          }
     }, [reviewsLength, loadReviews, movieId])

     return (
          <div className={`container ${styles['reviews-container']}`}>
               {isLoading && <LoadingSpinner />}

               {error && <p className="mt-4 text-center">{error}</p>}

               {!isLoading && !error && (
                    <Fragment>
                         {title && year && (
                              <h5 className="mb-3 mb-sm-4 fw-bold">{`${title} (${year})`} Reviews</h5>
                         )}

                         <div className="row gy-4 row-cols-1 row-cols-lg-2">
                              {reviews.map(review => (
                                   <ReviewItem key={review.id} review={review} />
                              ))}
                         </div>
                    </Fragment>
               )}
          </div>
     )
}

export default Reviews