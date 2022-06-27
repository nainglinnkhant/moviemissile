import { useEffect } from 'react'
import fallback from '../../assets/fallback-img.jpg'
import { generateProfile } from '../../helpers/helpers'
import styles from './MovieCast.module.css'

const MovieCastItem = ({ cast }) => {
    useEffect(() => {
        const handleImageLoaded = () => image.src = generateProfile(cast.profile_path)

        const image = document.getElementById(cast.id)
        image.addEventListener('load', handleImageLoaded)

        return () => image.removeEventListener('load', handleImageLoaded)
    }, [cast])
    
    return (
        <li key={cast.id} className={styles['list-item']}>
            <div className={styles['cast-img']}>
                <img id={cast.id} src={fallback} alt={cast.name} />

                {/* <object data={generateProfile(cast.profile_path)} type="image/jpg">
                    <img src={fallback} alt={cast.name} />
                </object> */}
            </div>

            <div className="py-2 px-2">
                <p className="mb-0 fw-bold">{cast.name}</p>
                <p className="mb-0">{cast.character}</p>
            </div>
        </li>
    )
}

export default MovieCastItem