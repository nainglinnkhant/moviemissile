import { createSlice } from '@reduxjs/toolkit'

const initialWatchlistState = { watchlist: [], currentPage: 1 }

const watchlistSlice = createSlice({
     name: 'watchlist',
     initialState: initialWatchlistState,
     reducers: {
          setWatchlist(state, action) {
               state.watchlist = action.payload
          },
          addToWatchlist(state, action ) {
               state.watchlist.unshift(action.payload)
          },
          removeFromWatchlist(state, action) {
               state.watchlist = state.watchlist.filter(movie => movie.id !== action.payload)
          },
          setCurrentPage(state, action) {
               state.currentPage = action.payload
          },
          clearWatchlist(state) {
               state.watchlist = []
               state.currentPage = 1
          }
     }
})

export const watchlistActions = watchlistSlice.actions
export default watchlistSlice.reducer