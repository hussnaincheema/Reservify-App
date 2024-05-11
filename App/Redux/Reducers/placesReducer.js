// redux/placesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const placesSlice = createSlice({
  name: 'Saved',
  initialState: {
    savedPlaces: [],
  },
  reducers: {
    savePlace: (state, action) => {
      state.savedPlaces.push(action.payload);
    },
    removePlace: (state, action) => {
      state.savedPlaces = state.savedPlaces.filter(
        (place) => place.id !== action.payload.id
      );
    },
  },
});

export const { savePlace, removePlace } = placesSlice.actions;
export default placesSlice.reducer;
