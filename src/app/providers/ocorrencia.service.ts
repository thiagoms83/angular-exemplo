import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';

@Injectable()
export class OcorrenciaService {
    constructor(private _http: Http){

    }

    getOcorrencia(numero:number, ano: number, distritoId: number) {
        return this._http.get('/api/ocorrencia/' + numero + '/' + ano + '/' + distritoId).map(res => res.json())            
    }
}