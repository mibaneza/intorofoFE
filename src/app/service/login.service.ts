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
  url: string;
  constructor( private https: HttpClient ) {  this.url = GLOBAL.url; }
  postLoginS(accesstoken: string): Observable<any>{
    return this.https.post(this.url + '/api/web/login', accesstoken);
  }
  getInfo(): Observable<any> {
    return this.https.get(this.url + 'security/userInfo');
  }
  getUser(): Observable<UserI> {
    return this.userINFO = JSON.parse(localStorage.getItem( 'userInfo'));
  }
}
