import { Component, OnInit, DoCheck, ViewEncapsulation} from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';
import {LoginService} from '../../../service/login.service';
import {UserI} from '../../../model/user.interface';
import {Observable} from 'rxjs';
import {JwksValidationHandler} from 'angular-oauth2-oidc-jwks';
import {authCodeFlowConfig} from '../../../authCodeFlowConfig.config';

@Component({
  selector: 'app-nav-bar-fe',
  templateUrl: './nav-bar-fe.component.html',
  styleUrls: ['./nav-bar-fe.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavBarFeComponent implements OnInit, DoCheck {
  public identify: UserI;
  rol: string;
  tokendiscord: string;
  userInfo: UserI;
  constructor(
    private oauthService: OAuthService,
    private loginService: LoginService
  ) {
    this.rol = null;
    this.tokendiscord = null;
    this.configureSingleSigOn();
  }
  configureSingleSigOn() {
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();

  }
  ngDoCheck(): void {
    this.identify = this.loginService.getUser();
  }







  getLogin(token: string) {
    this.loginService.postLoginS(token)
      .subscribe(
        data => {
          console.log(data);
          this.userInfo = {
            avatar: data.username + '/' + data.avatar,
            name: data.name,
            roles: this.validateRol(data.roles[0].name),
            username: data.username
          };
          console.log(data.roles[0]);
          localStorage.setItem('userInfo', JSON.stringify(this.userInfo));
          localStorage.setItem('accessToken', data.token);
          localStorage.setItem('accessRole', this.validateRol(data.roles[0]));
        },
        error => {
          console.log('ERROR');
          console.log(error as any);
        });
  }

  login() {
    this.oauthService.tryLogin();

    this.oauthService.initLoginFlow();
  }

  getid() {
    this.oauthService.getIdToken();
  }
  validateRol(role: string): string {

    switch (role) {
      case 'ROLE_CEO': {
        return this.rol = 'ceo';
        break;
      }
      case 'ROLE_SENIOR': {
        return this.rol = 'senior';
        break;
      }
      case 'ROLE_ADMIN': {
        return this.rol = 'admin';
        break;
      }
      case 'ROLE_SUPPORT': {
        return this.rol = 'support';
        break;
      }
      default: {
        return this.rol = 'user';
        break;
      }
    }

  }

  logout() {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('accessRole');
  }

  ngOnInit(): void {
    console.log( 'getIdToken:' + this.oauthService.getAccessToken());
    this.configureSingleSigOn();
    this.oauthService.tryLogin();
    console.log( 'getIdToken:' + this.oauthService.getAccessToken());
    if (this.oauthService.getAccessToken() != null) {
      this.tokendiscord = this.oauthService.getAccessToken();
      console.log(this.tokendiscord);
      console.log(this.tokendiscord);
      console.log(this.tokendiscord);
      console.log('--------------------');
      this.getLogin(this.tokendiscord);
      sessionStorage.clear();
    }
  }

}
