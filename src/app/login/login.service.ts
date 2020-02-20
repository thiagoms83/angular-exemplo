import {Perito} from '../models/perito';
import {PeritoService} from '../providers/perito.service';
import {LocalStorage} from '../services/local-storage.service';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class LoginService {

  externo: boolean;

  @LocalStorage
  isLoggedIn: boolean;

  @LocalStorage
  token: string;

  @LocalStorage
  refreshToken: string;

  @LocalStorage
  peritoLogado: Perito;

  constructor(private http: HttpClient, private router: Router, private peritoService: PeritoService) {
  }

  login(username, password) {
    const headers = new HttpHeaders().append('Authorization', 'Basic ' + btoa('sdtandroid:123456'));
    const options = {
      headers: headers
    };
    return this.http.post('/api/auth/oauth/token?grant_type=password&username=' + username + '&password=' + password, '', options)
      .map((data: any) => {
      this.token = data.access_token;
      this.refreshToken = data.refresh_token;
      this.isLoggedIn = true;
      this.peritoService.getPerito(username).subscribe((perito: Perito) => {
        this.peritoLogado = perito;
        return data;
      });
    });
  }

  getRefreshToken() {
    const headers = new HttpHeaders().append('Authorization', 'Basic ' + btoa('sdtandroid:123456'));
    const options = {
      headers: headers
    };
    return this.http.post('/api/auth/oauth/token?grant_type=refresh_token&refresh_token=' + this.refreshToken, '', options)
      .map((data: any) => {
      this.token = data.access_token;
      this.refreshToken = data.refresh_token;
      this.isLoggedIn = true;
      return this.token;
    });
  }

  logout() {
    this.isLoggedIn = false;
    this.token = '';
    this.refreshToken = '';
    this.peritoLogado = new Perito();
    this.router.navigate(['login']);
    return false;
  }
}
