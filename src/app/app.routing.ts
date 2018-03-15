import { SolicitacaoComponent } from './pages/solicitacao/solicitacao.component';
import { AuthGuard } from './services/auth-guard.service';
import { PreventUnsavedChangesGuard } from './services/prevent-unsaved-changes-guard.service';
import { LoginComponent } from './pages/login/login.component';
import { OcorrenciaComponent } from './pages/ocorrencia/ocorrencia.component';
import { OcorrenciaSearchComponent } from './pages/ocorrencia/ocorrencia-search.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './notfound.component';

export const routing = RouterModule.forRoot([
    {path: '', component: SolicitacaoComponent, canActivate: [AuthGuard]},
    {path: 'ocorrencia', component: OcorrenciaSearchComponent, canActivate: [AuthGuard]},
    {path: 'ocorrencia/:numero/:ano/:distritoId', component: OcorrenciaComponent, canActivate: [AuthGuard]},
    {path: 'login', component: LoginComponent, canDeactivate: [PreventUnsavedChangesGuard]},
    {path: '**', component: NotFoundComponent}
  ]);