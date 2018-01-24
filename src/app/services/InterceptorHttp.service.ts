import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { LoadingService } from './loading.service'



@Injectable()
export class InterceptorHttp implements HttpInterceptor {

    constructor( private loading: LoadingService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): any {

        this.loading.mostrarLoading = true
        
        if (!req.headers.has('Content-Type')) {
            req = req.clone({headers: req.headers.set('Content-Type', 'application/json')});
        }


        return next.handle(req).do((event: HttpEvent<any>) => {
            this.loading.mostrarLoading = false
        }).catch((err: HttpEvent<any>) => {
            if (err instanceof HttpErrorResponse) {
                if ((<HttpErrorResponse> err).status == 404) {
                    alert('Erro 404 , serviço não encontrado');
                } else if ((<HttpErrorResponse> err).status == 403) {
                    alert('Erro 403 Sua sessão foi expirada!');
                } else if ((<HttpErrorResponse> err).status == 500) {
                  console.log(err)
                    alert("Erro 500!");
                }
            }
            this.loading.mostrarLoading = false
            return Observable.throw(err);
        });
    }
}