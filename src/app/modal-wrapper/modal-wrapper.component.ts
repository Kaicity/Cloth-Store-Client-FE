import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-modal-wrapper',
  templateUrl: './modal-wrapper.component.html',
  styleUrls: ['./modal-wrapper.component.css']
})
export class ModalWrapperComponent {
  inputValue: string = '';

  constructor(public dialogRef: MatDialogRef<ModalWrapperComponent>) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    // You can do something with the input value here
    console.log('Input value:', this.inputValue);
    this.dialogRef.close();
  }

  onSubmit() {
    console.log("value")
  }
}
