import {createSlice, current} from "@reduxjs/toolkit";
import {createFeatureSelector} from "@ngrx/store";
import {invoiceInterface} from "src/app/home/retail/retail.model";
import {ListInputProductInterface, productinbillInterface} from "./store.model";

const counterSlice = createSlice({

  name: "counter",
  initialState: {
    ListBrokenProduct: [] as any,
    ListProductInbill: [] as productinbillInterface[],
    ListInputProduct: [] as ListInputProductInterface[],
    listGoodsReceiptNote: [] as any,
    invoice: {
      goodsIssueNoteTypeId: 1,
      customerId: null,
      product: [] as any,
      customer: null
    } as invoiceInterface,
    invoiceID: 0,
    ListReturnProduct: [] as any
  },
  reducers: {
    addListReturnProduct: (state, action) => {
      state.ListReturnProduct = action.payload
      console.log(state.ListReturnProduct)
    },
    addInvoiceID: (state, action) => {
      state.invoiceID = action.payload
      console.log(state.invoiceID)
      console.log(action.payload)
    },
    resetState: (state, action) => {
      state.ListProductInbill = []
      state.ListInputProduct = []
      state.listGoodsReceiptNote = []
      state.invoice = {
        goodsIssueNoteTypeId: 1,
        customerId: null,
        product: [] as any,
        customer: null
      }
    },
    deleteBacthProductInBill: (state, action) => {
      console.log(action.payload)
      let tempListProductInBill = [...current(state.ListProductInbill)]

      tempListProductInBill.forEach((item, index) => {
        if (item.product.id === action.payload.product.id) {
          let tempGoogissueNote = tempListProductInBill[index].listBatches.filter(item => item.batchId !== action.payload.id)

          console.log(tempGoogissueNote)
          tempListProductInBill[index] = {...tempListProductInBill[index], listBatches: tempGoogissueNote}
          console.log(tempListProductInBill)
          state.ListProductInbill = [...tempListProductInBill]
          console.log(state.ListProductInbill)
        }
      })
    },
    addProducttoListBill: (state, action) => {
      console.log(action.payload)
      state.ListProductInbill = [...state.ListProductInbill, action.payload]
      console.log(state.ListProductInbill);
      let invocieTemp = {...state.invoice}
      let productTemp: any[] = state.invoice.product
      for (let i = 0; i < state.ListProductInbill.length; i++) {
        if (state.ListProductInbill[i].product.id == action.payload.id) {
          productTemp = [...productTemp, {
            productId: action.payload.id,
            goodsIssueNote: [{
              quantity: 1,
              unit: state.ListProductInbill[i].product.productUnits[0].id,
              batchId: state.ListProductInbill[i].product.batches[0].id
            }]
          }]
        }
      }
      invocieTemp.product = productTemp
      state.invoice = {...invocieTemp}
      console.log(state.invoice);
    }, addBatchesToProductinBill: (state, action) => {
      console.log(action.payload)
      let tempListProductInBill = [...current(state.ListProductInbill)]

      tempListProductInBill.forEach((element, index) => {
        if (element.product.id === action.payload.product.id) {
          tempListProductInBill[index] = action.payload
        }
      })
      state.ListProductInbill = tempListProductInBill
      console.log(state.ListProductInbill)
    }, deleteProductInBill: (state, action) => {
      let tempListInBill = current(state.ListProductInbill)
      console.log(tempListInBill);
      tempListInBill.forEach((element, index) => {
        if (element.product.id == action.payload) {
          let a = tempListInBill.filter(item => item.product.id != action.payload)
          tempListInBill = [...a]
        }
      });
      state.ListProductInbill = [...tempListInBill]
      let temInvocie = current(state.invoice)
      let temProductInvoice = temInvocie.product
      temProductInvoice.forEach((element, index) => {
        if (element.productId == action.payload) {
          let a = temProductInvoice.filter(item => item.productId != action.payload)
          temProductInvoice = [...a]
          temInvocie = {...temInvocie, product: temProductInvoice}
        }
      });
      state.invoice = {...temInvocie}
    }, addCustomer: (state, action) => {
      state.invoice = action.payload
    },
    addProductToListInput: (state, action) => {
      state.ListInputProduct = action.payload
      console.log(state.ListInputProduct)
    },
    addgoodsReceiptNote: (state, action) => {
      state.listGoodsReceiptNote = action.payload
      console.log(state.listGoodsReceiptNote);
    },
  }
});

const {
  reducer,
  actions: {
    addProducttoListBill,
    addProductToListInput,
    addgoodsReceiptNote,
    addBatchesToProductinBill,
    addCustomer,
    deleteProductInBill,
    deleteBacthProductInBill,
    resetState,
    addInvoiceID,
    addListReturnProduct
  },
  name
} = counterSlice;

export default counterSlice.reducer;
export {
  name,
  addProducttoListBill,
  addProductToListInput,
  addgoodsReceiptNote,
  addBatchesToProductinBill,
  addCustomer,
  deleteProductInBill,
  deleteBacthProductInBill,
  resetState,
  addInvoiceID,
  addListReturnProduct
};

export const selectFeature = createFeatureSelector<ReturnType<typeof reducer>>(
  name
);
