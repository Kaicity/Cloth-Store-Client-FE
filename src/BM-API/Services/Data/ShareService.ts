// shared.service.ts
import { Injectable } from '@angular/core';
import { ExportingBillFullModel } from 'src/BM-API/dtos/exporting-bill-full.model';
import { ExportingBillTransactionModel } from 'src/BM-API/dtos/exporting-bill-transaction.model';
import { ProductFullModel } from 'src/BM-API/dtos/product-full.model';
import {ExportingBillModel} from "../../dtos/exporting-bill.model";
import {CustomerModel} from "../../dtos/customer.model";

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private myData!: ProductFullModel;
  private myExportingbillTransactiondata!: ExportingBillTransactionModel[];
  private myExportingbillData! : ExportingBillModel;
  private myExporttingbillFull!: ExportingBillFullModel;
  private myProduct!: ProductFullModel[];

  setData(data: ProductFullModel): void {
    this.myData = data;
  }
  getData(): ProductFullModel {
    return this.myData;
  }


  setDataExportingbillTransaction(data: ExportingBillTransactionModel[]) {
    this.myExportingbillTransactiondata = data;
  }

  getDataExportingbillTransaction(): ExportingBillTransactionModel[] {
    return this.myExportingbillTransactiondata;
  }

  setDataExportingbill(data: ExportingBillModel) {
    this.myExportingbillData = data;
  }

  getDataExportingbill(): ExportingBillModel {
    return this.myExportingbillData;
  }

  setDataExportingbillFull(data: ExportingBillFullModel) {
    this.myExporttingbillFull = data;
  }

  getDataExportingBillFull(): ExportingBillFullModel{
    return this.myExporttingbillFull;
  }

  setDataProduct(data: ProductFullModel[]) {
    this.myProduct = data;
  }

  getDataProduct(): ProductFullModel[] {
    return this.myProduct;
  }

}
