export interface goodsIssueNote {
    quantity: number,
    unit: number,
    batchId: number
}

export interface product {
    productId: number,
    goodsIssueNote: goodsIssueNote[] | null
}

export interface customer {
    phoneNumber: string,
    fullName: string
}
export interface invoiceInterface {
    customerId: number | null,
    product: product[],
    customer: customer | null
}