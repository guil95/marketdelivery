import { environment } from '../environments/environment'

let URL_API = ''
if( environment.production == true ){
    URL_API = "https://api.marketdelivery.com.br/v1" 
} else {
    URL_API = "http://localhost:8765/v1" 
    // URL_API = "http://localhost:3000" 
    
}

export const URL_API_MERCADOS = URL_API+"/mercados"
export const URL_API_USUARIOS_MERCADO = URL_API+"/usuarios-mercado"
export const URL_API_USUARIOS_LOGIN = URL_API+"/usuarios/login"
export const URL_API_USUARIOS_CHECK_AUTH = URL_API+"/usuarios/check-auth"
