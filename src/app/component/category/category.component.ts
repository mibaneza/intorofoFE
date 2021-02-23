import { Component, OnInit } from '@angular/core';
import {ValidateRol} from '../../util/validate-rol';
import {CategoryDialogI} from '../../model/category-dialog-i.interface';
import {CategoryI} from '../../model/category-i.interface';
import {MatDialog} from '@angular/material/dialog';
import {CategoryService} from '../../service/category.service';
import {CategoryDialogComponent} from '../dialog/category-dialog/category-dialog.component';
import {ConfirmationComponent} from '../dialog/confirmation/confirmation.component';
import {CategoryListI} from '../../model/category-list-i.interface';
import {LoginService} from '../../service/login.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  validateRol = ValidateRol;
  categorylogI: CategoryDialogI;
  categoryI: CategoryI;
  public categories: Array<CategoryListI>;
  role: string;
  constructor(
    public dialog: MatDialog,
    public loginService: LoginService,
    private categoryService: CategoryService,

  ) {
    this.categoryI  = {
      idcategories: null,
      tilecategories: '',
      description: '',
      linktitle: '',
      linklogo: '',
      idpost: '0',
      est: true
    };
    this.categorylogI = {
      titleComponent: 'Registrar',
      categoryI: this.categoryI
    };
  }

  ngOnInit() {
  //  console.log(this.loginService.getRoleVal());
    this.getListCategory();
    console.log(this.loginService.getRoleVal());
  }
  getListCategory() {
    this.categoryService.getcategorylist()
      .subscribe(
        data => {
          console.log(data);
          this.categories = data;
          console.log(this.categories);
        },
        error => {
          console.log('ERROR');
          console.log(error as any);
        });

  }
  deleteCategory(dcategoryList: CategoryListI) {
    console.log(dcategoryList);
    if (this.categories) {
    const deleteDialogRef = this.dialog.open(ConfirmationComponent, {
      data: 'category'
    });
    deleteDialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.categoryService.deletecategory(dcategoryList.categoriesDomain.idcategories)
            .subscribe(
              data => {
                this.categories.splice(this.categories.indexOf(dcategoryList), 1);
              },
              error => {
                console.log('ERROR DELETE');
                console.log(error as any);
              }
            );
        }
        console.log(result);
      });
    }
  }

  createCategory() {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      data: this.categorylogI
    });
    dialogRef.afterClosed()
      .subscribe((result: CategoryI) => {
        this.categoryService.savecategory(result)
          .subscribe(
            data => {
              console.log(data);
              this.categories.unshift({categoriesDomain: data, postDomain: null, quantity: 0});
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
