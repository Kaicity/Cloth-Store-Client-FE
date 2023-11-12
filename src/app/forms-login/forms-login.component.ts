import { Component } from '@angular/core';
import { CustomerDto } from '../../BM-API/Dtos/CustomerDto';

@Component({
  selector: 'app-forms-login',
  templateUrl: './forms-login.component.html',
  styleUrls: ['./forms-login.component.css']
})
export class FormsLoginComponent {

  customer!: CustomerDto;

  constructor(){
    this.customer = new CustomerDto();
  }

  onSubmit(): void{
    console.log("Submit form");
  }
}
