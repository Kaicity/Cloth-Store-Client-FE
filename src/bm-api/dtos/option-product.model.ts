import {TypeOptionProduct} from "../Constant/type-option-product";

export class OptionProductModel {
    id!: string | null;
    name!: string | null;
    type!: TypeOptionProduct | null;
    dateCreate!: Date | null;
    dateUpdate!: Date | null;

    constructor(data?: OptionProductModel) {
        const option = data == null ? this : data;
        this.id = option.id;
        this.name = option.name;
        this.type = option.type;
        this.dateCreate = option.dateCreate;
        this.dateUpdate = option.dateUpdate;

    }
}
