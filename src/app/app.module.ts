import { NotFoundComponent } from './notfound.component';
import { LoginComponent } from './pages/login/login.component';
import { PreventUnsavedChangesGuard } from './services/prevent-unsaved-changes-guard.service';
import { OcorrenciaComponent } from './pages/ocorrencia/ocorrencia.component';
import { ListaService } from './providers/lista.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { routing } from './app.routing';


import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { OcorrenciaSearchComponent } from './pages/ocorrencia/ocorrencia-search.component';
import { OcorrenciaService } from './providers/ocorrencia.service';
import { SolicitacaoService } from './providers/solicitacao.service';
import { AuthGuard } from './services/auth-guard.service';
import { SolicitacaoComponent } from './pages/solicitacao/solicitacao.component';
import { LoginService } from './services/login.service';


@NgModule({
  declarations: [
    AppComponent, LoginComponent, NotFoundComponent, OcorrenciaComponent, OcorrenciaSearchComponent, SolicitacaoComponent
  ],
  imports: [
    BrowserModule, HttpModule, FormsModule, ReactiveFormsModule, routing
  ],
  providers: [ListaService, OcorrenciaService, SolicitacaoService, AuthGuard, LoginService, PreventUnsavedChangesGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
