import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms'
import { Validators } from '@angular/forms';
import { Mercado } from '../models/mercado.model'
import { MercadoService } from '../services/mercado.service'
import { validateConfig } from '@angular/router/src/config';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-mercado',
  templateUrl: './mercado.component.html',
  styleUrls: ['./mercado.component.css']
})
export class MercadoComponent implements OnInit {

  public mercados: any
  public erroSalvar: boolean = false
  public erroCnpjCpf: boolean = true

  constructor(private mercadoService: MercadoService) { }

  ngOnInit() {
    this.mercados = [];
    this.mercadoService.buscarMercados().subscribe(ret => {
      console.log(ret)
      this.mercados = ret;
    }, (err) => {
      console.log(err)
    })
  }

  public formulario: FormGroup = new FormGroup({
    'codigo': new FormControl(null),
    'descricao': new FormControl(null, Validators.required),
    'razaoSocial': new FormControl(null),
    'nomeFantasia': new FormControl(null),
    'cnpjCpf': new FormControl(null, Validators.required),
    'inscricaoEstadual': new FormControl(null),
    'endereco': new FormControl(null, Validators.required),
    'telefone': new FormControl(null),
    'celular': new FormControl(null)
  })

  public editarMercado(mercado): void{
    this.formulario.controls.codigo.setValue(mercado.codigo)
    this.formulario.controls.descricao.setValue(mercado.descricao)    
    this.formulario.controls.razaoSocial.setValue(mercado.razaoSocial) 
    this.formulario.controls.nomeFantasia.setValue(mercado.nomeFantasia) 
    this.formulario.controls.cnpjCpf.setValue(mercado.cnpjCpf) 
    this.formulario.controls.inscricaoEstadual.setValue(mercado.inscricaoEstadual) 
    this.formulario.controls.endereco.setValue(mercado.endereco) 
    this.formulario.controls.telefone.setValue(mercado.telefone) 
    this.formulario.controls.celular.setValue(mercado.celular) 
    
  }

  public saveMercado(){
    this.formulario.get('descricao').markAsTouched()
    this.formulario.get('cnpjCpf').markAsTouched()
    this.formulario.get('endereco').markAsTouched()

    this.erroSalvar = this.formulario.invalid

    if(this.erroSalvar === false){
        this.erroCnpjCpf = this.formulario.value.cnpjCpf.length > 11 ? this.validarCNPJ(this.formulario.value.cnpjCpf) : this.validarCpf(this.formulario.value.cnpjCpf)
        console.log(this.erroCnpjCpf)
        if(this.erroCnpjCpf == true){
          let mercado =   new Mercado(
            this.formulario.value.codigo,
            this.formulario.value.descricao,
            this.formulario.value.razaoSocial,
            this.formulario.value.nomeFantasia,
            this.formulario.value.cnpjCpf,
            this.formulario.value.inscricaoEstadual,
            this.formulario.value.endereco,
            this.formulario.value.telefone,
            this.formulario.value.celular
          )
      
          if(this.formulario.value.codigo != null){
            this.mercadoService.editarMercado(
              mercado
            )
          }else{
            this.mercadoService.salvarMercado( 
              mercado
            )
          }
        }else{
          this.erroSalvar = true
        }
      }
  }

  public resetarForm():void{
    this.formulario.reset()
    this.erroSalvar = false
    this.erroCnpjCpf = true
  }


  public validarCNPJ(cnpj): boolean {
 
    cnpj = cnpj.replace(/[^\d]+/g,'');
 
    if(cnpj == '') return false;
     
    if (cnpj.length != 14)
        return false;
 
    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" || 
        cnpj == "11111111111111" || 
        cnpj == "22222222222222" || 
        cnpj == "33333333333333" || 
        cnpj == "44444444444444" || 
        cnpj == "55555555555555" || 
        cnpj == "66666666666666" || 
        cnpj == "77777777777777" || 
        cnpj == "88888888888888" || 
        cnpj == "99999999999999")
        return false;
         
    // Valida DVs
    let tamanho = cnpj.length - 2
    let numeros = cnpj.substring(0,tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return false;
         
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0,tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
          return false;
           
    return true;
    
}

  public validarCpf(strCPF): boolean{
    let Soma;
      let Resto;
      Soma = 0;
    if (strCPF == "00000000000") return false;
      
    for (let i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;
    
      if ((Resto == 10) || (Resto == 11))  Resto = 0;
      if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;
    
    Soma = 0;
      for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
      Resto = (Soma * 10) % 11;
    
      if ((Resto == 10) || (Resto == 11))  Resto = 0;
      if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
      return true;
  }
}
