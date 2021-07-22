import { createSlice } from '@reduxjs/toolkit'

const initialSearchState = { movies: { results: [], total_results: 0 }, currentPage: 1 }

const searchSlice = createSlice({
     name: 'search',
     initialState: initialSearchState,
     reducers: {
          setSearchedMovies(state, action) {
               state.movies = action.payload
          },
          setCurrentPage(state, action) {
               state.currentPage = action.payload
          }
     }
})

export const searchActions = searchSlice.actions
export default searchSlice.reducer