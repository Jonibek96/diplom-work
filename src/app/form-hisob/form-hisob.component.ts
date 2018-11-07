import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  OnInit,
  Type,
  ViewChild,
  ViewContainerRef,
  Output, Input, AfterViewInit,
} from '@angular/core';
import {DVorid, Filter, NamHjVorid} from '../models/interfaces';
import {DataService} from '../services/data.service';
import {HisobotVaktComponent} from '../hisobot-vakt/hisobot-vakt.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {DialogErrorComponent} from '../dialog-error/dialog-error.component';
import {HisobotVaktsodirComponent} from '../hisobot-vaktsodir/hisobot-vaktsodir.component';

@Component({
  selector: 'app-form-hisob',
  templateUrl: './form-hisob.component.html',
  styleUrls: ['./form-hisob.component.css'],
  entryComponents: [
    HisobotVaktComponent,
    HisobotVaktsodirComponent
  ]
})
export class FormHisobComponent implements OnInit {
  namHjVorid: NamHjVorid [] = [];
  namHjSodir: NamHjVorid [] = [];

  reportType: string;
  reportType2: string;

  filter: Filter;
  filterSodir: Filter;

  @ViewChild('content', {read: ViewContainerRef})
  parent: ViewContainerRef;
  cmpRef: ComponentRef<HisobotVaktComponent>;
  type: Type<HisobotVaktComponent>;

  hisobotVaktComponent = HisobotVaktComponent;
  hisobotVaktsodirComponent = HisobotVaktsodirComponent;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private dataService: DataService,
              public dialog: MatDialog,){

  }

  ngOnInit() {
    this.setToDefault();
    this.dataService.getHujatVorid().subscribe(result => {
        result.data.forEach(item=>{
          this.namHjVorid.push(item)
        })
      }
    );
    this.dataService.getHujatSodir() .subscribe(result1 =>{
      result1.data.forEach(item1 =>{
        this.namHjSodir.push(item1)
      })
    })
  }

  setToDefault() {
    this.reportType = null;
    this.reportType2 = null;

    this.filter = {
      from: null,
      to: null,
      report: null,
      typeOfDocument: null,
    };

    this.filterSodir = {
      from: null,
      to: null,
      report: null,
      typeOfDocument: null,
    };
  }

  selectedChange(){
    this.setToDefault();
    if (this.cmpRef) { this.cmpRef.destroy(); }
  }

  filterOption(option) {

    let start = new Date(), end = new Date();

    switch (option) {
      case 'none':
        start === null;
        end  === null;
        break;

      case 'day':
        start.setDate(start.getDate());
        end.setDate(end.getDate());
        break;

      case 'yesterday':
        start.setDate(start.getDate() - 1);
        end.setDate(end.getDate() - 1);
        break;
      case 'currentWeek':
        start.setDate(start.getDate() - start.getDay());
        end.setDate(end.getDate() - end.getDay() + 6);
        break;
      case 'lastWeek':
        start.setDate(start.getDate() - start.getDay() - 7);
        end.setDate(end.getDate() - end.getDay() - 1);
        break;

      case 'currentMonth':
        start = new Date(start.getFullYear(), start.getMonth(), 1);
        end = new Date(end.getFullYear(), end.getMonth() + 1, 0);
        break;
      case 'lastMonth':
        start = new Date(start.getFullYear(), start.getMonth() - 1, 1);
        end = new Date(end.getFullYear(), end.getMonth(), 0);
        break;
      case 'year':
        start = new Date(start.getFullYear(), 0, 1);
        end = new Date(end.getFullYear(), 12, 0);
        break;

    }
    return {
      start: start,
      end: end
    }
  }

  SelectionChangeVorid() {
    this.filter.from = null;
    this.filter.to = null;
    this.filter.report = this.reportType;
  }

  SelectionChangeSodir() {
    this.filterSodir.from = null;
    this.filterSodir.to = null;
    this.filterSodir.report = this.reportType2;
  }
  getDataByFilterVorid() {
    if ( this.filter.report === null && this.filter.typeOfDocument === null
      || this.reportType === 'null' && this.filter.typeOfDocument === 'null'
      || this.reportType === 'yesterday' && this.filter.typeOfDocument === '0'
      || this.reportType === 'currentWeek' && this.filter.typeOfDocument === '0'
      || this.reportType === 'lastWeek' && this.filter.typeOfDocument === '0'
      || this.reportType === 'currentMonth' && this.filter.typeOfDocument !== '0'
      || this.reportType === 'lastMonth' && this.filter.typeOfDocument !== '0'
      || this.reportType === 'year' && this.filter.typeOfDocument !== '0'
    ) {
      const dialogRef = this.dialog.open(DialogErrorComponent, {
        width: '530px',
        height: '110px'
      });

    }
     else {
        if (this.reportType !== undefined) {
        let obj = this.filterOption(this.reportType);
        if (this.filter.from === null && this.filter.to === null) {
          this.filter.from = obj.start;
          this.filter.to = obj.end;
        }
      }

      this.createComponentDin(this.hisobotVaktComponent, {
        from: this.filter.from,
        to: this.filter.to,
        typeOfDocument: this.filter.typeOfDocument.toString(),
        report: this.filter.report
      });
    }
  }

  getDataByFilterSodir() {
    if (this.filterSodir.report === null && this.filterSodir.typeOfDocument === null
      || this.reportType2 === 'null' && this.filterSodir.typeOfDocument === 'null'
      || this.reportType2 === 'year' && this.filterSodir.typeOfDocument !== '0'
      || this.reportType2 === 'yesterday' && this.filterSodir.typeOfDocument === '0'
    ) {
      const dialogRef = this.dialog.open(DialogErrorComponent, {
        width: '530px',
        height: '110px'
      });

    }
     else {
      if (this.reportType2 !== undefined){
        let obj = this.filterOption(this. reportType2);
        if (this.filterSodir.from === null && this.filterSodir.to === null) {
          this.filterSodir.from = obj.start;
          this.filterSodir.to = obj.end;
        }
      }

      this.createComponentDin(this.hisobotVaktsodirComponent,{
        from: this.filterSodir.from,
        to: this.filterSodir.to,
        typeOfDocument: this.filterSodir.typeOfDocument.toString(),
        report: this.filterSodir.report
      });
    }
  }


  createComponentDin(cmp, filter: Filter) {

    if (this.cmpRef) { this.cmpRef.destroy(); }
    this.type = cmp;
    const childComponent = this.componentFactoryResolver.resolveComponentFactory(this.type);
    const CmpRef = this.parent.createComponent(childComponent);
    CmpRef.instance.filter = filter;
    this.cmpRef = CmpRef;

  }

}
