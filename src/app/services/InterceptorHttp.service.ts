import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';


@Injectable()
export class InterceptorHttp implements HttpInterceptor {

    constructor() {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): any {

        console.log('Iniciando loading')  

        return next.handle(req).do((event: HttpEvent<any>) => {
            console.log('Finalizando loading')
        }).catch((err: HttpEvent<any>) => {
            if (err instanceof HttpErrorResponse) {
                if ((<HttpErrorResponse> err).status == 404) {
                    alert('Erro 404 , serviço não encontrado');
                } else if ((<HttpErrorResponse> err).status == 403) {
                    alert('Erro 403 Sua sessão foi expirada!');
                } else if ((<HttpErrorResponse> err).status == 500) {
                  
                    alert("Erro 500!");
                }
            }
            return Observable.throw(err);
        });
    }
}