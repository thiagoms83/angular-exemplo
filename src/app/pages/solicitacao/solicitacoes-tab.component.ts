import {Observable} from 'rxjs/Rx';
import {Solicitacao} from '../../models/solicitacao';
import {SolicitacaoService} from '../../providers/solicitacao.service';
import {Component} from '@angular/core';


@Component({
  selector: 'solicitacoes-tab',
  templateUrl: 'solicitacoes-tab.component.html'
})
export class SolicitacoesTabComponent {
  isLoading = false;
  solicitacoes: Solicitacao[] = [];

  patios: Solicitacao[];
  vistorias: Solicitacao[];
  locais: Solicitacao[];
  subscription;

  constructor(private _solicitacaoService: SolicitacaoService) {
  }

  ngOnInit() {
    this.atualizar();
    this.subscription = Observable.interval(1000 * 20).subscribe(x => {
      this.atualizar();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  atualizar() {
    this.isLoading = true;
    let version = 0;
    if (this.solicitacoes) {
      this.solicitacoes.map(solicitacao => {
        if (solicitacao.version > version) {
          version = solicitacao.version;
        }
      });
    }
    this._solicitacaoService.getSolicitacoes(version).subscribe((alteracoes: Solicitacao[]) => {
      for (let j = 0; j < alteracoes.length; j++) {
        for (let i = 0; i < this.solicitacoes.length; i++) {
          if (this.solicitacoes[i].id === alteracoes[j].id) {
            this.solicitacoes.splice(i, 1);
          }
        }
        this.solicitacoes.push(alteracoes[j]);
      }

      this.patios = this.solicitacoes.filter(item =>
        item.memorandos && item.memorandos.length > 0
      );
      this.vistorias = this.solicitacoes.filter(item =>
        (!item.memorandos || item.memorandos.length === 0) && item.tipo.includes('Exame')
      );
      this.locais = this.solicitacoes.filter(item =>
        (!item.memorandos || item.memorandos.length === 0) && item.tipo.includes('Local')
      );

      this.isLoading = false;
    });
  }
}
