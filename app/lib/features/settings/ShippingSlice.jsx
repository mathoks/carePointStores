import { createSlice } from "@reduxjs/toolkit";
import { Country, CountryFlagDisplay, lgaList } from "@/app/util/StatesLga";
const initialState = {
    active: null,
    index: 0,
    stateIndex: 0,
    lgaIndex: 0,
    func: {func: null},
     states: [...Country[0].state],
     lgas: [ ...Country[0].state[0].LGAs]
}
const ShippingSliceReducer = createSlice({
initialState,
name: 'shipping',
reducers: {
    setActive: (state, action) => {
        state.active = action.payload
        console.log(state.active)
    },
    setIndex: (state, action) => {
       if(state.index !== action.payload){
        state.index = action.payload
        state.stateIndex = 0;
        state.lgaIndex = 0;
       }else {}
    //    document.getElementById("country_code").value = Country[state.index].code;
    },
    setStateIndex: (state, action) => {
        if(state.stateIndex !== action.payload){
            state.stateIndex = action.payload
            state.lgaIndex = 0;
       
        // state.lgas =  [...Country[state.index].state[state.stateIndex].LGAs]
        // document.getElementById("lga").value = Country[state.index]?.state[state.stateIndex].LGAs[state.lgaIndex]
        
        } else {}
    },
    setLgaIndex: (state, action) => {
       state.lgaIndex = action.payload
       
    },
    setFunc: (state, action) => {   
       state.func.func = action.payload.func
    },

    setStatesFilterd: (state, action)=>{
        state.states = [...Country[state.index].state.filter(({name}) =>
            name.toLowerCase().includes(action.payload.toLowerCase())
          )]
    },
    setLgaFilterd: (state, action)=>{
        state.lgas = [...Country[state.index].state[state.stateIndex].LGAs].filter((state) =>
            state.toLowerCase().includes(action.payload.toLowerCase())
          )
    },
    reset: (state)=>{
        return {...state,
    active: 'country',
    index: 0,
    stateIndex: 0,
    lgaIndex: 0,
    func: null,
    states: [...Country[state.index].state],
    lgas: [
        ...lgaList[Country[state.index].state[state.stateIndex]],
      ]
        }
    }
}
});

export const {setFunc, setStatesFilterd,setLgaFilterd, setActive, setIndex, setStateIndex, setLgaIndex, reset,  } = ShippingSliceReducer.actions
export default ShippingSliceReducer.reducer