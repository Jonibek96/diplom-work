import {Component,
  OnInit,
  Input,
  } from '@angular/core';

import {DSodir, DVorid, Filter, NamHjVorid, SolonaVorid, SolonaSodir} from '../models/interfaces';
import {DataService} from '../services/data.service';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-hisobot-vakt',
  templateUrl: './hisobot-vakt.component.html',
  styleUrls: ['./hisobot-vakt.component.css']
})
export class HisobotVaktComponent implements OnInit {
  @Input() filter: Filter;
  hisobot: NamHjVorid [] = [];
  hisobot1: NamHjVorid [] = [];
  solonaVorid: SolonaVorid[] = [];
  solonaSodir: SolonaSodir[] = [];
  data: DVorid;
  mactubi: DVorid[] = [];
  constructor(private dataService: DataService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.dataService.getHujatVorid().subscribe(result => {
        result.data.forEach(item => {
          this.hisobot.push({
            id: +item.id,
            name: item.name
          });
        });
      }
    );

    if (this.filter.report === 'currentMonth' || this.filter.report === 'lastMonth' || this.filter.report === 'year') {
      this.dataService.getVoridotBySpecType(this.filter).subscribe(res => {
        res.data.forEach(item => {
          this.solonaVorid.push({
            count: +item.count,
            month: +item.month,
            type: +item.type
          });
        });
      });
    }

    this.dataService.getHujatSodir().subscribe(result1 => {
      result1.data.forEach(item => {
        this.hisobot1.push({
          id: +item.id,
          name: item.name
        });
      });
    });

    // if (this.filter.report === 'currentMonth' || this.filter.report === 'lastMonth' || this.filter.report === 'year') {
      this.dataService.getSodirotBySpecType(this.filter).subscribe(res => {
        res.data.forEach(item => {
          this.solonaSodir.push({
            count: +item.count,
            month: +item.month,
            type: +item.type
          });
        });
      });
    // }

    this.dataService.getVoridotByFilter(this.filter).subscribe(result => {
      if (!result.error) {
        result.data.forEach((item, i) => {
          this.mactubi.push(item);
        });
      }
    });
  }

  getElByTypeAndMonthVorid(type: number, month: number) {
    return this.solonaVorid.find(item => item.type === type && item.month === month);
  }

  getElByTypeVorid(type: number) {
    return this.solonaVorid.find(item => item.type === type);
  }

  getSummaCountVorid(type: number) {
    let sum = 0;
    this.solonaVorid.forEach(item => {
      if (item.type === type) {
        sum += +item.count;
      }
    });
    return sum;
  }

  getSummaMonthCountVorid(type: number) {
    let sum = 0;
    this.solonaVorid.forEach(item => {
      if (item.type !== 0) {
        sum += +item.count;
      }
    });
    return sum;
  }

  getElByTypeAndMonthSodir(type: number, month: number) {
    return this.solonaSodir.find(item => item.type === type && item.month === month);
  }

  getElByTypeSodir(type: number) {
    return this.solonaSodir.find(item => item.type === type);
  }

  getSummaCountSodir(type: number) {
    let sum = 0;
    this.solonaSodir.forEach(item => {
      if (item.type === type) {
        sum += +item.count;
      }
    });
    return sum;
  }

  getSummaMonthCountSodir(type: number) {
    let sum = 0;
    this.solonaSodir.forEach(item => {
      if (item.type !== 0) {
        sum += +item.count;
      }
    });
    return sum;
  }

  print() {
    window.print();
  }

  // printToCart(print: string){
  //     let popupWinindow;
  //     let innerContents = document.getElementById(print).innerHTML;
  //     popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
  //     popupWinindow.document.open();
  //     popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + innerContents + '</html>');
  //     popupWinindow.document.close();
  //   }

}
