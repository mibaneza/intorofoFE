import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CategoryDialogI} from '../../../model/category-dialog-i.interface';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styles: []
})
export class CategoryDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<CategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CategoryDialogI) {}


  onNoClick(): void {
    this.dialogRef.close();
  }

}
