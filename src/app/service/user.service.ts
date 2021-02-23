import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

import {HttpClient} from '@angular/common/http';
import {GLOBAL} from './urlglobal';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string;

  constructor(private httpsc: HttpClient) { this.url = GLOBAL.url; }
  /*
      getpostcantinarupdate(uppost: string):Observable<any>{
        return this.httpsc.get(this.url+'/api/web/postupdatelist/'+uppost)
      }
    */
  getUserOne(user: string): Observable<any> {
    return this.httpsc.get(this.url + '/api/web/user/' + user);
  }
  /*

    savepost(gpost: PostI,idpost: string, role: string):Observable<any>{
      return this.httpsc.post(this.url+'/resource/'+role+'/post'+idpost,gpost)
    }

    updatepost(gpost: PostI,idpost: string, role: string):Observable<any>{
      return this.httpsc.put(this.url+'/resource/'+role+'/post/'+idpost,gpost)
    }

    deletepost(idpost: string, role: string):Observable<any>{
      return this.httpsc.delete(this.url+'/resource/'+role+'/post/'+idpost)
    }

    getPostLinkTitle(linkTitle: string):Observable<any>{
      return this.httpsc.get(this.url+'/api/web/post/'+linkTitle)
    }*/

}
