
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/retry'
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class CrudService {

constructor(
    private httpClient: HttpClient
){}

   public post<T>(url: string, body: any): Observable<T>{
    return this.httpClient.post<T>(url, body)
   }

   public put<T>(url: string, body: any): Observable<T>{
    //put para /api/mercados/:id
    return this.httpClient.put<T>(url, body)
   }

   public get<T>(url: string): Observable<T> {
    return this.httpClient.get<T>(url)
   }

   public delete<T>(url: string): Observable<T> {
    return this.httpClient.get<T>(url)
   }


}