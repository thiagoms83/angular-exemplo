import {Solicitacao} from '../models/solicitacao';
import 'rxjs/add/operator/map';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class SolicitacaoService {
  constructor(private _http: HttpClient) {

  }

  getSolicitacoes(sinceVersion: number) {
    return this._http.get('/api/webservice/rest/solicitacao?since_version=' + sinceVersion);
  }

  getSolicitacao(solicitacaoId: number) {
    return this._http.get('/api/webservice/rest/solicitacao/' + solicitacaoId);
  }

  criarSolicitacao(solicitacao: Solicitacao) {
    const lista: Solicitacao[] = [];
    lista.push(solicitacao);
    return this._http.post('/api/webservice/rest/solicitacao/lista', lista);
  }
}
