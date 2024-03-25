import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerModel } from 'src/bm-api/dtos/customer.model';
import { CustomerService } from 'src/bm-api/Services/warehouse/Customer-service';
import { SharedService } from "../../bm-api/Services/Data/ShareService";
import { ExportingbillService } from "../../bm-api/Services/agency/ExportingbillService";
import { ExportingBillFullModel } from "../../bm-api/dtos/exporting-bill-full.model";
import { ExportingBillTransactionModel } from 'src/bm-api/dtos/exporting-bill-transaction.model';
import { CustomerInfoModel } from 'src/bm-api/dtos/customer-info.model';
import {MatDialog} from "@angular/material/dialog";
import {ModalWrapperComponent} from "../modal-wrapper/modal-wrapper.component";

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css']
})
export class ShippingComponent implements OnInit {

  customer!: CustomerModel;
  customerInfo!: CustomerInfoModel;
  isLoading: Boolean = false;
  oldCardProduct!: ExportingBillTransactionModel[]
  howProduct: Number = 0;
  calculatorDemo: number = 0;
  calcuToTal: number = 0;
  feeDelivery: number = 0;



  constructor(private customerService: CustomerService, private router: Router, private shareService: SharedService,
    private exportingBillService: ExportingbillService, public dialog: MatDialog) {
    this.customer = new CustomerModel();
    this.customerInfo = new CustomerInfoModel();
  }


  createUser() {
    this.customerInfo.fullname = this.customer.fullName;
    this.customerInfo.phone = this.customer.phone;
    this.customerInfo.email = this.customer.email;
    this.customerInfo.address = this.customer.address;

    this.customerService.addUserInfo(this.customerInfo).subscribe(res => {
    });
  }

  startLoadingData(): void {
    this.isLoading = true;

    //setTime loading
    setTimeout(() => {
      this.isLoading = false;
      //reset page after loading
      this.router.navigate(['/success-order']);
    }, 2000);
  }

  onSubmit(): void {
    //gửi dữ liệu
    console.log("CustomerModel registration successfully !")
  }

  btnStepBack() {
    this.router.navigate(['./product'])
  }

  ngOnInit(): void {
    //load card old
    this.getAllCardProducts();

    const dataCustomer = localStorage.getItem('customer');
    if (dataCustomer != null) {
      var customerData = JSON.parse(dataCustomer);
      this.customer = customerData;
    }
  }

  btnAcceptOrder() {
    console.log(this.shareService.getDataExportingBillFull());
    let dataExportingBillFull = this.shareService.getDataExportingBillFull();
    //Thong tin khach hang khong can dang nhap
    if (localStorage.getItem('customer') == null) {
      console.log(this.customer);
      this.createUser();
      dataExportingBillFull.exportingBill!.customer = new CustomerModel();
    }

    //Create bill API
    this.exportingBillService.addBill(dataExportingBillFull).subscribe(res => {
      console.log(res);
    })
    //Nhập mã xác nhận đơn hàng
    this.openModal();
    //Hoan tat qua trinh mua va dat hang ???

    //GET API SMS
    this.startLoadingData();
  }


  //Lay danh sach gio hang chinh thuc
  getAllCardProducts(): void {
    //Su dung shareService de lay ra
    this.oldCardProduct = this.shareService.getDataExportingbillTransaction();
    console.log("Card cuoi cung cua toi: ", this.oldCardProduct);

    this.howProduct = this.oldCardProduct.length;
    this, this.oldCardProduct.forEach(element => {
      if (element.amount) {
        this.calculatorDemo += element.amount;
      }
    });

    this.calcuToTal = this.calcuToTal + this.calculatorDemo + this.feeDelivery;
  }


  selectedValue: string = "assets/"
  valueFlag : string[] = ['VNflag.png', 'USflag.png', 'CHINAflag.png', 'CANADAflag.png']
  selectItem(index: number): void {
    this.valueFlag.forEach(value => {
      this.selectedValue += value.at(index);
    })
    console.log(this.selectedValue);
  }

  //Form input mã xác nhận đơn hàng
  openModal(): void {
    const dialogRef = this.dialog.open(ModalWrapperComponent, {
      width: '300px', // You can customize the width and other properties
    });

    // Subscribe to the afterClosed event to get the result when the modal is closed
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed with result:', result);
    });
  }

}
