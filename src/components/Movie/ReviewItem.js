import { useState } from 'react'

import fallback from '../../assets/fallback-img.png'
import styles from './ReviewItem.module.css'

const ReviewItem = (props) => {
     const { review } = props

     const generateAvatarPath = (authorDetails) => {
          if(authorDetails.avatar_path) {
               return authorDetails.avatar_path.includes('http')
                    ? authorDetails.avatar_path.slice(1) 
                    : `https://image.tmdb.org/t/p/original/${authorDetails.avatar_path}`
          }
          else {
               return fallback
          }
     }

     const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

     const generateDate = (createdAt) => {
          const dateObj = new Date(createdAt)
          return `${months[dateObj.getMonth()]} ${dateObj.getDate()}, ${dateObj.getFullYear()}`
     }

     const generateRating = (authorDetails) => {
          if(authorDetails.rating) {
               return authorDetails.rating.toString().includes('.') 
                    ? authorDetails.rating
                    : `${authorDetails.rating}.0`
          }
          else {
               return null
          }
     }

     const [showFullContent, setShowFullContent] = useState(false)

     const content = showFullContent
          ? review.content
          : `${review.content?.slice(0, 400)}${review.content.length > 400 ? '...' : ''}`

     const toggleContentHandler = () => {
          setShowFullContent((prevState) => !prevState)
     }

     const toggleBtnCaption = showFullContent ? 'Read less' : 'Read more' 

     return (
          <div className="col">
               <div className={styles.card}>
                    <div className="d-flex align-items-center">
                         <img
                              src={generateAvatarPath(review.author_details)}
                              alt="Reviewer Avatar"
                         />

                         <div className="d-inline-block ms-3">
                              <p className="mb-0">
                                   Reviewed by
                                   <span className="ms-2 fw-bold">{review.author}</span>
                                   {generateRating(review.author_details) && (
                                        <span className={`ms-2 ${styles.rating}`}>
                                             <i className="fas fa-star me-1 text-warning"></i>
                                             {generateRating(review.author_details)}
                                        </span>
                                   )}
                              </p>

                              <p className={`mb-0 text-black-50 ${styles.date}`}>
                                   {generateDate(review.created_at)}
                              </p>
                         </div>
                    </div>

                    <p className={`mt-3 mb-0 ${styles['review-content']}`}>
                         {content}
                         {review.content.length > 400 && (
                              <span 
                                   className={`ms-2 ${styles['btn-more']}`}
                                   onClick={toggleContentHandler}
                              >
                                   {toggleBtnCaption}
                              </span>
                         )}
                    </p>
               </div>
          </div>
     )
}

export default ReviewItem