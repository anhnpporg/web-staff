import { state } from '@angular/animations';
import { product, goodsIssueNote } from './../../home/retail/retail.model';
import { createSlice } from "@reduxjs/toolkit";
import { createFeatureSelector } from "@ngrx/store";
import { invoiceInterface } from "src/app/home/retail/retail.model";

const counterSlice = createSlice({



    name: "counter",
    initialState: {
        ListProductInbill: [] as any[],
        ListInputProduct: [] as any[],
        listGoodsReceiptNote: [] as any,
        invoice: {
            customerId: null,
            product: [] as any,
            customer: null
        } as invoiceInterface

    },
    reducers: {
        addProducttoListBill: (state, action) => {
            state.ListProductInbill = [...state.ListProductInbill, action.payload]
            console.log(state.ListProductInbill);

            let invocieTemp = { ...state.invoice }
            let productTemp: any[] = state.invoice.product

            for (let i = 0; i < state.ListProductInbill.length; i++) {
                if (state.ListProductInbill[i].id == action.payload.id) {
                    productTemp = [...productTemp, {
                        productId: action.payload.id,
                        goodsIssueNote: [{
                            quantity: 1,
                            unit: state.ListProductInbill[i].productUnits[0].id,
                            batchId: state.ListProductInbill[i].batches[0].id
                        }]
                    }]
                }
            }
            invocieTemp.product = productTemp
            state.invoice = { ...invocieTemp }
            console.log(state.invoice);

        }, addBatchesToProductinBill: (state, action) => {
            console.log(action.payload.listBatches);
            let temPayload = action.payload
            let invocieTemp = { ...state.invoice }
            let productTemp = [...invocieTemp.product]

            for (let i = 0; i < productTemp.length; i++) {
                const element = productTemp[i];
                if (element.productId == temPayload.productId) {
                    console.log('ok');
                    
                    productTemp[i].goodsIssueNote = action.payload.listBatches
                }
            }
            invocieTemp.product = productTemp
            console.log(invocieTemp);

            state.invoice = { ...invocieTemp }
            console.log(state.invoice);
        }, addCustomer: (state, action) => {
            state.invoice = action.payload
            console.log(state.invoice);

        },
        addProductToListInput: (state, action) => {
            state.ListInputProduct = [...state.ListInputProduct, action.payload]
            console.log(state.ListInputProduct);
        },
        addgoodsReceiptNote: (state, action) => {
            state.listGoodsReceiptNote = action.payload
            console.log(state.listGoodsReceiptNote);
        },
    }
});

const {
    reducer,
    actions: { addProducttoListBill, addProductToListInput, addgoodsReceiptNote, addBatchesToProductinBill, addCustomer },
    name
} = counterSlice;

export default counterSlice.reducer;
export { name, addProducttoListBill, addProductToListInput, addgoodsReceiptNote, addBatchesToProductinBill, addCustomer };

export const selectFeature = createFeatureSelector<ReturnType<typeof reducer>>(
    name
);
