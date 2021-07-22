import { Fragment, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useLocation } from 'react-router-dom'

import { ReactComponent as MovieDBLogo } from '../../assets/moviedb.svg'
import user from '../../assets/user.png'
import { authActions } from '../../store/auth/auth-slice'
import { watchlistActions } from '../../store/watchlist/watchlist-slice'
import { favouriteActions } from '../../store/favourite/favourite-slice'
import styles from './Navbar.module.css'

const Navbar = () => {
     const dispatch = useDispatch()
     const history = useHistory()
     const location = useLocation()

     const userId = useSelector(state => state.auth.userId)
     const username = useSelector(state => state.auth.username)

     const searchWordRef1 = useRef()
     const searchWordRef2 = useRef()

     const clickMovieDBHandler = () => {
          window.open("https://www.themoviedb.org/")
     }

     const [showSearchbar, setShowSearchbar] = useState(false)

     const toggleSearchbarHandler = () => {
          setShowSearchbar(prevState => !prevState)
     }

     const logoutHandler = () => {
          localStorage.removeItem('userId')
          localStorage.removeItem('username')

          dispatch(authActions.logout())
          dispatch(authActions.clearUsername())
          dispatch(watchlistActions.clearWatchlist())
          dispatch(favouriteActions.clearFavourites())

          if(location.pathname.includes('watchlist') || location.pathname.includes('favourites')) {
               history.push('/movies')
          }
     }

     const searchHandler1 = (event) => {
          event.preventDefault()

          history.push(`/search?query=${searchWordRef1.current.value}`)
     }

     const searchHandler2 = (event) => {
          event.preventDefault()

          history.push(`/search?query=${searchWordRef2.current.value}`)
     }
     
     const userButton = (
          <button className={`btn dropdown ${styles['btn-user-profile']}`}>
               <img
                    src={user}
                    alt="User Profile"
                    className="dropdown-toggle"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
               />

               <ul
                    className={`${styles['dropdown-menu']} dropdown-menu text-muted`}
                    aria-labelledby="navbarDropdownMenuLink"
               >
                    <li>
                         <span className={`${styles['name-item']} text-body fw-bold mb-0`}>
                              {username}
                         </span>
                    </li>

                    <hr className="my-2" />

                    <li>
                         <Link className="dropdown-item" to="/watchlist">Watchlist</Link>
                    </li>

                    <li>
                         <Link className="dropdown-item" to="/favourites">Favourite</Link>
                    </li>

                    <li onClick={logoutHandler}>
                         <p className="dropdown-item mb-0">Logout</p>
                    </li>
               </ul>
          </button>
     )

     return (
          <Fragment>
               <nav className={`${styles.navbar} navbar fixed-top shadow-sm`}>
                    <div className="container">
                         <Link to="/movies" className={`${styles['btn-logo']} navbar-brand`}>
                              <p className="fw-bold m-0">Moviemissile</p>
                         </Link>

                         <span className="d-none d-md-block">Powered By</span>

                         <span className={`${styles['btn-moviedb']} d-none d-md-block me-auto ms-4`} onClick={clickMovieDBHandler}>
                              <MovieDBLogo />
                         </span>

                         <button
                              className={`btn d-block d-sm-none ms-auto me-2 ${styles['btn-toggle']}`}
                              onClick={toggleSearchbarHandler}
                         >
                              {!showSearchbar && <i className="fas fa-search fs-5"></i>}
                              {showSearchbar && <i className="fas fa-times fs-5"></i>}
                         </button>

                         <form className="d-none d-sm-block ms-auto" onSubmit={searchHandler1}>
                              <input 
                                   className="form-control" 
                                   placeholder="Search for a movie..." 
                                   ref={searchWordRef1} 
                              />

                              <button className={`btn ${styles['btn-search-nav']}`}>
                                   <i className="fas fa-search fs-6"></i>
                              </button>
                         </form>

                         {!userId && <Link className="btn" to="/auth">Login</Link>}

                         {userId && userButton}
                    </div>
               </nav>

               {showSearchbar && (
                    <form className={styles['search-form']} onSubmit={searchHandler2}>
                         <input 
                              className="form-control" 
                              placeholder="Search for a movie..." 
                              ref={searchWordRef2}
                         />

                         <button className={`btn ${styles['btn-search']}`}>
                              <i className="fas fa-search fs-6"></i>
                         </button>
                    </form>
               )}
          </Fragment>
     )
}

export default Navbar