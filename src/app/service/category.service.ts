import { Injectable } from '@angular/core';
import {CategoryI} from '../model/category-i.interface';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GLOBAL} from './urlglobal';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url: string;

  constructor( private httpsc: HttpClient ) {  this.url = GLOBAL.url; }

  getcategorys(): Observable<any> {
    return this.httpsc.get(this.url + '/api/web/categorias');
  }
  getcategory(linktitle: string): Observable<CategoryI> {
    return this.httpsc.get<CategoryI>(this.url + '/api/web/categoria/' + linktitle);
  }
  getcategorylist(): Observable<any> {
    return this.httpsc.get(this.url + '/api/web/categoriaslist');
  }
  savecategory(gcateogry: CategoryI): Observable<CategoryI> {
    return this.httpsc.post<CategoryI>(this.url + '/resource/categoria', gcateogry);
  }
  updatecategory(gcateogry: CategoryI, idcategory: string): Observable<any> {
    return this.httpsc.put(this.url + '/resource/categoria/' + idcategory, gcateogry);
  }
  deletecategory(idcategory: string): Observable<any> {
    return this.httpsc.delete(this.url + '/resource/categori/' + idcategory);
  }
}
