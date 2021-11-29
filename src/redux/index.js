import { configureStore, combineReducers } from "@reduxjs/toolkit";
import calculationResultsReducer from './slices/calculationResultsSlice'


const RootReducer = combineReducers({
    result: calculationResultsReducer
})


const store = configureStore({
    reducer: RootReducer
})


export default store