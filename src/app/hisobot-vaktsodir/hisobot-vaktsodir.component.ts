import {Component,
  Input,
  OnInit} from '@angular/core';

import {DSodir, Filter} from '../models/interfaces';
import {DataService} from '../services/data.service';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-hisobot-vaktsodir',
  templateUrl: './hisobot-vaktsodir.component.html',
  styleUrls: ['./hisobot-vaktsodir.component.css']
})
export class HisobotVaktsodirComponent implements OnInit {
  @Input() filter: Filter;
  mactub: DSodir[] = [];
  data: DSodir;
  constructor(private dataService: DataService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.dataService.getSodirotByFilter(this.filter).subscribe(result => {
      if (!result.error) {
        result.data.forEach((item, i) => {
          this.mactub.push(item);
        });
      }
    });
  }

}
