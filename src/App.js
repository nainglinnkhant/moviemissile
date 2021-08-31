import { Fragment, useEffect } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Navbar from './components/Layout/Navbar'
import MovieDetails from './pages/MovieDetails'
import Movies from './pages/Movies'
import Casts from './pages/Casts'
import Reviews from './pages/Reviews'
import Auth from './pages/Auth'
import Favourites from './pages/Favourites'
import Watchlist from './pages/Watchlist'
import NotFound from './pages/NotFound'
import { authActions } from './store/auth/auth-slice'
import { fetchFavourites } from './store/favourite/favourite-actions'
import { fetchWatchlist } from './store/watchlist/watchlist-actions'

function App() {
     const dispatch = useDispatch()
     const userId = useSelector(state => state.auth.userId) || localStorage.getItem('moviemissile-userId')

     useEffect(() => {
          const userId = localStorage.getItem('moviemissile-userId')
          const username = localStorage.getItem('moviemissile-username')
          
          if(userId && username) {
               dispatch(authActions.authenticate(userId))
               dispatch(authActions.setUsername(username))
               dispatch(fetchFavourites(userId))
               dispatch(fetchWatchlist(userId))
          }
     }, [dispatch])

     return (
          <Fragment>
               <Navbar />

               <Switch>
                    <Route path="/" exact>
                         <Redirect to="/movies"></Redirect>
                    </Route>

                    <Route path="/movies">
                         <Movies />
                    </Route>

                    <Route path="/movie/:movieId" exact>
                         <MovieDetails />
                    </Route>

                    <Route path="/movie/:movieId/cast">
                         <Casts />
                    </Route>

                    <Route path="/movie/:movieId/reviews">
                         <Reviews />
                    </Route>

                    <Route path="/auth">
                         <Auth />
                    </Route>

                    <Route path="/favourites">
                         {userId && <Favourites />}
                         {!userId && <Redirect to="/auth" />}
                    </Route>

                    <Route path="/watchlist">
                         {userId && <Watchlist />}
                         {!userId && <Redirect to="/auth" />}
                    </Route>

                    <Route path="/search">
                         <Movies />
                    </Route>

                    <Route>
                         <NotFound />
                    </Route>
               </Switch>
          </Fragment>
     )
}

export default App
