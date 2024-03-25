import {OptionProductModel} from "./option-product.model";
import {ProductModel} from "./product.model";

export class ColorsModel {
    id!: string | null;
    optionProduct!: OptionProductModel;
    addition!: number | null;
    product!: ProductModel | null;
    image!: string | null;

    constructor(data: ColorsModel) {
        const size = data == null ? this : data;
        this.id = size.id;
        this.optionProduct = new OptionProductModel(size.optionProduct);
        this.addition = size.addition;
        this.image = size.image;
        this.product = size.product;

    }
}
