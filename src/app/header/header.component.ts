import {Component, Input, OnInit} from '@angular/core';
import { CustomerModel } from "../../bm-api/dtos/customer.model";
import { Router } from "@angular/router";
import {SharedService} from "../../bm-api/Services/Data/ShareService";
import {ExportingBillTransactionModel} from "../../bm-api/dtos/exporting-bill-transaction.model";

interface OptionLanguages {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  customerAccountTitle!: CustomerModel
  isLoading: boolean = false;
  titleName!: string;
  optionLanguages: OptionLanguages[] = [{value: 'VN', viewValue: 'Tiếng Việt'}, {value: 'US', viewValue: 'ENglish'}];
  isCheckHasAccount: boolean = true;
  isShowMenuUser: boolean = true;
  isShowMenuMobile: boolean = true;

  cartItem: ExportingBillTransactionModel[] = [];

  constructor(private router: Router, private shareService: SharedService) {
    this.customerAccountTitle = new CustomerModel();
  }

  ngOnInit(): void {
    const storeCustomer = localStorage.getItem('customer');
    if (storeCustomer) {
      const parseCustomer = JSON.parse(storeCustomer);
      console.log("Test account " + parseCustomer.id);
      this.titleName = parseCustomer.fullName
      this.isCheckHasAccount = false;
    }

    //Load card item đã được lưu trữ localstore
    const getCardItemSaving = localStorage.getItem('card');
    if (getCardItemSaving) {
      this.cartItem = [];
      this.cartItem = JSON.parse(getCardItemSaving);
    }
  }

  btnLogout() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      //reset page after loading
      console.log("Loading page!!!!")
    }, 2000);
    localStorage.removeItem('customer');
    this.router.navigate(['./food'])
    window.location.reload();
  }

  btnToPageLogin() {
    this.isShowMenuMobile = true;
    if (localStorage.getItem('customer') == null) {
      this.router.navigate(['./form-login']);
    } else {
      return;
    }
  }

  openMenuUser() {
    if(!this.isShowMenuUser){
      this.isShowMenuUser = true;
      return;
    }
    this.isShowMenuUser = false;
  }

  btnShowMenuMobile() {
    this.isShowMenuMobile = false;
  }

  btnCloseMenuMobile() {
    this.isShowMenuMobile = true;
  }
}
