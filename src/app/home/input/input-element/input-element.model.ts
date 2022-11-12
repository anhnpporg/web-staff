
export interface batch {
    productId: number,
    manufacturingDate: string,
    expiryDate: string
}
export interface batchs {
    batchId: number | null,
    quantity: number,
    productUnitPriceId: number,
    totalPrice: number
    batch: batch | null
}

export interface supplier {
    name: string
}

export interface goodsReceiptNoteInterface {
    goodsReceiptNoteTypeId: number,
    invoiceId: number | null,
    supplierId: number | null,
    batches: batchs[],
    supplier: supplier | null

}