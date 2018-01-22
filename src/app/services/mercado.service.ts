import { Mercado } from "../models/mercado.model";
import { URL_API_MERCADOS } from "../app.api"

export class MercadoService{
   public salvarMercado(mercado: Mercado): void{
    //post para /api/mercados
    console.log(mercado)
   }

   public editarMercado(mercado: Mercado): void{
    //put para /api/mercados/:id
    console.log(mercado)
   }

}