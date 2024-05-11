import { configureStore } from '@reduxjs/toolkit'
import SavedReducer from '../Reducers/SavedReducer'
import placesReducer from '../Reducers/placesReducer'


export default configureStore({
  reducer: {
    bookings: SavedReducer,
    Saved: placesReducer,
  }
})