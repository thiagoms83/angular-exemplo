import {SolicitacoesTabComponent} from './pages/solicitacao/solicitacoes-tab.component';
import {PrincipalComponent} from './principal.component';
import {PreventUnsavedChangesGuard} from './login/prevent-unsaved-changes-guard.service';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './login/auth-guard.service';
import {SolicitacaoComponent} from './pages/solicitacao/solicitacao.component';
import {OcorrenciaComponent} from './pages/ocorrencia/ocorrencia.component';
import {OcorrenciaSearchComponent} from './pages/ocorrencia/ocorrencia-search.component';
import {RouterModule} from '@angular/router';
import {NotFoundComponent} from './notfound.component';

export const routing = RouterModule.forRoot([
  {
    path: '', component: PrincipalComponent, canActivate: [AuthGuard], children: [
      {path: '', component: SolicitacoesTabComponent, pathMatch: 'full'},
      {path: 'ocorrencia', component: OcorrenciaSearchComponent, canActivate: [AuthGuard]},
      {path: 'ocorrencia/:numero/:ano/:distritoId', component: OcorrenciaComponent, canActivate: [AuthGuard]},
      {path: 'solicitacao/:solicitacaoId', component: SolicitacaoComponent, canActivate: [AuthGuard]}
    ]
  },
  {path: 'login', component: LoginComponent, canDeactivate: [PreventUnsavedChangesGuard]},
  {path: '**', component: NotFoundComponent}
]);
