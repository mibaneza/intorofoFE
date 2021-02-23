import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {PostDialogI} from '../../../model/post-dialog-i.interface';
import { CKEditor4 } from 'ckeditor4-angular/ckeditor';

@Component({
  selector: 'app-post-dialog',
  templateUrl: './post-dialog.component.html',
  styles: []
})
export class PostDialogComponent {
  public editorData: string;
  constructor(
    public dialogRef: MatDialogRef<PostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dataHTML: PostDialogI
  ) { this.editorData = ''; }

  onNoClick(): void {
    this.dialogRef.close();
  }
  public onChange(event: CKEditor4.EventInfo) {
    this.editorData = event.editor.getData();
    this.dataHTML.containerpost.content = this.editorData;
  }
}
