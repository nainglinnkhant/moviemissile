import { generateProfile } from '../../helpers/helpers'
import fallback from '../../assets/fallback-img.jpg'
import styles from './CastItem.module.css'

const CastItem = (props) => {
     const { cast } = props

     return (
          <div className="col">
               <div className={styles['cast-item']}>
                    <div className={styles['cast-img']}>
                         <object data={generateProfile(cast.profile_path)} type="image/jpg">
                              <img src={fallback} alt={cast.name} />
                         </object>
                    </div>

                    <div className="py-2 px-2">
                         <p className="mb-0 fw-bold">{cast.name}</p>
                         <p className="mb-0">{cast.character}</p>
                    </div>
               </div>
          </div>
     )
}

export default CastItem