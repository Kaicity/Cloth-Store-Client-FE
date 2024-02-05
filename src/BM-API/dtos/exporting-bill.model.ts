import {CustomerModel} from "./customer.model";
import {CustomerInfoModel} from "./customer-info.model";
import {AgencyModel} from "./agency.model";

export class ExportingBillModel {
    id!: string | null;
    code!: string | null;
    dateExport!: Date | null;
    dateCreated!: Date | null;
    total!: number | null;
    status!: string | null;
    customer!: CustomerModel | null;
    agency!: AgencyModel | null;

}
