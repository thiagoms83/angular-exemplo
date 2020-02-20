import 'rxjs/add/operator/map';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class OcorrenciaService {
  constructor(private _http: HttpClient) {

  }

  getOcorrencia(numero: number, ano: number, distritoId: number) {
    return this._http.get('/api/webservice/rest/ocorrencia/' + numero + '/' + ano + '/' + distritoId);
  }
}
