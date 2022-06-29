import { useEffect, useState } from 'react'
import { generateProfile } from '../../helpers/helpers'
import fallback from '../../assets/fallback-img.jpg'
import styles from './CastItem.module.css'

const CastItem = ({ cast }) => {
     const [image, setImage] = useState(fallback)

     useEffect(() => {
        const handleImageLoaded = () => setImage(generateProfile(cast.profile_path))

         const image = document.getElementById(cast.id)
         image.addEventListener('load', handleImageLoaded)

         return () => image.removeEventListener('load', handleImageLoaded)
     }, [cast])

     return (
          <div className="col">
               <div className={styles['cast-item']}>
                    <div className={styles['cast-img']}>
                         <img id={cast.id} src={image} alt={cast.name} />
                         
                         {/* <object data={generateProfile(cast.profile_path)} type="image/jpg">
                              <img src={fallback} alt={cast.name} />
                         </object> */}
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