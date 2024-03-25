import {Observable} from "rxjs";

import {warehouseBaseService} from "../Generic/warehouse-base.service";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class ProductService extends warehouseBaseService {


  public getAllProduct(): Observable<any> {
    return this.post('/api/v1/Food/findAll',);
  }

  public getProductById(id: String): Observable<any> {
    const body = {id: id}
    return this.get('/api/v1/Food/getFoodId/', body);
  }
}
