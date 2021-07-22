import { createSlice } from '@reduxjs/toolkit';

const initialMovieDetailsState = {
     selectedMovie: {},
     credits: { cast: [], crew: [] },
     reviews: [],
     recommendations: []
}

const movieDetailsSlice = createSlice({
     name: 'movie-details',
     initialState: initialMovieDetailsState,
     reducers: {
          setSelectedMovie(state, action) {
               state.selectedMovie = action.payload
          },
          setCredits(state, action) {
               state.credits = action.payload
          },
          setReviews(state, action) {
               state.reviews = action.payload
          },
          setRecommendations(state, action) {
               state.recommendations = action.payload
          }
     }
})

export const movieDetailsActions = movieDetailsSlice.actions
export default movieDetailsSlice.reducer