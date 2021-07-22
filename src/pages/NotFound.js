import { Link } from 'react-router-dom'

import styles from './NotFound.module.css'

const NotFound = () => {
     return (
          <div className={`container ${styles['notfound-container']}`}>
               <p className="text-center">Page not found. Try <Link to="/movies">this</Link>.</p>
          </div>
     )
}

export default NotFound