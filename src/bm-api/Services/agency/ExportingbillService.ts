import { Observable } from "rxjs";
import { AgencyBaseService } from "../Generic/agency-base.service";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class ExportingbillService extends AgencyBaseService{
    public addBill(exportingbillFull:any): Observable<any> {
        return this.post('/api/v1/Exportingbill/create', exportingbillFull);
    }
}
