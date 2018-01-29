import { environment } from '../environments/environment'

let URL_API = ''
if( environment.production == true ){
    URL_API = "https://api.marketdelivery.com.br" 
} else {
    URL_API = "http://localhost:8765/api" 
    // URL_API = "http://localhost:3000" 
    
}

export const URL_API_MERCADOS = URL_API+"/mercados"
export const URL_API_USUARIOS = URL_API+"/usuarios"
