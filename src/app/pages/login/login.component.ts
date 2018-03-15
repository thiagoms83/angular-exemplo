import { PasswordValidator } from './../../services/passwordValidator';
import { LoginService } from './../../services/login.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
    selector:'login',
    templateUrl: 'login.component.html'
})
export class LoginComponent  {

    form: FormGroup;        

    constructor(fb: FormBuilder, private _loginService: LoginService){        

        this.form = fb.group({
            username:['',Validators.required ],
            password:['',Validators.compose([Validators.required, PasswordValidator.cannotContainSpace])]            
        })
    }

    login(){        
        var result = this._loginService.login(this.form.controls['username'].value,this.form.controls['password'].value); 

        if(!result){
            this.form.controls['password'].setErrors({
                invalidLogin: true 
            });
        }        
    }
}