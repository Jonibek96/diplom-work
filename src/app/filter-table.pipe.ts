import { Pipe, PipeTransform } from '@angular/core';
import {DVorid} from './models/interfaces';

@Pipe({
  name: 'filterTable',
  pure: false
})
export class FilterTablePipe implements PipeTransform {
  z: DVorid;
  transform(tableList, searchTable: string, fielName: string) {
    if (tableList.length === 0 || searchTable === '') {
      return tableList;
    }
    return tableList.filter(z => z[fielName].toLowerCase().indexOf(searchTable.toLowerCase()) !== -1 );

  }

}
