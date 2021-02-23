import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {CategoryService} from '../../service/category.service';
import {LoginService} from '../../service/login.service';
import {ValidateRol} from '../../util/validate-rol';
import {CategoryI} from '../../model/category-i.interface';
import {PostI} from '../../model/post.interface';
import {PostService} from '../../service/post.service';
import {CategoryDialogComponent} from '../dialog/category-dialog/category-dialog.component';
import {PostDialogComponent} from '../dialog/post-dialog/post-dialog.component';
import {PostDialogI} from '../../model/post-dialog-i.interface';
import {PostListI} from '../../model/post-list-i.interface';

@Component({
  selector: 'app-list-foro',
  templateUrl: './list-foro.component.html',
  styleUrls: ['./list-foro.component.scss']
})
export class ListForoComponent implements OnInit {
  validateRol = ValidateRol;
  categoryI: CategoryI;
  postIlist: Array<PostListI>;
  postDialog: PostDialogI;
  post: PostI;
  postL: PostListI;

  public postBool;
  constructor(
    private rutaActiva: ActivatedRoute,
    public dialog: MatDialog,
    public loginService: LoginService,
    private postService: PostService,
    private categoryService: CategoryService
  ) {
    this.post = {
      content: '',
      est: false,
      id: null,
      idpost: null,
      linktitle: '',
      linktitlecategory: '',
      title: '',
      updateModel: null,
      quantitycommets: null
    };
    this.postDialog = {
      containerpost: this.post,
      titleComponent: 'Registrar'
    };
  }

  ngOnInit() {
    this.getCategory();
  }
  getCategory() {
    this.categoryService.getcategory(this.rutaActiva.snapshot.params.blog)
      .subscribe(
        categoryData => {
          this.categoryI = categoryData;
          console.log(categoryData);
          this.getPostlist(this.categoryI.idcategories);
        },
        error => {
          console.log('ERROR CATEGORY');
          console.log(error as any);
        });
  }
  getPostlist(linktitleCategory: string) {
    this.postService.getAllPostCategory(linktitleCategory)
      .subscribe(
        postListData => {
          this.postIlist = postListData;
          console.log(postListData);
        },
        error => {
          console.log('ERROR POST');
          console.log(error as any);
        });
  }
  savePost() {
    if ( this.categoryI ) {
      const postDialogRef = this.dialog.open(PostDialogComponent, {
        data: this.postDialog
      });
      postDialogRef.afterClosed()
        .subscribe(result => {
       //   this.containerpost = result;
          this.post = result;
          this.postService.savepost(this.post, this.categoryI.linktitle, this.loginService.getRole())
            .subscribe(
              postListIData => {
                console.log(postListIData);
              },
              error => {
                console.log('ERROR GUARDAR POST');
                console.log(error as any);
              }
            );
          console.log(result);
        });
    }
  }

}
