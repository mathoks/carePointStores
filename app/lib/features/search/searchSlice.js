import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    query: " ",
     isSuccess: false ,
     route: "",
     isSearching: false,
}
const searchSliceReducer = createSlice({
initialState,
name: 'search',
reducers: {
    setRoute: (state, action) => {
        state.route = action.payload
    },
    setQuery: (state, action) => {
        
       state.query = action.payload 

    },
    setIsSearching: (state, action) => {
        state.isSearching = action.payload
    },
}
});

export const { setQuery, setRoute, setIsSearching } = searchSliceReducer.actions
export default searchSliceReducer.reducer