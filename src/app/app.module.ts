import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorComponent } from './component/error/error.component';
import { ConfirmationComponent } from './component/dialog/confirmation/confirmation.component';
import { NavBarFeComponent } from './component/estruct/nav-bar-fe/nav-bar-fe.component';
import { HeaderComponent } from './component/estruct/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    ConfirmationComponent,
    NavBarFeComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
