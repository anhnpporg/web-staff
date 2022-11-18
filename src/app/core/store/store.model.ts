export interface productinbillInterface{
    product: any,
    listBatches: goodsIssueNoteInterface[]
}

export interface goodsIssueNoteInterface{
  quantity: number,
  unit: number,
  batchId: number
}
