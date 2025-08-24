import { createSlice } from "@reduxjs/toolkit"

const initialState = {
   
    showBox: false,
    openDialog: false,
    comment: {},
    completed: false,
    rating: ''
}

const ReviewSliceReducer = createSlice({
initialState,
name: 'review',
reducers: {
    
    setRevBox: (state, action) => {
        state.showBox = action.payload;
        state.openDialog = false
    },
    setComment:(state, action)=>{
        console.log(action.payload)
        state.comment = {...action.payload}
    },
   setRating:(state, action)=>{
        state.rating = action.payload
    },
    setOpenDialog: (state, action) => {
        if(!state.openDialog)
        state.openDialog = true;
        else state.openDialog = false;
    },

    setCompleted: (state, action)=>{
        state.completed = action.payload
    },
    resetBox : (state)=>{
        if(state.showBox){
        state.showBox = false;
        // state.comment = {};
        //  state.rating = ''
        }
    else {}
    }
}
});

export const { setRevBox, setCompleted, resetBox, setRating, setOpenDialog, setComment } = ReviewSliceReducer.actions
export default ReviewSliceReducer.reducer
