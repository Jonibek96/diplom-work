import {Component, Inject, OnInit} from '@angular/core';
import {DeleteDocComponent} from '../delete-doc/delete-doc.component';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-dialog-error',
  templateUrl: './dialog-error.component.html',
  styleUrls: ['./dialog-error.component.css']
})
export class DialogErrorComponent  {

  constructor(public dialogRef: MatDialogRef<DeleteDocComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
