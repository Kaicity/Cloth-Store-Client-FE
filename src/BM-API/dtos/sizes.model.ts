import {OptionProductModel} from "./option-product.model";
import {ProductModel} from "./product.model";

export class SizesModel {
    id!: string | null;
    optionProduct!: OptionProductModel | null;
    addition!: number | null;
    product!: ProductModel | null;

    constructor(data: SizesModel) {
        const size = data == null ? this : data;
        this.id = size.id;
        this.optionProduct = size.optionProduct
            ? new OptionProductModel(size.optionProduct)
            : null;
        this.addition = size.addition;
        this.product = size.product;
    }
}
