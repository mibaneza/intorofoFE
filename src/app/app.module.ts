import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorComponent } from './component/error/error.component';
import { ConfirmationComponent } from './component/dialog/confirmation/confirmation.component';
import { NavBarFeComponent } from './component/estruct/nav-bar-fe/nav-bar-fe.component';
import { HeaderComponent } from './component/estruct/header/header.component';
import {OAuthModule} from 'angular-oauth2-oidc';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MatButtonModule, MatCheckboxModule, MatDialogModule, MatIconModule, MatInputModule, MatMenuModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FooterComponent } from './component/estruct/footer/footer.component';
import { CategoryComponent } from './component/category/category.component';
import { ListForoComponent } from './component/list-foro/list-foro.component';
import { ContentForoComponent } from './component/content-foro/content-foro.component';
import { PostDialogComponent } from './component/dialog/post-dialog/post-dialog.component';
import { CategoryDialogComponent } from './component/dialog/category-dialog/category-dialog.component';
import { SafeHtmlPipe } from './pipe/safe-html.pipe';
import {FormsModule} from '@angular/forms';
import {CKEditorModule} from 'ckeditor4-angular';
import {AuthInterceptorService} from './service/auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    ConfirmationComponent,
    NavBarFeComponent,
    HeaderComponent,
    FooterComponent,
    CategoryComponent,
    ListForoComponent,
    ContentForoComponent,
    PostDialogComponent,
    CategoryDialogComponent,
    SafeHtmlPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // -------
    // material
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatMenuModule,
    MatCheckboxModule,
    // ------
    HttpClientModule,
    OAuthModule.forRoot(),
    FormsModule,
    CKEditorModule
  ],
  entryComponents: [
    PostDialogComponent,
    CategoryDialogComponent,
    ConfirmationComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
