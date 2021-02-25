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
import {ConfirmationComponent} from '../dialog/confirmation/confirmation.component';
import {CategoryDialogI} from '../../model/category-dialog-i.interface';

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
  categorylogI: CategoryDialogI;

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
          this.categorylogI = {
            titleComponent: 'Actualizar',
            categoryI: this.categoryI
          };
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

  actualizarCategory() {
    if (this.categoryI) {
      const dialogRef = this.dialog.open(CategoryDialogComponent, {
        width: '95%',
        data: this.categorylogI
      });
      dialogRef.afterClosed()
        .subscribe(result => {
          this.categoryI = result;
          this.categoryService.updatecategory(result, result.idcategories)
            .subscribe(
              data => {
                console.log(data);
                this.categoryI = result;
              },
              error => {
                console.log('ERROR ACTUALIZAR');
                console.log(error as any);

              }
            );
          console.log(result);
        });

    }
  }

  eliminarCategory() {
    if (this.categoryI) {
      const dialogRef = this.dialog.open(ConfirmationComponent, {
        data: 'categoria'
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.categoryService.deletecategory(this.categoryI.idcategories)
            .subscribe(
              data => {
                console.log(data);
              },
              error => {
                console.log('ERROR DELETE CATEGORIA');
                console.log(error as any);
              }
            );
        }
        console.log(result);
      });

    }

  }

}
