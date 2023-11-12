import { Component } from '@angular/core';
import { CustomerDto } from '../../BM-API/Dtos/CustomerDto';

@Component({
  selector: 'app-forms-signin',
  templateUrl: './forms-signin.component.html',
  styleUrls: ['./forms-signin.component.css']
})
export class FormsSigninComponent {
  customer!: CustomerDto
  constructor(){
    this.customer = new CustomerDto;
  }

  onSubmit(): void{
    console.log("CustomerDto registration successfully !")
  }
}
