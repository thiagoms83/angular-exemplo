import {HostInterceptor} from './login/host.interceptor';
import {SolicitacoesComponent} from './pages/solicitacao/solicitacoes.component';
import {SolicitacoesTabComponent} from './pages/solicitacao/solicitacoes-tab.component';
import {PeritoService} from './providers/perito.service';
import {TokenInterceptor} from './login/token.interceptor';
import {PrincipalComponent} from './principal.component';
import {PreventUnsavedChangesGuard} from './login/prevent-unsaved-changes-guard.service';
import {LoginService} from './login/login.service';
import {AuthGuard} from './login/auth-guard.service';
import {SecaoComponent} from './pages/secao/secao.component';
import {FooterComponent} from './pages/footer/footer.component';
import {HeaderComponent} from './pages/header/header.component';
import {NotFoundComponent} from './notfound.component';

import {OcorrenciaComponent} from './pages/ocorrencia/ocorrencia.component';
import {ListaService} from './providers/lista.service';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

import {routing} from './app.routing';


import {AppComponent} from './app.component';
import {HttpModule} from '@angular/http';
import {OcorrenciaSearchComponent} from './pages/ocorrencia/ocorrencia-search.component';
import {OcorrenciaService} from './providers/ocorrencia.service';
import {SolicitacaoService} from './providers/solicitacao.service';
import {SolicitacaoComponent} from './pages/solicitacao/solicitacao.component';
import {LoginModule} from './login/login.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TruncatePipe} from './truncate.pipe';


@NgModule({
  declarations: [
    AppComponent, PrincipalComponent, NotFoundComponent, OcorrenciaComponent,
    OcorrenciaSearchComponent, SolicitacaoComponent, HeaderComponent,
    SolicitacoesTabComponent, SolicitacoesComponent,
    FooterComponent, SecaoComponent, TruncatePipe
  ],
  imports: [
    BrowserModule, HttpModule, HttpClientModule, FormsModule, ReactiveFormsModule, LoginModule, routing
  ],
  providers: [ListaService, OcorrenciaService, SolicitacaoService, PeritoService, AuthGuard, LoginService, PreventUnsavedChangesGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }, {
    provide: HTTP_INTERCEPTORS,
    useClass: HostInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
