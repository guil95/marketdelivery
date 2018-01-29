import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { ToastrService } from 'ngx-toastr';

import { LoadingService } from './loading.service'




@Injectable()
export class InterceptorHttp implements HttpInterceptor {

    public messages: Array<any> = []

    constructor( 
        private loading: LoadingService,
        private toast: ToastrService
    ) {
    }

    public intercept(req: HttpRequest<any>, next: HttpHandler): any {

        this.loading.mostrarLoading = true
        
        if (!req.headers.has('Content-Type')) {
            req = req.clone({headers: req.headers.set('Content-Type', 'application/json')});
        }


        return next.handle(req).do((event: HttpEvent<any>) => {
            this.loading.mostrarLoading = false
            if(event.hasOwnProperty("body")){
                if(event['body'].hasOwnProperty("message")){
                    this.toast.success(event['body'].message, '');
                    
                }
            }
            
          
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
                    case 400:
                        let error = (<HttpErrorResponse> err).error
                        let errorMessage: Array<any> = []
                        if(error.hasOwnProperty('message')){
                            errorMessage = this.extractMessage(error['message'])
                        } 
                        this.toast.error(errorMessage.join('<br>'), '',{
                            timeOut: 10000,
                          });
                                    
                    break;
                    default:
                           console.log((<HttpErrorResponse> err))                   
                    break
                }
            }
            this.loading.mostrarLoading = false
            return Observable.throw(err);
        });
    }

    public extractMessage(msg) {
        for (const field in msg) {
            if(typeof msg[field] === 'object'){
              this.extractMessage(msg[field])
            }else{
                this.messages.push(msg[field]);
            }
        }
        return this.messages;
      }
}