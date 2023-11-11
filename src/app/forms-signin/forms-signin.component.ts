import { Component } from '@angular/core';
import { Customer } from '../../BM-API/Dtos/Customer';

@Component({
  selector: 'app-forms-signin',
  templateUrl: './forms-signin.component.html',
  styleUrls: ['./forms-signin.component.css']
})
export class FormsSigninComponent {
  customer!: Customer
  constructor(){
    this.customer = new Customer;
  }

  onSubmit(): void{
    console.log("Customer registration successfully !")
  }
}
