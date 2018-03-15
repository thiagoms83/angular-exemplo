import { Solicitacao } from './../../models/solicitacao';
import { SolicitacaoService } from './../../providers/solicitacao.service';
import { Ocorrencia } from './../../models/ocorrencia';
import { OcorrenciaService } from './../../providers/ocorrencia.service';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
    selector: 'solicitacao',
    templateUrl: 'solicitacao.component.html' 
})
export class SolicitacaoComponent  {
    isLoading = false;
    solicitacoes: Solicitacao[];

    constructor(private _route: ActivatedRoute, private _solicitacaoService: SolicitacaoService) {

    }

    ngOnInit() {
        this.isLoading = true;
        this._route.params.subscribe( params => {
            let tipo = params["tipo"];
            this._solicitacaoService.getSolicitacoes().subscribe( data => {
                this.solicitacoes = data;
                this.isLoading = false;
            });
        });
    }
    
}