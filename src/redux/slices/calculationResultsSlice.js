import { createSlice } from "@reduxjs/toolkit";


const CalculationResultsSlice = createSlice({
    name: 'result',
    initialState: {
        result: []
    },
    reducers: {
        addNewEntry: (state, {payload}) => {
            state.result = [payload, ...state.result]
        },
        reOrderResults: (state, {payload}) => {
            state.result = [...payload]
        }
    }
})


export default CalculationResultsSlice.reducer
export const addNewEntryAction = CalculationResultsSlice.actions.addNewEntry
export const reOrderResultsAction = CalculationResultsSlice.actions.reOrderResults
export const resultSelector = state => state.result