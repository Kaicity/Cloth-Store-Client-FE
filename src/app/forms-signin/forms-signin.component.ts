import { Component } from '@angular/core';
import { CustomerModel } from '../../bm-api/dtos/customer.model';
import {CustomerService} from "../../bm-api/Services/warehouse/Customer-service";
import { Router } from '@angular/router';
import { SpinnerComponent } from '../spinner/spinner.component';
@Component({
  selector: 'app-forms-signin',
  templateUrl: './forms-signin.component.html',
  styleUrls: ['./forms-signin.component.css']
})
export class FormsSigninComponent {
  customer!: CustomerModel
  checkBoxAgree: boolean = false;
  isLoading: Boolean = false;

  constructor(private customerService:CustomerService, private router: Router){
    this.customer = new CustomerModel;
  }


  createUser(){

   this.customerService.addUser(this.customer).subscribe(res => {
    console.log(res);
   });
    // tự print
     console.log(this.customer);
     this.startLoadingData();
  }
  startLoadingData(): void {
    this.isLoading = true;

    //setTime loading
    setTimeout(() => {
      this.isLoading = false;
      //reset page after loading
      this.router.navigate(['/form-login']);
    }, 2000);
  }

  onSubmit(): void{
    //gửi dữ liệu
    console.log("CustomerModel registration successfully !")
  }
}
