import { useSelector } from 'react-redux'
import { useHistory, useRouteMatch } from 'react-router-dom'

import { formatNumber, generateProfile } from '../../helpers/helpers'
import styles from './MovieCast.module.css'
import MovieCastItem from './MovieCastItem'

const Casts = (props) => {
     const history = useHistory()
     const match = useRouteMatch()

     const casts = useSelector(state => state.movieDetails.credits.cast)
     const crews = useSelector(state => state.movieDetails.credits.crew)

     const { movie } = props

     const directors = crews?.filter(crew => crew.job === 'Director')

     const budget = movie.budget === 0 ? '-' : '$' + formatNumber(movie.budget)

     const revenue = movie.revenue === 0 ? '-' : '$' + formatNumber(movie.revenue)

     const viewAllCastHandler = () => {
          const year = movie.release_date.split('-')[0]

          history.push(`${match.url}/cast?title=${movie.title}&year=${year}`)
     }

     return (
          <div className="row my-4 my-lg-5">
               <div className="col-12 col-md-8 col-lg-9">
                    <h5 className="fw-bold mb-3">Cast</h5>
                    <ul className={styles.scroller}>
                         {casts.slice(0, 9).map(cast => (
                              <MovieCastItem cast={cast} />
                         ))}

                         {casts.length > 9 && (
                              <li>
                                   <p
                                        className={`mb-0 fw-bold text-center ${styles['btn-view-all']}`}
                                        onClick={viewAllCastHandler}
                                   >
                                        View All
                                        <i className="ms-2 fas fa-arrow-right"></i>
                                   </p>
                              </li>
                         )}
                    </ul>
               </div>
               
               <div className="col-12 col-md-4 col-lg-3 mb-2">
                    <div className="mt-4 mb-4">
                         <p className="fw-bold mb-2">Director(s)</p>

                         {directors?.map(director => (
                              <div className={`${styles.director} ms-2 ms-md-0`} key={director.id}>
                                   <img 
                                        src={generateProfile(director.profile_path)}
                                        className="img-fluid"
                                        alt="Director Profile"
                                   />
                                   <span className="ms-3">{director.name}</span>
                              </div>
                         ))}
                    </div>

                    <div className="row mt-3">
                         <div className="col-4">
                              <span className="fw-bold">Status</span>
                         </div>
                         <div className="col-8">
                              <span>{movie.status}</span>
                         </div>
                    </div>

                    <div className="row mt-3">
                         <div className="col-4">
                              <span className="fw-bold">Budget</span>
                         </div>
                         <div className="col-8">
                              <span className={styles.number}>{budget}</span>
                         </div>
                    </div>

                    <div className="row mt-3">
                         <div className="col-4">
                              <span className="fw-bold">Revenue</span>
                         </div>
                         <div className="col-8">
                              <span className={styles.number}>{revenue}</span>
                         </div>
                    </div>
               </div>
          </div>
     )
}

export default Casts