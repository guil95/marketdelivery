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
            console.log(event)
            if(event.type != 0){
                this.loading.mostrarLoading = false
            }
            
            if(event.hasOwnProperty("body")){
                if(event['body'].hasOwnProperty("message")){
                    this.toast.success(event['body'].message, '');
                    
                }
            }
            
          
        }).catch((err: HttpEvent<any>) => {
            if (err instanceof HttpErrorResponse) {
                switch((<HttpErrorResponse> err).status ){
                    case 404:
                        this.toast.error("Erro conexão com servidor 404", '',{
                            timeOut: 10000,
                        })
                    break
                    case 403:
                        this.toast.error("Erro conexão com servidor 403", '',{
                            timeOut: 10000,
                        })
                    break
                    case 500:
                        this.toast.error("Erro conexão com servidor 500", '',{
                            timeOut: 10000,
                        })
                    break
                    case 400:
                        let error = (<HttpErrorResponse> err).error
                        let errorMessage: Array<any> = []
                        if(error.hasOwnProperty('message')){
                            errorMessage = this.extractMessage(error['message'])
                        } 
                        this.toast.error(errorMessage.join('\n'), '',{
                            timeOut: 10000,
                          });
                          this.messages = []            
                    break
                    default:
                    this.toast.error("Erro conexão com servidor", '',{
                        timeOut: 10000,
                      })                
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