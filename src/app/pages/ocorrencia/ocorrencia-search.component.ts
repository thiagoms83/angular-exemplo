import { Router } from '@angular/router';
import { Ocorrencia } from './../../models/ocorrencia';
import { ListaService } from './../../providers/lista.service';
import { Distrito } from './../../models/distrito';
import { Component } from '@angular/core';

@Component({
  selector: 'ocorrencia-search',
  templateUrl: 'ocorrencia-search.component.html'
})
export class OcorrenciaSearchComponent {
  ocorrencia: Ocorrencia;
  distritos: Distrito[] = [];
  isLoading: boolean = false;

  constructor(private _router: Router, private _listaService: ListaService) {
      this.ocorrencia = new Ocorrencia();
      let distrito = new Distrito();
      distrito.id = 1;
      this.ocorrencia.distrito = distrito;
      this.ocorrencia.ano = new Date().getFullYear();
  }

  ngOnInit() {
    this.isLoading = true;
    this._listaService.getDistritos().subscribe( data => {
      this.distritos = data;
      this.isLoading = false;
    });
  }

  onSubmit() {
    this._router.navigate(['ocorrencia', this.ocorrencia.numero, this.ocorrencia.ano, this.ocorrencia.distrito.id]);
  }
}