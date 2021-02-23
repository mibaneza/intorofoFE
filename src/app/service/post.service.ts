import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GLOBAL} from './urlglobal';
import {Observable} from 'rxjs';
import {PostI} from '../model/post.interface';
import {PostResponseI} from '../model/post-response-i.interface';
import {PostListI} from '../model/post-list-i.interface';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  url: string;

  constructor(private httpsc: HttpClient) { this.url = GLOBAL.url; }
  getpostcantinarupdate(uppost: string): Observable<any> {
    return this.httpsc.get(this.url + '/api/web/postupdatelist/' + uppost);
  }

  getAllPostCategory(idcategory: string): Observable<any> {
    return this.httpsc.get(this.url + '/api/web/posts/' + idcategory);
  }


  savepost(gpost: PostI, linktitleCategory: string, role: string): Observable<PostListI> {
    return this.httpsc.post<PostListI>(this.url + '/resource/' + role + '/post/' + linktitleCategory, gpost);
  }

  updatepost(gpost: PostResponseI, idpost: string, role: string): Observable<any> {
    return this.httpsc.put(this.url + '/resource/' + role + '/post/' + idpost, gpost);
  }

  deletepost(idpost: string, role: string): Observable<any> {
    return this.httpsc.delete(this.url + '/resource/' + role + '/post/' + idpost);
  }

  getPostLinkTitle(linkTitle: string): Observable<PostI> {
    return this.httpsc.get<PostI>(this.url + '/api/web/post/' + linkTitle);
  }
}
