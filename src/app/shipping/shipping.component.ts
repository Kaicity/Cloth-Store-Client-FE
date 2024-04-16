import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CustomerModel} from 'src/bm-api/dtos/customer.model';
import {CustomerService} from 'src/bm-api/Services/warehouse/Customer-service';
import {SharedService} from "../../bm-api/Services/Data/ShareService";
import {ExportingbillService} from "../../bm-api/Services/agency/ExportingbillService";
import {ExportingBillTransactionModel} from 'src/bm-api/dtos/exporting-bill-transaction.model';
import {CustomerNotLoginModel} from 'src/bm-api/dtos/customer-notLogin.model';
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css']
})
export class ShippingComponent implements OnInit {
  customer!: CustomerModel;
  customerNotLogin!: CustomerNotLoginModel;
  isLoading: Boolean = false;
  oldCardProduct!: ExportingBillTransactionModel[]
  howProduct: Number = 0;
  calculatorDemo: number = 0;
  calcuToTal: number = 0;
  feeDelivery: number = 0;

  //Form enter thong tin khach hang
  customerFullName!: string;
  customerPhone!: string;
  customerEmail!: string;
  customerAddress!: string;


  constructor(private customerService: CustomerService, private router: Router, private shareService: SharedService,
    private exportingBillService: ExportingbillService, public dialog: MatDialog) {
    window.scrollTo(0, 0);
    this.customer = new CustomerModel();
    this.customerNotLogin = new CustomerNotLoginModel();
  }

  onSubmit(): void {
    //gửi dữ liệu
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    //load card old
    this.getAllCardProducts();
    const dataCustomer = localStorage.getItem('customer');
    if (dataCustomer != null) {
      var customerData = JSON.parse(dataCustomer);
      this.customer = customerData;
      //Lay thong tin khach hang
      this.customerFullName = this.customer.fullName!;
      this.customerPhone = this.customer.phone!;
      this.customerEmail = this.customer.email!;
      this.customerAddress = this.customer.address!;
    }
  }

  btnAcceptOrder() {
    this.isLoading = true;
    let dataExportingBillFull = this.shareService.getDataExportingBillFull();
    //Thong tin khach hang khong can dang nhap
    if (localStorage.getItem('customer') == null) {
      this.customerNotLogin.fullName = this.customerFullName;
      this.customerNotLogin.phone = this.customerPhone;
      this.customerNotLogin.email = this.customerEmail;
      this.customerNotLogin.address = this.customerAddress;
      dataExportingBillFull.exportingBill!.customerNotLogin = this.customerNotLogin;
    }

    //Create bill API
    this.exportingBillService.addBill(dataExportingBillFull).subscribe(res => {
    })

    //Hoan tat qua trinh mua va dat hang ???
    localStorage.removeItem('card');

    //GET API SMS
    setTimeout(() => {
      this.isLoading = false;

      this.router.navigate(['/success-order']);
    }, 2000);
  }

  //Lay danh sach gio hang chinh thuc
  getAllCardProducts(): void {
    //Su dung shareService de lay ra
    this.oldCardProduct = this.shareService.getDataExportingbillTransaction();

    this.howProduct = this.oldCardProduct.length;
    this, this.oldCardProduct.forEach(element => {
      if (element.amount) {
        this.calculatorDemo += element.amount;
      }
    });
    this.calcuToTal = this.calcuToTal + this.calculatorDemo + this.feeDelivery;
  }
}
