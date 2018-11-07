import { Component,  Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DataService} from '../services/data.service';
import {DSodir} from '../models/interfaces';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})

export class DialogComponent {
   add = true;
  buttonDisabled: boolean;
  constructor(public dialogRef: MatDialogRef<DialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DSodir,
              private dataService: DataService) {
    if (data.baKujoFirist !== '') {
      this.add = false;
    }
  }




  addTable() {
    this.dialogRef.close(this.data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmEditMactub1 () {
    this.dataService.updateDocSodirot(this.data).subscribe( resp => {

      if (!resp.error) {
        this.dialogRef.close(this.data);
      } else {
        console.error('Error happened while updating subject');
      }
    });
  }

  confirmAddMactub1 () {
    this.dataService.insertDocSodirot(this.data).subscribe( resp => {
      if (!resp.error) {
        this.data.id = resp.data.id;
        this.dialogRef.close(this.data);
      } else {
        console.error('Error happened while updating subject');
      }
    });
  }
}

