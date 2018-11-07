import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tabFilter'

})
export class TabFilterPipe implements PipeTransform {

  transform(tabList, searchStr: string, fielName: string) {
    if (tabList.length === 0 || searchStr === '') {
      return tabList;
    }
    return tabList.filter(tab => tab[fielName].toLowerCase().indexOf(searchStr.toLowerCase()) !== -1 );
  }

}
