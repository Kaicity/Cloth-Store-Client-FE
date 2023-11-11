import { Component } from '@angular/core';
import { FoodService } from '../services/food/food.service';
import { FoodDto } from '../../BM-API/Dtos/FoodDto';
import { Route, Event, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{
  foods: FoodDto[] = []; // Tao danh sach chua cac mon an
  isCardVisible = false;

  constructor(private fs: FoodService, private router : Router) {
    this.router.events.subscribe((event : Event) => {
      if(event instanceof NavigationEnd){
        window.scrollTo(0, 0);
      }
    })
  } // Lay tu foodservice


  ngOnInit():void {
    this.foods = this.fs.getAll(); //get

  }

  toogleCard(): void{
    this.isCardVisible = !this.isCardVisible;
    this.router.navigate(['/food'])
  }

  click(id: Number): void {
    this.router.navigate(['/food/id'])
  }
}
