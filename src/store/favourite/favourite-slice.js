import { createSlice } from '@reduxjs/toolkit'

const initialFavouriteState = { favourites: [], currentPage: 1 }

const favouriteSlice = createSlice({
     name: 'favourite',
     initialState: initialFavouriteState,
     reducers: {
          setFavourites(state, action) {
               state.favourites = action.payload
          },
          addToFavourites(state, action) {
               state.favourites.unshift(action.payload)
          },
          removeFromFavourites(state, action) {
               state.favourites = state.favourites.filter(fav => fav.id !== action.payload)
          },
          setCurrentPage(state, action) {
               state.currentPage = action.payload
          },
          clearFavourites(state) {
               state.favourites = []
               state.currentPage = 1
          }
     }
})

export const favouriteActions = favouriteSlice.actions
export default favouriteSlice.reducer