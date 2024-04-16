import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environment/Environment";
import {Injectable} from "@angular/core";
import {GenericService} from "./genericService";

const BASE_URL : string = environment.warehouseBaseUrl;
@Injectable()
export class warehouseBaseService extends GenericService{

  protected get(url: string, body?: any):Observable<any>{
    return this.http.get(BASE_URL + url,{
      params:this.getParams(body)
    })
  }

  protected post(url: string, body?: object, params?: object): Observable<any> {
    return this.http.post(BASE_URL+url, body, {
      params: this.getParams(params)
    });
  }
}
