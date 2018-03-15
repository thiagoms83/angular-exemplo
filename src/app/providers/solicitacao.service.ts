import { Solicitacao } from './../models/solicitacao';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';

@Injectable()
export class SolicitacaoService {
    
    constructor(private _http: Http){

    }

    getSolicitacoes() {
        return this._http.get('/api/solicitacao?since_version=0').map(res => res.json())            
    }

    criarSolicitacao(solicitacao: Solicitacao) {
        return this._http.post('/api/solicitacao', solicitacao).map(res => res.json())            
    }
}