import {MemorandoView} from './memorando-view';
import {Memorando} from '../../models/memorando';
import {Documento} from '../../models/documento';
import {Pericia} from '../../models/pericia';
import {ListaService} from '../../providers/lista.service';
import {Solicitacao} from '../../models/solicitacao';
import {Ocorrencia} from '../../models/ocorrencia';
import {OcorrenciaService} from '../../providers/ocorrencia.service';
import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SolicitacaoService} from '../../providers/solicitacao.service';
import {Distrito} from '../../models/distrito';


@Component({
  selector: 'ocorrencia',
  templateUrl: 'ocorrencia.component.html'
})
export class OcorrenciaComponent {
  tipo: string;
  isLoading = false;
  ocorrencia: Ocorrencia;
  documentos: Documento[];
  memorandosView: MemorandoView[];
  pericias: Pericia[];

  constructor(private _route: ActivatedRoute, private _ocorrenciaService: OcorrenciaService
              , private _listaService: ListaService, private _solicitacaoService: SolicitacaoService) {
    this.tipo = 'Exame em Veículo Envolvido em Colisão com Vítima';
  }

  ngOnInit() {
    this.isLoading = true;
    this._route.params.subscribe(params => {
      const numero = params['numero'];
      const ano = params['ano'];
      const distritoId = params['distritoId'];
      this._ocorrenciaService.getOcorrencia(numero, ano, distritoId).subscribe(data => {
        this.ocorrencia = new Ocorrencia();
        Object.assign(this.ocorrencia, data);
        this.documentos = this.ocorrencia.protocolo.documentos.filter(element => element.tipo.includes('MEMORANDO'));
        this.memorandosView = this.documentos.map(elemento => {
          const memorando = new MemorandoView();
          memorando.assunto = elemento.tipo + ' ' + elemento.numero + ' ' + elemento.data + ' - ' + elemento.origem;
          return memorando;
        });
        this.isLoading = false;
      });
    });
    this._listaService.getPericias().subscribe((data: Pericia[]) => {
      this.pericias = data;
    });
  }

  onSubmit() {
    const memorandos = [];
    this.memorandosView.forEach((element, index, array) => {
      if (element.selecionado) {
        const documento = this.documentos[index];
        const memorando = new Memorando();
        memorando.documento = documento;
        this.ocorrencia.veiculos.map(veiculo => {
          const placa = veiculo.placa.split('/')[0];
          if (documento.assunto.includes(placa)) {
            memorando.veiculo = veiculo;
          }
        });
        memorandos.push(memorando);
      }
    });

    const ocorrencia = new Ocorrencia();
    ocorrencia.numero = this.ocorrencia.numero;
    ocorrencia.ano = this.ocorrencia.ano;
    const distrito = new Distrito();
    distrito.id = this.ocorrencia.distrito.id;
    distrito.nome = this.ocorrencia.distrito.nome;
    ocorrencia.distrito = distrito;

    const solicitacao: Solicitacao = new Solicitacao();
    solicitacao.tipo = this.tipo;
    solicitacao.data = new Date();
    solicitacao.ocorrencia = ocorrencia;
    solicitacao.memorandos = memorandos;


    this._solicitacaoService.criarSolicitacao(solicitacao).subscribe(resposta => {

    });
  }

}
