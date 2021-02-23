import { Component, OnInit } from '@angular/core';
import {ConfirmationComponent} from '../dialog/confirmation/confirmation.component';
import {PostDialogComponent} from '../dialog/post-dialog/post-dialog.component';
import {ValidateRol} from '../../util/validate-rol';
import {MatDialog} from '@angular/material/dialog';
import {PostService} from '../../service/post.service';
import {UserService} from '../../service/user.service';
import { ActivatedRoute, Params } from '@angular/router';
import {PostI} from '../../model/post.interface';

@Component({
  selector: 'app-content-foro',
  templateUrl: './content-foro.component.html',
  styleUrls: ['./content-foro.component.scss']
})
export class ContentForoComponent implements OnInit {
  validateRol = ValidateRol;
  public newDataHTML = '';
  public editorData = '';
  linktitlega: string;
  urltitle: string;
  post: string;
  roles: string;
  roleLocal: string;
  title: string;
  existForun: boolean;


  postI: PostI;
  public containeruser;
  constructor(
    public dialog: MatDialog,
    private postService: PostService,
    private userService: UserService,
    private rutaActiva: ActivatedRoute
  ) {
    this.roleLocal = localStorage.getItem('accessRole');

    this.editorData = '';
  }



  ngOnInit() {
    this.pcontainer();
  }

  pcontainer() {
    this.linktitlega = this.rutaActiva.snapshot.params.container;
    console.log(this.linktitlega);
    this.postService.getPostLinkTitle(this.linktitlega)
      .subscribe(
        data => {
          this.postI = data;
          this.userService.getUserOne(data.updateModel.username)
            .subscribe(
              dataUser => {
                this.containeruser = dataUser;
                console.log(dataUser);
                this.roles = dataUser.roles[0];

              },
              error => {

                this.existForun = false;

                console.log(error as any);

              });
          console.log(data);
          this.existForun = true;

        },
        error => {

          this.existForun = false;
          console.log('ERROR');
          console.log(error as any);

        });


  }
  actualizarPost() {
    if (this.postI) {
      const dialogRef = this.dialog.open(PostDialogComponent, {
        width: '95%',
        data: { containerpost: this.postI, titleComponent: 'Actualizar' }
      });
      dialogRef.afterClosed()
        .subscribe(result => {
          this.postI = result;
          this.postI = result;
          this.postService.updatepost(this.postI, result.idpost, this.roleLocal)
            .subscribe(
              data => {
                console.log(data);
                this.postI = result;
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
  /*
  saveComment() {
    this.commnetService.saveComment(this.commentI,this.containerpost.idpost, this.validateRol())
    .subscribe(
      dataCommnet => {
        console.log(dataCommnet)
      },
      error => {
        console.log(error)
      }
    )
   }*/

  eliminarPost() {
    if (this.postI) {
      const dialogRef = this.dialog.open(ConfirmationComponent, {
        data: 'post'
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.postService.deletepost(this.postI.idpost, this.roleLocal)
            .subscribe(
              data => {
                console.log(data);
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

}
