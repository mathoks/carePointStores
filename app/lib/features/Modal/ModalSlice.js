import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    route: "",
    show: null ,

}
const modalSliceReducer = createSlice({
initialState,
name: 'modal',
reducers: {
    setRoute: (state, action) => {
        state.route = action.payload
    },
    setModal: (state, action) => {
        
       !state.show ?  state.show = action.payload : state.show = false
    }
}
});

export const { setModal, setRoute } = modalSliceReducer.actions
export default modalSliceReducer.reducer