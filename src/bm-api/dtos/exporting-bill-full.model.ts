import {ExportingBillModel} from "./exporting-bill.model";
import {ExportingBillTransactionModel} from "./exporting-bill-transaction.model";

export class ExportingBillFullModel {
    exportingBill!: ExportingBillModel | null;
    exportingBillTransactions!: ExportingBillTransactionModel[] | null;
}
