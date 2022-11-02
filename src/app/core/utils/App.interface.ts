export interface InvoiceInterface {
    customerId: string,
    product: Product[],
}
export interface Product {
    productId: number,
    goodsIssueNote: any
}