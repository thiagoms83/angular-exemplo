import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';

@Injectable()
export class ListaService {
    constructor(private _http: Http){

    }

    getDistritos(){
        return this._http.get("/api/lista/distrito").map(res => res.json())            
    }

    getPericias() {
        return this._http.get("/api/lista/pericia").map(res => res.json())            
    }
}