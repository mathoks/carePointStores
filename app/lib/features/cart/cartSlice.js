import { deleteEntry } from "@/app/utills/deleteEntry";
import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    loading: false,
    completed: false,
    data: []

}
const cartSliceReducer = createSlice({
initialState,
name: 'userCart',
reducers: {
    setIsComplete: (state, action)=>{
        state.completed = action.payload
    },
   

    setData: (state, action) => {
        state.data = [...action.payload]
    },
    setIsLoading: (state, action) => {
        state.loading = action.payload
    },
    
}
});

export const { setData, setIsComplete, setIsLoading } = cartSliceReducer.actions
export default cartSliceReducer.reducer