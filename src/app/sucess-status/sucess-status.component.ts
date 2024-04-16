import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sucess-status',
  templateUrl: './sucess-status.component.html',
  styleUrls: ['./sucess-status.component.css']
})
export class SucessStatusComponent{
  isLoading: boolean = false;

  constructor(private router: Router) {}

  pageLoadingSucess() {
   this.router.navigate(['./']);
  }
}
