import { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useRouteMatch } from 'react-router-dom'

import ReviewItem from './ReviewItem'
import styles from './MovieReviews.module.css'

const MovieReviews = (props) => {
     const history = useHistory()
     const match = useRouteMatch()

     const { movie } = props

     const reviews = useSelector(state => state.movieDetails.reviews)

     const featuredReviews = reviews.length > 0 ? reviews.slice(0, 2) : []

     const readAllReviewsHandler = () => {
          const year = movie.release_date.split('-')[0]

          history.push(`${match.url}/reviews?title=${movie.title}&year=${year}`)
     }

     return (
          <Fragment>
               <h5 className="fw-bold mb-3">Reviews</h5>

               {featuredReviews.length === 0 && (
                    <div className="row mb-4 mb-lg-5">
                         <p className="mb-0">No reviews have been written yet.</p>
                    </div>
               )}

               {featuredReviews.length > 0 && (
                    <div className="mb-4 mb-lg-5">
                         <div className="row gx-3 gy-3 row-cols-1 row-cols-lg-2">
                              {featuredReviews.map(featuredReview => (
                                   <ReviewItem key={featuredReview.id} review={featuredReview} />
                              ))}
                         </div>

                         {reviews.length > 2 && (
                              <p
                                   className={`mb-0 mt-4 fw-bold ${styles.btn}`}
                                   onClick={readAllReviewsHandler}
                              >
                                   Read all reviews
                              </p>
                         )}
                    </div>
               )}
          </Fragment>
     )
}

export default MovieReviews