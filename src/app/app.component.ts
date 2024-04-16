import {Component, HostListener} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ClothStoreClient';

  isShow!: boolean;

  constructor() { }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.scrollY > 1000) { // Thay 300 bằng khoảng cách muốn hiển thị nút
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
