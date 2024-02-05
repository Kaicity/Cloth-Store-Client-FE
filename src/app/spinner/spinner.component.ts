import { Component, Input } from '@angular/core';
import { LoaderService } from 'src/BM-API/Services/Animation/Loader-service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent {
  @Input() show: Boolean = false;
  constructor(){}
}
