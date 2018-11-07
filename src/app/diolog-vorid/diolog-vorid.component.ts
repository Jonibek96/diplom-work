import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DVor, DVorid} from '../models/interfaces';
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-diolog-vorid',
  templateUrl: './diolog-vorid.component.html',
  styleUrls: ['./diolog-vorid.component.css']
})
export class DiologVoridComponent  {

  add = true;
  constructor(public dialogRef: MatDialogRef<DiologVoridComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DVorid,
              private dataService: DataService) {
    if (data.azKujoVoridot !== '') {
      this.add = false;

    }
  }

  onNoClick1 (): void {
    this.dialogRef.close();
  }

  confirmEditMactub () {
    this.dataService.updateDoc(this.data).subscribe( resp => {

      if (!resp.error) {
        this.dialogRef.close(this.data);
      } else {
        console.error('Error happened while updating subject');
      }
    });
  }

  confirmAddMactub () {
    this.dataService.insertDoc(this.data).subscribe( resp => {
      if (!resp.error) {
        this.data.id = resp.data.id;
        this.dialogRef.close(this.data);
      } else {
        console.error('Error happened while updating subject');
      }
    });
  }

}
