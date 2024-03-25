import {CateloryModel} from "./catelory.model";
import {CompanyModel} from "./company.model";
import {ProductFullModel} from "./product-full.model";

export class ProductModel {
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

    constructor(data?: ProductModel) {
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
    }

    CoppyData(data?: ProductFullModel) {
        const product = data == null ? this : data;
        const newProduct = new ProductModel();

        newProduct.id = product.id;
        newProduct.code = product.code;
        newProduct.price = product.price;
        newProduct.name = product.name;
        newProduct.discription = product.discription;
        newProduct.status = product.status;
        newProduct.catelory = product.catelory;
        newProduct.company = product.company;
        newProduct.image = product.image;
        newProduct.specification = product.specification;
        return newProduct;
    }
}
