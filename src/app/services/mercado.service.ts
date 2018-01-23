import { Mercado } from "../models/mercado.model";
import { URL_API_MERCADOS } from "../app.api"
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/retry'
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MercadoService {

constructor(
    private httpClient: HttpClient
){}

   public salvarMercado(mercado: Mercado): void{
    //post para /api/mercados
    console.log(mercado)
    // let headers: Headers = new Headers()
    // headers.append('Content-type', 'application/json')
    
    //     return this.http.get(
    //         URL_API_MERCADOS,
    //         JSON.stringify(pedido),
    //         new RequestOptions({
    //             headers: headers
    //         })  
    //     )
    //     .map((resposta: Response) => resposta.json().id)
   }

   public editarMercado(mercado: Mercado): void{
    //put para /api/mercados/:id
    console.log(mercado)
   }

   public buscarMercados() {
    return this.httpClient.get<any>(URL_API_MERCADOS)
    
   }


}