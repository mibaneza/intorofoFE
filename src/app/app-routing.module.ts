import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';

import {CategoryComponent} from './component/category/category.component';
import {ListForoComponent} from './component/list-foro/list-foro.component';
import {ContentForoComponent} from './component/content-foro/content-foro.component';


const routes: Routes = [
  {
    path: 'forum',
    component: CategoryComponent
  },
  {
    path: '',
    redirectTo: 'forum',
    pathMatch: 'full'
  },
  {
    path: 'forum/:blog',
    component: ListForoComponent
  },
  { path: 'forum/:blog/:container', component: ContentForoComponent },
  { path: 'forum/:blog/:container/**', redirectTo: 'forum', pathMatch: 'full' },
  { path: '**', redirectTo: 'forum', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
    enableTracing: false,
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
