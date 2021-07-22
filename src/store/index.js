import { configureStore } from '@reduxjs/toolkit'

import moviesReducer from './movies/movies-slice' 
import movieDetailsReducer from './movie-details/movie-details-slice'
import authReducer from './auth/auth-slice'
import favouriteReducer from './favourite/favourite-slice'
import watchlistReducer from './watchlist/watchlist-slice'
import searchSlice from './search/search-slice'

const store = configureStore({
     reducer: {
          movies: moviesReducer,
          movieDetails: movieDetailsReducer,
          auth: authReducer,
          favourite: favouriteReducer,
          watchlist: watchlistReducer,
          search: searchSlice
     }
})

export default store