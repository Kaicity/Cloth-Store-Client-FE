import { Component } from '@angular/core';
import { Customer } from '../../BM-API/Dtos/Customer';

@Component({
  selector: 'app-forms-login',
  templateUrl: './forms-login.component.html',
  styleUrls: ['./forms-login.component.css']
})
export class FormsLoginComponent {

  customer!: Customer;

  constructor(){
    this.customer = new Customer();
  }

  onSubmit(): void{
    console.log("Submit form");
  }
}
