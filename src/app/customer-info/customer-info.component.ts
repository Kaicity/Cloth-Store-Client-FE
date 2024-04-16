import {Component, OnInit} from '@angular/core';
import {CustomerModel} from 'src/bm-api/dtos/customer.model';
import {ExportingBillModel} from 'src/bm-api/dtos/exporting-bill.model';
import {ExportingBillFullModel} from 'src/bm-api/dtos/exporting-bill-full.model';
import {ExportingBillTransactionModel} from 'src/bm-api/dtos/exporting-bill-transaction.model';
import {SharedService} from 'src/bm-api/Services/Data/ShareService';
import {AgencyModel} from "../../bm-api/dtos/agency.model";
import {CateloryModel} from "../../bm-api/dtos/catelory.model";
import {CompanyModel} from "../../bm-api/dtos/company.model";
import {CustomerService} from "../../bm-api/Services/warehouse/Customer-service";
import {NavigationEnd, Router} from "@angular/router";


@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.css']
})
export class CustomerInfoComponent implements OnInit {
  customer!: CustomerModel
  exFull!: ExportingBillFullModel
  username!: string;
  password!: string;
  customerInfo!: CustomerModel;
  isLoading: boolean = false;
  isCheckLogin: boolean = false;


  private card!: ExportingBillTransactionModel[];//giỏ hàng đã chọn


  constructor(private sharedService: SharedService, private customerService: CustomerService,
    private router: Router) {
    this.customer = new CustomerModel();
  }

  //Lay danh sach gio hang da chon
  public getDataExportingbillTransactionFromDetail(): ExportingBillTransactionModel[] {
    return this.sharedService.getDataExportingbillTransaction();
  }


  //Lay bill da tao khi xac nhan don hang
  public getDataExportingbill(): ExportingBillModel {
    return this.sharedService.getDataExportingbill();
  }


  //Tao card va xac nhan card tiep tuc den thong tin khach hang
  public newCard(): ExportingBillTransactionModel[] {
    this.card = this.getDataExportingbillTransactionFromDetail();
    return this.card;
  }

  public getDataExportingbillFull(): void {
    this.exFull = new ExportingBillFullModel();
    this.exFull.exportingBill = new ExportingBillModel();
    this.exFull.exportingBillTransactions = [];
    this.exFull.exportingBill = this.getDataExportingbill();
    this.exFull.exportingBillTransactions = this.newCard();

    this.exFull.exportingBill.agency = new AgencyModel();
    this.exFull.exportingBill.agency.name = "TMA";

    if (localStorage.getItem('customer') != null) {
      const dataCustomer = localStorage.getItem('customer');
      if (dataCustomer) {
        this.exFull.exportingBill.customer = JSON.parse(dataCustomer);
      }
    }

    this.exFull.exportingBill.agency = new AgencyModel();
    this.exFull.exportingBill.agency.name = "TMA";
    for (let i = 0; i < this.exFull.exportingBillTransactions!.length; i++) {
      this.exFull.exportingBillTransactions[i].product!.catelory = new CateloryModel();
      this.exFull.exportingBillTransactions[i].product!.company = new CompanyModel();
      this.exFull.exportingBillTransactions[i].product!.company!.address = "TMA";
      this.exFull.exportingBillTransactions[i].product!.catelory!.name = "XXX";

    }

  }

  onSubmit(): void {
  }

  createBillPayment() {
    //Toan bo du lieu bill va bill transaction
    this.getDataExportingbillFull();
    // console.log("Đây là card")
    // console.log(this.card);
    //
    // console.log("Trong bill detail có billDto và bill transaction")
    // console.log("Exbill full cấu trúc: ");
    // console.dir(this.exFull);
    //
    // console.log("kiểu body .JSON nha !!!!")
    // console.log(JSON.stringify(this.exFull));

    //Bill full to customer-accept
    this.sharedService.setDataExportingbillFull(this.exFull);
    this.router.navigate(['./shipping'])

  }

  btnLogin() {
    this.customerService.getUser(this.username, this.password).subscribe(
      (res) => {
        console.log(res);
        this.customerInfo = res;
        //set data acccount for customer
        //this.shareService.setDataCustomerAccount(this.customerInfo);
        localStorage.setItem('customer', JSON.stringify(this.customerInfo));
        if (this.customerInfo != null) {
          this.isLoading = true;
          setTimeout(() => {
            this.isLoading = false;
            //reset page after loading
            this.router.navigate(['./shipping'])
            //Reload page khi chuyen trang
            this.router.events.subscribe(event => {
              if (event instanceof NavigationEnd) {
                //load page reset
              }
            })
          }, 2000);
        }
      },
      (error) => {
        this.isCheckLogin = true;
      }
    )
  }

  ngOnInit(): void {
    //Tu dong Login neu account Login
    const customerInfo = localStorage.getItem('customer');
    if (customerInfo != null) {
      this.username = JSON.parse(customerInfo).phone;
      this.password = JSON.parse(customerInfo).password;
      //Khach hang da dang nhap lay toan bo thong tin khach hang
      this.btnLogin();
      this.createBillPayment();
    }
  }
}
