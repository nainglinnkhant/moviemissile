import { createSlice } from '@reduxjs/toolkit';

const initialMoviesState = { movies: { results: [], total_results: 10000 }, currentPage: 1 }

const moviesSlice = createSlice({
     name: 'movies',
     initialState: initialMoviesState,
     reducers: {
          setMovies(state, action) {
               state.movies = action.payload
          },
          setCurrentPage(state, action) {
               state.currentPage = action.payload
          }
     }
})

export const moviesActions = moviesSlice.actions
export default moviesSlice.reducer