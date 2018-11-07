import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-delete-doc',
  templateUrl: './delete-doc.component.html',
  styleUrls: ['./delete-doc.component.css']
})
export class DeleteDocComponent  {

  constructor(public dialogRef: MatDialogRef<DeleteDocComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
