import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    route: "",
    disabled:  false,
    page: 'default',
    page2: {page:'default', country: null},
    page3: 'default',
    page4: {page:'default', state: null},
    shippinglocation: {}
}
const settingsSliceReducer = createSlice({
initialState,
name: 'settings',
reducers: {
    setPage: (state, action) => {
        state.page = action.payload
    },
    setPage2: (state, action) => {
        state.page2.page = action.payload.page
        state.page2.country = action.payload.country
    },
    setPage3: (state, action) => {
        state.page3 = action.payload
    },
    setPage4: (state, action) => {
        state.page4.page = action.payload.page
        state.page4.state = action.payload.state
    },
    setdisable: (state, action) => {
        
       state.disabled = action.payload
    },

    setLocation: (state, action) => {
        state.shippinglocation = {
            country: state.page2.country,
            state: state.page4.state,
            lga: action.payload.lga
        }
        console.log(state.shippinglocation)
         localStorage.setItem('country', JSON.stringify(state.shippinglocation))
    },

    reset: (state)=>{
        return {...state,
            route: "",
            disabled:  false,
            page: 'default',
            page2: {page:'default', country: null},
            page3: 'default',
            page4: {page:'default', state: null},
            shippinglocation: {}
        }
    }
}
});

export const { setdisable, setPage, setPage2, setPage3, setPage4, reset, setLocation } = settingsSliceReducer.actions
export default settingsSliceReducer.reducer