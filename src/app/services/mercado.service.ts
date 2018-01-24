import { Mercado } from "../models/mercado.model";
import { URL_API_MERCADOS } from "../app.api"
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/retry'
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class MercadoService {

constructor(
    private httpClient: HttpClient
){}

   public salvarMercado(mercado: Mercado): Observable<any>{
       console.log(mercado)
    return this.httpClient.post<any>(URL_API_MERCADOS, mercado)
   }

   public editarMercado(mercado: Mercado): Observable<any>{
    //put para /api/mercados/:id
    return this.httpClient.put<any>(URL_API_MERCADOS+'/'+mercado.id, mercado)
   }

   public buscarMercados() {
    return this.httpClient.get<any>(URL_API_MERCADOS)
    
   }


}