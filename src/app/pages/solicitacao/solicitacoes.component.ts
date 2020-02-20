import {SolicitacoesTabComponent} from './solicitacoes-tab.component';
import {Solicitacao} from '../../models/solicitacao';
import {Component, Input} from '@angular/core';

@Component({
  selector: 'solicitacoes',
  templateUrl: 'solicitacoes.component.html'
})
export class SolicitacoesComponent {

  @Input()
  private solicitacoes: Solicitacao[];

  constructor(private _solicitacaoTab: SolicitacoesTabComponent) {

  }

  ngOnInit() {
  }

  adicionar() {

  }
}
