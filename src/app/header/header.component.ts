import {Component, OnInit} from '@angular/core';
import {CustomerModel} from "../../bm-api/dtos/customer.model";
import {NavigationEnd, Router} from "@angular/router";
import {ExportingBillTransactionModel} from "../../bm-api/dtos/exporting-bill-transaction.model";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {Observable} from "rxjs";

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
  isCheckHasAccount: boolean = true;
  isShowMenuUser: boolean = true;
  isShowMenuMobile: boolean = true;

  cartItem: ExportingBillTransactionModel[] = [];
  imageUrl!: Observable<any[]>;


  constructor(private router: Router, private storageService: AngularFireStorage) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
      }
    });
    this.customerAccountTitle = new CustomerModel();

    //Firebase storage
    this.storageService.ref("image data client/icon/").getDownloadURL().subscribe(url => {
      this.imageUrl = url;
    });

  }

  ngOnInit(): void {
    const storeCustomer = localStorage.getItem('customer');
    if (storeCustomer) {
      const parseCustomer = JSON.parse(storeCustomer);
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
    if (!this.isShowMenuUser) {
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
