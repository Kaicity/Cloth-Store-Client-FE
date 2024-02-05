import {ExportingBillModel} from "./exporting-bill.model";
import {SizesModel} from "./sizes.model";
import {ProductModel} from "./product.model";
import {ColorsModel} from "./colors.model";

export class ExportingBillTransactionModel {
    id!: string | null;
    bill!: ExportingBillModel | null;
    product!: ProductModel | null;
    quantity: number = 1;
    amount!: number | null;
    color!: ColorsModel;
    size!: SizesModel;

    constructor(data?: ExportingBillTransactionModel) {
        const detail = data == null ? this : data;
        this.id = detail.id;
        this.bill = detail.bill;
        this.product = detail.product;
        this.quantity = detail.quantity;
        this.amount = detail.amount;
        this.color = detail.color;
        this.size = detail.size;
    }
}
