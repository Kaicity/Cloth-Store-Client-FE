import { Component } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';

@Component({
  selector: 'app-store-service',
  templateUrl: './store-service.component.html',
  styleUrls: ['./store-service.component.css']
})
export class StoreServiceComponent {
  constructor(private router: Router) {
    this.router.events.subscribe((event : Event) => {
      if(event instanceof NavigationEnd){
        window.scrollTo(0, 0);
      }
    })
  }
}
