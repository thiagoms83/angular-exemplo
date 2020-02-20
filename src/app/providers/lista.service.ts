import 'rxjs/add/operator/map';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ListaService {
  constructor(private _http: HttpClient) {

  }

  getDistritos() {
    return this._http.get('/api/webservice/rest/lista/distrito');
  }

  getPericias() {
    return this._http.get('/api/webservice/rest/lista/pericia');
  }
}
