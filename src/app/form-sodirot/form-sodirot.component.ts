import {Component,
  OnInit,
  Inject,
  Input,
  AfterViewInit,
  Output} from '@angular/core';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {DialogComponent} from '../dialog/dialog.component';
import {DSodir, DVorid} from '../models/interfaces';
import {DataService} from '../services/data.service';
import {DeleteDocComponent} from '../delete-doc/delete-doc.component';

@Component({
  selector: 'app-form-sodirot',
  templateUrl: './form-sodirot.component.html',
  styleUrls: ['./form-sodirot.component.css']
})

export class FormSodirotComponent implements AfterViewInit {
  searchTable = '';
  @Input() type: number;
  mactub: DSodir[] = [];
  data: DSodir;
  constructor(public dialog: MatDialog,
              private dataService: DataService) {
  }

  ngAfterViewInit() {
    this.dataService.getSodirot(this.type).subscribe(result => {
      if (!result.error) {
        result.data.forEach((item, i) => {
          this.mactub.push(item);
        });
      }
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        nomerSodir: '',
        sanaiSodir: '',
        baKujoFirist:  '',
        mazmun: '',
        ijrokunanda: ''
          }
    });



    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        // console.log(result);
        this.mactub.push(result);
      }
    });
  }

  editDoc(s: DSodir) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: s
    });

    const iSub = this.mactub.findIndex(x => x.id === s.id);

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.mactub.splice(iSub, 1, result);
      }
    });

  }

  addDoc() {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        type: this.type,
        nomerSodir: '',
        sanaiSodir: '',
        baKujoFirist:  '',
        mazmun: '',
        ijrokunanda: ''
      }
    });

    dialogRef.afterClosed().subscribe((result: DSodir) => {
      if (result !== undefined) {
        this.mactub.push(result);
      }
    });

  }

  deleteDoc(id: number, index: number) {

    const dialogRef = this.dialog.open(DeleteDocComponent, {
      width: '500px',
      data: {
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.dataService.deleteDocSodirot(id).subscribe((data) => {
          if (!data.error) {
            console.log('Deleted id = ' + id);
            this.mactub.splice(index, 1);
          } else {
            console.error('Error has been happened while deleting Standards subject');
          }
        });
      }
    });
  }

}
