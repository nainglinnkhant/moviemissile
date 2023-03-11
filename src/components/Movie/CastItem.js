import Image from '../Elements/Image'
import { generateProfile } from '../../helpers/helpers'
import styles from './CastItem.module.css'

const CastItem = ({ cast }) => {
     return (
          <div className="col">
               <div className={styles['cast-item']}>
                    <div className={styles['cast-img']}>
                         <Image
                             src={generateProfile(cast.profile_path)}
                             alt={cast.name}
                         />
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