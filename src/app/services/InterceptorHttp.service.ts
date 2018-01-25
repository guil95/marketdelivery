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
                switch((<HttpErrorResponse> err).status ){
                    case 404:
                         alert('Erro 404 , serviço não encontrado');
                    break
                    case 403:
                        alert('Erro 403 ');
                    break
                    case 500:
                        alert('Erro 500 , serviço não encontrado');
                    break
                    default:
                        alert('erro 400')
                    break
                }
            }
            this.loading.mostrarLoading = false
            return Observable.throw(err);
        });
    }
}