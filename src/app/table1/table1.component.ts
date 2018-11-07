import {Component,
  Input,
  AfterViewInit,
  ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {DiologVoridComponent} from '../diolog-vorid/diolog-vorid.component';
import {DataService} from '../services/data.service';
import {DVorid} from '../models/interfaces';
import {DeleteDocComponent} from '../delete-doc/delete-doc.component';
import {MatPaginator} from '@angular/material';

@Component({
  selector: 'app-table1',
  templateUrl: './table1.component.html',
  styleUrls: ['./table1.component.css']
})
export class Table1Component implements AfterViewInit {
  searchTable = '';
  @Input() type: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  data: DVorid;
  mactubi: DVorid[] = [];
  constructor(public dialog: MatDialog,
              private dataService: DataService) {
  }


  ngAfterViewInit() {
    this.dataService.getVoridot(this.type).subscribe(result => {
      if (!result.error) {
        result.data.forEach((item, i) => {
          this.mactubi.push(item);
        });
      }
    });
  }

  editDoc(z: DVorid) {
    z.sanaVoridot = new Date( z.sanaVoridot);
    z.sanaIjro = new Date (z.sanaIjro);
    const dialogRef = this.dialog.open(DiologVoridComponent, {
      data: z
    });

    const iSub = this.mactubi.findIndex(x => x.id === z.id);

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.mactubi.splice(iSub, 1, result);
      }
    });
  }

  addDoc() {
  const dialogRef = this.dialog.open(DiologVoridComponent, {
    data: {
      num: '',
      sanaVoridot: '',
      type: this.type,
      azKujoVoridot: '',
      mazmunHujat: '',
      hujatiRavona: '',
      shaxsiMasul: '',
      sanaIjro: '',
      javobiMak: ''
    }
});

  dialogRef.afterClosed().subscribe((result: DVorid) => {
    if (result !== undefined) {
      this.mactubi.push(result);
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
        this.dataService.deleteDocument(id).subscribe((data) => {
          if (!data.error) {
            this.mactubi.splice(index, 1);
          } else {
            console.error('Error has been happened while deleting Standard subject');
          }
        });
      }
    });
  }

}

