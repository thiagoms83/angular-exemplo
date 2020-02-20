import {PreventUnsavedChangesGuard} from './prevent-unsaved-changes-guard.service';
import {LoginService} from './login.service';
import {AuthGuard} from './auth-guard.service';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './login.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    LoginComponent
  ],
  exports: [],
  providers: [
    LoginService,
    PreventUnsavedChangesGuard,
    AuthGuard
  ]
})
export class LoginModule {
}
