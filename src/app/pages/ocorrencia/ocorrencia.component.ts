import { MemorandoView } from './memorando-view';
import { Memorando } from './../../models/memorando';
import { Documento } from './../../models/documento';
import { Pericia } from './../../models/pericia';
import { ListaService } from './../../providers/lista.service';
import { Solicitacao } from './../../models/solicitacao';
import { Ocorrencia } from './../../models/ocorrencia';
import { OcorrenciaService } from './../../providers/ocorrencia.service';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { element } from 'protractor';
import { SolicitacaoService } from '../../providers/solicitacao.service';
import { Distrito } from '../../models/distrito';


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

    constructor(private _route: ActivatedRoute, private _ocorrenciaService: OcorrenciaService, private _listaService: ListaService, private _solicitacaoService: SolicitacaoService) {
        this.tipo = 'Exame em Veículo Envolvido em Colisão com Vítima';
    }

    ngOnInit() {
        this.isLoading = true;
        this._route.params.subscribe(params => {
            let numero = params["numero"];
            let ano = params["ano"];
            let distritoId = params["distritoId"];
            this._ocorrenciaService.getOcorrencia(numero, ano, distritoId).subscribe(data => {
                this.ocorrencia = new Ocorrencia();
                Object.assign(this.ocorrencia, data);
                this.documentos = this.ocorrencia.protocolo.documentos.filter(element => element.tipo.includes('MEMORANDO'));
                this.memorandosView = this.documentos.map(elemento => {
                    let memorando = new MemorandoView();
                    memorando.assunto = elemento.tipo + " " + elemento.numero + " " + elemento.data + " - " + elemento.origem;
                    return memorando;
                });
                this.isLoading = false;
            });
        });
        this._listaService.getPericias().subscribe(data => {
            this.pericias = data;
        });
    }

    onSubmit() {
        let memorandos = [];
        this.memorandosView.forEach((element, index, array) => {
            if (element.selecionado) {
                let documento = this.documentos[index];
                let memorando = new Memorando()
                memorando.documento = documento;
                this.ocorrencia.veiculos.map(veiculo => {
                    let placa = veiculo.placa.split('/')[0];
                    console.log('placa: ' + placa);
                    if (documento.assunto.includes(placa)) {
                        memorando.veiculo = veiculo;
                    }
                });
                memorandos.push(memorando);
            }
        });

        let ocorrencia = new Ocorrencia();
        ocorrencia.numero = this.ocorrencia.numero;
        ocorrencia.ano = this.ocorrencia.ano;
        let distrito = new Distrito();
        distrito.id = this.ocorrencia.distrito.id;
        distrito.nome = this.ocorrencia.distrito.nome;
        ocorrencia.distrito = distrito;

        let solicitacao: Solicitacao = new Solicitacao();
        solicitacao.tipo = this.tipo;
        solicitacao.data = new Date();
        solicitacao.ocorrencia = ocorrencia;
        solicitacao.memorandos = memorandos;

        console.log(solicitacao);
        this._solicitacaoService.criarSolicitacao(solicitacao).subscribe(resposta => {
            console.log(resposta);
        });
    }

}