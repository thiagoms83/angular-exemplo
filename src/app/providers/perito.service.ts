import 'rxjs/add/operator/map';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class PeritoService {
  constructor(private _http: HttpClient) {

  }

  getPerito(matricula: string) {
    return this._http.get('/api/webservice/rest/perito/' + matricula);
  }

}
