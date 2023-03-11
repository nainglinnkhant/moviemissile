import Image from '../Elements/Image'
import { generateProfile } from '../../helpers/helpers'
import styles from './MovieCast.module.css'

const MovieCastItem = ({ cast }) => {
    return (
        <li className={styles['list-item']}>
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
        </li>
    )
}

export default MovieCastItem