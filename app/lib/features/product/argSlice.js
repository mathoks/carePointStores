import { createSlice } from "@reduxjs/toolkit";




 const initialState = {
    skip: 0,
    completed: true,
    take: 10 ,
    loading: false,
    data: [],
    cursor: null
}

const argSliceReducer = createSlice({
initialState,
name: 'productArgs',
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

    setCursor: (state, action) => {
        state.prompt = action.payload
    },
    
    setSkip: (state, action)=>{
        state.skip = action.payload
    },

    setTake: (state, action)=>{
        state.take = action.payload
    }
}
});


export const { setData, setSkip, setIsComplete, setIsLoading, setTake, setCursor } = argSliceReducer.actions
export default argSliceReducer.reducer
