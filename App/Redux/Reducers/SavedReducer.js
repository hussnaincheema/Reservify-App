import { createSlice } from '@reduxjs/toolkit'

export const SavedSlice = createSlice({
    name: "booking",
    initialState: {
        bookings:[],
    },
    reducers:{
        savedPlaces:(state, action) => {
            state.bookings.push({...action.payload})
        }
    }
});

export const {savedPlaces} = SavedSlice.actions

export default SavedSlice.reducer