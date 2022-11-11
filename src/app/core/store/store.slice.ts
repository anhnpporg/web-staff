import { createSlice } from "@reduxjs/toolkit";
import { createFeatureSelector } from "@ngrx/store";
import { state } from "@angular/animations";

const counterSlice = createSlice({
    name: "counter",
    initialState: {
        count: 0,
        ListProductInbill: [] as any[],
        ListInputProduct: [] as any[]
    },
    reducers: {
        increment: (state) => {
            state.count++;
        },
        decrement: (state) => {
            state.count--;
        },
        addProducttoListBill: (state, action) => {
            state.ListProductInbill = [...state.ListProductInbill, action.payload]
        },
        addProductToListInput: (state, action) => {
            state.ListInputProduct = [...state.ListInputProduct, action.payload]
        }
    }
});

const {
    reducer,
    actions: { increment, decrement, addProducttoListBill },
    name
} = counterSlice;

export default counterSlice.reducer;
export { increment, decrement, name, addProducttoListBill };

export const selectFeature = createFeatureSelector<ReturnType<typeof reducer>>(
    name
);
