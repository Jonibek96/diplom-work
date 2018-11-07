import { Injectable } from '@angular/core';

import {
  HttpClient,
  HttpHeaders,
  HttpParams
} from '@angular/common/http';
import{AuthService} from './auth.service';
import {
  DVor,
  DSod,
  UpdateResponse,
  DVorid,
  ResAddStandard,
  DSodir,
  HjVorid, Filter, VSolona, SSolona

} from '../models/interfaces';

@Injectable()
export class DataService {

  constructor(private httpClient: HttpClient,
              private auth: AuthService) {
  }

  getDate (date) {
    let day = date.getDate(),
      month = date.getMonth() + 1;
      // hours = date.getHours(),
      // minut = date.getMinutes(),
      // second = date.getSeconds();

    const year = date.getFullYear();

    if (month < 10) { month = '0' + month; }
    if (day < 10) { day = '0' + day; }
    // if (hours < 10) {hours = '0' + hours}
    // if (minut < 10) {minut = '0' + minut}
    // if (second < 10) {second = '0' + second}

    // console.log(year + "-" + month + "-" + day + ' ' +  hours + ':' + minut + ':' + second);
    return year + '-' + month + '-' + day;

  }

  getHujatVorid() {
    const body = new HttpParams()
      .set('route', 'hjvorid')
      .set('operation', 'list')
      .set('token', this.auth.token);

    return this.auth.http.post(this.auth.host, body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      }).map((response: HjVorid) => {
      return response;
    });
    // return this.auth.http.get(
    //   this.auth.host + '/self.php?route=hjvorid&operation=list&token=' + this.auth.token
    // ).map((response: HjVorid) => {
    //   return response;
    // });
  }

  getHujatSodir() {
    const body = new HttpParams()
      .set('id', '1')
      .set('route', 'hjvorid')
      .set('operation', 'one')
      .set('token', this.auth.token);

    return this.auth.http.post(this.auth.host, body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      }).map((response: HjVorid) => {
      return response;
    });
    // return this.auth.http.get(
    //   this.auth.host + '/self.php?route=hjvorid&operation=one&id=1&token=' + this.auth.token
    // ).map((response: HjVorid) => {
    //   return response;
    // });
  }

  getVoridot(type: number) {

    const body = new HttpParams()
      .set('id', type.toString())
      .set('route', 'hvorid')
      .set('operation', 'one')
      .set('token', this.auth.token);

    return this.auth.http.post(this.auth.host, body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      }).map((response: DVor) => {
      return response;
    });
  }

  getVoridotByFilter(filter: Filter) {
    const body = new HttpParams()
      .set('from', this.getDate(filter.from))
      .set ('to', this.getDate(filter.to) )
      .set ('type',  filter.typeOfDocument )
      .set ('report',  filter.report )
      .set('route', 'hvorid')
      .set('operation', 'list')
      .set('token', this.auth.token);

    return this.auth.http.post(this.auth.host, body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      }).map((response: DVor) => {
      return response;
    });

    // return this.auth.http.get(
    //   this.auth.host + 'self.php?route=hvorid&operation=list&from=' + this.getDate(filter.from)+
    //   '&to=' + this.getDate(filter.to) + '&type=' + filter.typeOfDocument + '&report=' + filter.report + '&token=' + this.auth.token
    // ).map((response: DVor) => {
    //   return response;
    // });
  }

  getSodirotByFilter(filter: Filter) {
    const body = new HttpParams()
      .set('from', this.getDate(filter.from))
      .set ('to', this.getDate(filter.to) )
      .set ('type',  filter.typeOfDocument )
      .set ('report',  filter.report )
      .set('route', 'hsodir')
      .set('operation', 'list')
      .set('token', this.auth.token);

    return this.auth.http.post(this.auth.host, body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      }).map((response: DSod) => {
      return response;
    });

    // return this.auth.http.get(
    //   this.auth.host + 'self.php?route=hsodir&operation=list&from=' + this.getDate(filter.from) +
    //   '&to=' + this.getDate(filter.to) + '&type=' + filter.typeOfDocument + '&report=' + filter.report + '&token=' + this.auth.token
    // ).map((response: DSod) => {
    //   return response;
    // });
  }

  getVoridotBySpecType(filter: Filter) {

    if (filter.report === 'currentMonth' || filter.report === 'lastMonth') {
      filter.report = 'month';
    }
    const body = new HttpParams()
      .set('report', filter.report)
      .set ('year',  new Date(filter.from).getFullYear().toString())
      .set ('month',  (+(new Date(filter.from).getMonth()) + 1).toString() )
      .set('route', 'hvorid')
      .set('operation', 'list')
      .set('token', this.auth.token);

    return this.auth.http.post(this.auth.host, body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      }).map((response: VSolona) => {
      return response;
    });

  //   return this.auth.http.get(
  //     this.auth.host + 'self.php?route=hvorid&operation=list&report=' + filter.report  + '&year=' +
  //     new Date(filter.from).getFullYear() + '&month=' + (+(new Date(filter.from).getMonth()) + 1) + '&token=' + this.auth.token
  //   ).map((response: VSolona) => {
  //     return response;
  //   });
  }

  getSodirotBySpecType(filter: Filter) {

    if (filter.report === 'currentMonth' || filter.report === 'lastMonth') {
      filter.report = 'month';
    }
    const body = new HttpParams()
      .set('report', filter.report)
      .set ('year',  new Date(filter.from).getFullYear().toString())
      .set ('month',  (+(new Date(filter.from).getMonth()) + 1).toString() )
      .set('route', 'hsodir')
      .set('operation', 'list')
      .set('token', this.auth.token);

    return this.auth.http.post(this.auth.host, body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      }).map((response: SSolona) => {
      return response;
    });
    // return this.auth.http.get(
    //   this.auth.host + 'self.php?route=hsodir&operation=list&report=' + filter.report  + '&year=' +
    //   new Date(filter.from).getFullYear() + '&month=' + (+(new Date(filter.from).getMonth()) + 1) + '&token=' + this.auth.token
    // ).map((response: SSolona) => {
    //   return response;
    // });
  }

  deleteDocument (id: number) {
    const body = new HttpParams()
      .set('id', id.toString())
      .set('route', 'hvorid')
      .set('operation', 'remove')
      .set('token', this.auth.token);

    return this.auth.http.post(this.auth.host, body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      }).map((response: UpdateResponse) => {
      return response;
    });
  }

  insertDoc(documents: DVorid) {
    const body = new HttpParams()
      .set('id', '')
      .set('type', documents.type)
      .set('num', documents.num.toString())
      .set('sanaVoridot', this.getDate(documents.sanaVoridot))
      .set('azKujoVoridot', documents.azKujoVoridot)
      .set('mazmunHujat', documents.mazmunHujat)
      .set('hujatiRavona', documents.hujatiRavona)
      .set('shaxsiMasul', documents.shaxsiMasul )
      .set('sanaIjro', this.getDate( documents.sanaIjro) )
      .set('javobiMak', documents.javobiMak )
      .set('route', 'hvorid')
      .set('operation', 'insert')
      .set('token', this.auth.token);

    return this.auth.http.post(this.auth.host, body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      }).map((response: ResAddStandard) => {
      return response;
    });
  }



  updateDoc (dociments: DVorid) {
    const body = new HttpParams()
      .set('id', dociments.id.toString())
      .set('type', dociments.type)
      .set('num', dociments.num.toString())
      .set('sanaVoridot', this.getDate(dociments.sanaVoridot))
      .set('azKujoVoridot', dociments.azKujoVoridot)
      .set('mazmunHujat', dociments.mazmunHujat)
      .set('hujatiRavona', dociments.hujatiRavona)
      .set('shaxsiMasul', dociments.shaxsiMasul)
      .set('sanaIjro', this.getDate( dociments.sanaIjro) )
      .set('javobiMak', dociments.javobiMak)
      .set('route', 'hvorid')
      .set('operation', 'update')
      .set('token', this.auth.token);

    return this.auth.http.post(this.auth.host, body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      }).map((response: UpdateResponse) => {
      return response;
    });
  }

  getSodirot(type: number) {
    const body = new HttpParams()
      .set('id', type.toString())
      .set('route', 'hsodir')
      .set('operation', 'one')
      .set('token', this.auth.token);

    return this.auth.http.post(this.auth.host, body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      }).map((response: DSod) => {
      return response;
    });

    // return this.auth.http.get(
    //   this.auth.host + 'self.php?route=hsodir&operation=one&id=' + type + '&token=' + this.auth.token
    // ).map((response: DSod) => {
    //   return response;
    // });
  }

  deleteDocSodirot (id: number) {
    const body = new HttpParams()
      .set('id', id.toString())
      .set('route', 'hsodir')
      .set('operation', 'remove')
      .set('token', this.auth.token);

    return this.auth.http.post(this.auth.host, body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      }).map((response: UpdateResponse) => {
      return response;
    });
  }

  insertDocSodirot(docments: DSodir) {
    const body = new HttpParams()
      .set('id', '')
      .set('type', docments.type)
      .set('nomerSodir', docments.nomerSodir)
      .set('sanaiSodir', this.getDate( docments.sanaiSodir) )
      .set('baKujoFirist', docments.baKujoFirist)
      .set('mazmun', docments.mazmun)
      .set('ijrokunanda', docments.ijrokunanda)
      .set('route', 'hsodir')
      .set('operation', 'insert')
      .set('token', this.auth.token);

    return this.auth.http.post(this.auth.host, body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      }).map((response: ResAddStandard) => {
      return response;
    });
  }

  updateDocSodirot (documents: DSodir) {
    const body = new HttpParams()
      .set('id', documents.id.toString())
      .set('type', documents.type)
      .set('nomerSodir', documents.nomerSodir)
      .set('sanaiSodir', this.getDate( documents.sanaiSodir) )
      .set('baKujoFirist', documents.baKujoFirist)
      .set('mazmun', documents.mazmun)
      .set('ijrokunanda', documents.ijrokunanda)
      .set('route', 'hsodir')
      .set('operation', 'update')
      .set('token', this.auth.token);

    return this.auth.http.post(this.auth.host, body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      }).map((response: UpdateResponse) => {
      return response;
    });
  }
}
