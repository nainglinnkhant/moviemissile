import { useSelector } from "react-redux"

import Movie from './Movie'
import styles from './MovieRecommendations.module.css'

const MovieRecommendations = () => {
     const recommendations = useSelector(state => state.movieDetails.recommendations)

     return (
          <div className="row mb-4">
               <h5 className="fw-bold mb-4">Recommendations</h5>

               <ul className={styles.scroller}>
                    {recommendations.map(recommendation => (
                         <li key={recommendation.id}>
                              <Movie
                                   id={recommendation.id}
                                   title={recommendation.title}
                                   release_date={recommendation.release_date}
                                   poster_path={recommendation.poster_path}
                              />
                         </li>
                    ))}
               </ul>
          </div>
     )
}

export default MovieRecommendations