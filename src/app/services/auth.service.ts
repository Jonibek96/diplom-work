import { Injectable } from '@angular/core';
import {
  HttpClient, HttpHeaders, HttpParams
} from '@angular/common/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import {IAuth, UserInfo} from '../models/interfaces';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

  // public host = 'http://asu.techuni.tj/jxapi/';
  public host = 'http://api.techuni.loc/';
  public token: string;

  constructor(public http: HttpClient) {}

  getToken(username: string, password: string): Observable<boolean> {
    return this.http.get(
      this.host + 'self.php?route=auth&operation=login&username=' + username + '&password=' + password
    ).map((response: IAuth) => {
      const token = response.data.hash;
      if (token) {
        this.token = token;
        console.log(token);
        localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
        return true;
      } else {
        return false;
      }
    });
  }

  checkUserSession(user: UserInfo): Observable<boolean> {
    const body = new HttpParams()
      .set('action', 'check' )
      .set('uid',  user.userId.toString() )
      .set('type', user.type )
      .set('time', user.time )
      .set('route', 'authsess')
      .set('operation', 'custom');


    return this.http.post(this.host, body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      }).map((response: IAuth) => {
      const token = response.data.token;
      if (token) {
        this.token = token;
        console.log(token);
        localStorage.setItem('currentUser', JSON.stringify({token: token }));
        return true;
      } else {
        return false;
      }
    });

  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('currentUser');
  }

}

