import {CateloryModel} from "./catelory.model";
import {CompanyModel} from "./company.model";
import {ColorsModel} from "./colors.model";
import {SizesModel} from "./sizes.model";

export class ProductFullModel {
    id!: string | null;
    code!: string | null;
    price!: number | null;
    name!: string | null;
    discription!: string | null;
    status!: string | null;
    catelory!: CateloryModel | null;
    company!: CompanyModel | null;
    image!: string | null;
    specification!: string | null;
    colors!: ColorsModel[] | null;
    sizes!: SizesModel[] | null;

    constructor(data?: ProductFullModel) {
        const product = data == null ? this : data;
        this.id = product.id;
        this.code = product.code;
        this.price = product.price;
        this.name = product.name;
        this.discription = product.discription;
        this.status = product.status;
        this.catelory = product.catelory;
        this.company = product.company;
        this.image = product.image;
        this.specification = product.specification;

        let sizes: SizesModel[] = [];
        if (product.sizes) {
            for (let i of product.sizes!) {
                sizes.push(new SizesModel(i));
            }
            this.sizes = sizes;
        }

        let colors: ColorsModel[] = [];
        if (product.colors) {
            for (let i of product.colors!) {
                colors.push(new ColorsModel(i));
            }
            this.colors = colors;
        }
    }
}
