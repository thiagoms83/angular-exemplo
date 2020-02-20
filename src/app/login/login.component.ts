import {Router} from '@angular/router';
import {PasswordValidator} from './passwordValidator';
import {LoginService} from './login.service';
import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent {

  form: FormGroup;

  constructor(fb: FormBuilder, private _loginService: LoginService, private router: Router) {

    this.form = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.compose([Validators.required, PasswordValidator.cannotContainSpace])]
    });
  }

  login() {
    this._loginService.login(this.form.controls['username'].value, this.form.controls['password'].value).subscribe(data => {
      this.router.navigate(['']);
    }, error => {
      this.form.controls['password'].setErrors({
        invalidLogin: true
      });
    });
  }
}
