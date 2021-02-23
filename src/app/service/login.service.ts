import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GLOBAL} from './urlglobal';
import {UserI} from '../model/user.interface';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  userINFO: UserI;
  role: string;
  url: string;
  constructor( private https: HttpClient ) {  this.url = GLOBAL.url; }
  postLoginS(accesstoken: string): Observable<any> {
    return this.https.post(this.url + '/api/web/login', accesstoken)
  }
  getInfo(): Observable<any> {
    return this.https.get(this.url + 'security/userInfo')
  }
  getUser(): Observable<UserI> {
    return this.userINFO = JSON.parse(localStorage.getItem( 'userInfo'));
  }
  getRoleVal(): boolean {
    if ( localStorage.getItem( 'accessRole')) {
    return localStorage.getItem( 'accessRole').valueOf() === 'admin'.valueOf();
    } else {
      return false;
    }
  }
  getRoleValUser(valid: boolean): boolean {
    if ( valid ) {
      if ( localStorage.getItem( 'accessRole')) {
        return localStorage.getItem( 'accessRole').valueOf() === 'user'.valueOf();
      } else {
        return false;
      }
    }
  }

  getRole(): string {
    return localStorage.getItem( 'accessRole');
  }
}
