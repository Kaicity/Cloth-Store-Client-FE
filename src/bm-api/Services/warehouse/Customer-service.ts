import {Observable} from "rxjs";
import {ProductFullModel} from "../../dtos/product-full.model";
import {warehouseBaseService} from "../Generic/warehouse-base.service";
import {BaseSearchModel} from "../../dtos/base-search.model";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class CustomerService extends warehouseBaseService{


  public addUser(customerUser:any): Observable<any> {
      return this.post('/api/v1/Customer/create', customerUser);
  }

  public getUser(username: String, password: String){
    const body = {username, password};
    return this.post("/api/v1/Customer/login", body);
  }

  public addUserInfo(customerUserInfo: any): Observable<any> {
    return this.post('/api/v1/Customer/createInfo', customerUserInfo)
  }
}
