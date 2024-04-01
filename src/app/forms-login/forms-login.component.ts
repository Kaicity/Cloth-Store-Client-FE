import {Component, OnInit} from '@angular/core';
import { CustomerModel } from '../../bm-api/dtos/customer.model';
import {CustomerService} from "../../bm-api/Services/warehouse/Customer-service";
import {NavigationEnd, Route, Router} from "@angular/router";
import {SharedService} from "../../bm-api/Services/Data/ShareService";

@Component({
  selector: 'app-forms-login',
  templateUrl: './forms-login.component.html',
  styleUrls: ['./forms-login.component.css']
})
export class FormsLoginComponent{
  isLoading: boolean = false;
  username!: string;
  password!: string;
  isCheckLogin: boolean = false;
  customerInfo!: CustomerModel;

  constructor(private customerService: CustomerService, private router: Router, private shareService: SharedService){
    this.customerInfo = new CustomerModel();
  }

  onSubmit(): void{
  }

  btnLogin(){
    //Reset account truoc khi dang nhap
    localStorage.removeItem('customer');

    this.customerService.getUser(this.username, this.password).subscribe(
      (res) => {
        console.log(res);
        this.customerInfo = res;
        //set data acccount for customer
        //this.shareService.setDataCustomerAccount(this.customerInfo);
        localStorage.setItem('customer', JSON.stringify(this.customerInfo)); // Chuyen doi doi tuong customer sang chuoi JSON save bien toan cuc
        if(this.customerInfo != null){
          this.isCheckLogin = false;
          this.isLoading = true;
          setTimeout(() => {
            this.isLoading = false;
            //reset page after loading
            this.router.navigate(['./product'])
            //Reload page khi chuyen trang
            this.router.events.subscribe(event => {
              if(event instanceof NavigationEnd){
                //load page reset
                window.location.reload();
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

}
