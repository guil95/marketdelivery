import { Router } from '@angular/router';
import {Injectable, EventEmitter} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { ToastrService } from 'ngx-toastr';




@Injectable()
export class InterceptorHttp implements HttpInterceptor {

    public messages: Array<any> = []
    static mostrarLoading = new EventEmitter();
    constructor( 
        private toast: ToastrService,
        private router: Router
    ) {
    }

    public intercept(req: HttpRequest<any>, next: HttpHandler): any {

   
        InterceptorHttp.mostrarLoading.emit(true)
        
        if (!req.headers.has('Content-Type')) {
            req = req.clone({headers: req.headers.set('Content-Type', 'application/json')});
        }

        if (localStorage.getItem('token')) {
            req = req.clone(
                {
                    headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'))
                }
            );
        }


        return next.handle(req).do((event: HttpEvent<any>) => {

            if(event.type != 0){
                InterceptorHttp.mostrarLoading.emit(false)
                
            }
            
            if(event.hasOwnProperty("body")){
                if(event['body'].hasOwnProperty("message")){
                    this.toast.success(event['body'].message, '');
                    
                }
            }
            
          
        }).catch((err: HttpEvent<any>) => {
            if (err instanceof HttpErrorResponse) {
                console.log((<HttpErrorResponse> err))
                switch((<HttpErrorResponse> err).status ){
                    
                    case 401:
                        this.toast.error("Sem autorização 401", '',{
                            timeOut: 10000,
                        })
                        InterceptorHttp.mostrarLoading.emit(false)
                    break
                    case 404:
                        this.toast.error("Erro conexão com servidor 404", '',{
                            timeOut: 10000,
                        })
                        InterceptorHttp.mostrarLoading.emit(false)
                    break
                    case 403:
                        // this.toast.error("Erro conexão com servidor 403", '',{
                        //     timeOut: 10000,
                        // })
                        this.router.navigateByUrl('login'); 
                        InterceptorHttp.mostrarLoading.emit(false)
                    break
                    case 500:
                        this.toast.error("Erro conexão com servidor 500", '',{
                            timeOut: 10000,
                        })
                        this.router.navigateByUrl('login'); 
                        InterceptorHttp.mostrarLoading.emit(false)
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
                          InterceptorHttp.mostrarLoading.emit(false)         
                    break
                    default:
                        // this.toast.error("Erro conexão com servidor", '',{
                        //     timeOut: 10000,
                        // })   
                    this.router.navigateByUrl('login');      
                      InterceptorHttp.mostrarLoading.emit(false)       
                    break
                }
            }
           
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