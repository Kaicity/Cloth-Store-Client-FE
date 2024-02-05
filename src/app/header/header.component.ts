import {Component, Input, OnInit} from '@angular/core';
import { CustomerModel } from "../../BM-API/dtos/customer.model";
import { Router } from "@angular/router";
import {SharedService} from "../../BM-API/Services/Data/ShareService";

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
  optionLanguages: OptionLanguages[] = [{value: 'VN', viewValue: 'Tiếng Việt'}, {value: 'US', viewValue : 'ENglish'}];
  isCheckHasAccount: boolean = true;

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
    if (localStorage.getItem('customer') == null) {
      this.router.navigate(['./form-login']);
    }
    else {
      return;
    }
  }
}
