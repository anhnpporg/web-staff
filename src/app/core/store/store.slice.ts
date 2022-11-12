import { batchs, goodsReceiptNoteInterface } from './../../home/input/input-element/input-element.model';
import { createSlice } from "@reduxjs/toolkit";
import { createFeatureSelector } from "@ngrx/store";
import { state } from "@angular/animations";
import { Action } from "rxjs/internal/scheduler/Action";

const counterSlice = createSlice({
    name: "counter",
    initialState: {
        count: 0,
        ListProductInbill: [] as any[],
        ListInputProduct: [] as any[],
        listGoodsReceiptNote: [] as any,
        listBatches: [] as any

    },
    reducers: {
        addProducttoListBill: (state, action) => {
            state.ListProductInbill = [...state.ListProductInbill, action.payload]
        },
        addProductToListInput: (state, action) => {
            state.ListInputProduct = [...state.ListInputProduct, action.payload]
            console.log(state.ListInputProduct);
        },
        addgoodsReceiptNote: (state, action) => {
            state.listGoodsReceiptNote = action.payload


            console.log(state.listGoodsReceiptNote);
        },
        addBatchGoodReceiptNote: (state, action) => {

        }
    }
});

const {
    reducer,
    actions: { addProducttoListBill, addProductToListInput, addgoodsReceiptNote },
    name
} = counterSlice;

export default counterSlice.reducer;
export { name, addProducttoListBill, addProductToListInput, addgoodsReceiptNote };

export const selectFeature = createFeatureSelector<ReturnType<typeof reducer>>(
    name
);
