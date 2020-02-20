import {LoginService} from '../../login/login.service';
import {Router} from '@angular/router';
import {Component} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html'
})
export class HeaderComponent {

  constructor(private router: Router, private _loginService: LoginService) {
  }

  sair() {
    this._loginService.logout();
  }
}
