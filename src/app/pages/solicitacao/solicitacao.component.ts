import {Solicitacao} from '../../models/solicitacao';
import {SolicitacaoService} from '../../providers/solicitacao.service';
import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'solicitacao',
  templateUrl: 'solicitacao.component.html'
})
export class SolicitacaoComponent {
  isLoading = false;
  solicitacao: Solicitacao;

  constructor(private _route: ActivatedRoute, private _solicitacaoService: SolicitacaoService) {

  }

  ngOnInit() {
    this.isLoading = true;
    this._route.params.subscribe(params => {
      const solicitacaoId = params['solicitacaoId'];
      this._solicitacaoService.getSolicitacao(solicitacaoId).subscribe((data: Solicitacao) => {
        this.solicitacao = data;
        this.isLoading = false;
      });
    });
  }

  adicionar() {

  }

}
