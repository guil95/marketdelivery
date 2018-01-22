import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms'
import { Validators } from '@angular/forms';
import { Mercado } from '../models/mercado.model'
import { MercadoService } from '../services/mercado.service'
import { validateConfig } from '@angular/router/src/config';

@Component({
  selector: 'app-mercado',
  templateUrl: './mercado.component.html',
  styleUrls: ['./mercado.component.css']
})
export class MercadoComponent implements OnInit {

  public mercados: Array<Mercado>
  public erroSalvar: boolean

  constructor(private mercadoService: MercadoService) { }

  ngOnInit() {
    this.mercados = [
      {
        codigo: 1,
        descricao: "Mercado América",
        razaoSocial: "Mercado América LTDA",
        nomeFantasia: "Mercado América",
        cnpjCpf: "16308837000132",
        inscricaoEstadual: "123456789",
        endereco: "Av. Fulano de tal Numero 123",
        telefone: "(44) 3641-2526",
        celular: "(44)99985-6522"   
      },
      {
        codigo: 2,
        descricao: "Mercado Pinelli",
        razaoSocial: "Mercado Pinelli LTDA",
        nomeFantasia: "Mercado Pinelli",
        cnpjCpf: "16308837000777",
        inscricaoEstadual: "123456789",
        endereco: "Av. Fulano de tal Numero 123",
        telefone: "(44) 3641-2825",
        celular: "(44)99985-3030"   
      },
      {
        codigo: 3,
        descricao: "Mercado Planalto",
        razaoSocial: "Mercado Planalto LTDA",
        nomeFantasia: "Mercado Planalto",
        cnpjCpf: "16308837000888",
        inscricaoEstadual: "123456789",
        endereco: "Av. Fulano de tal Numero 123",
        telefone: "(44) 3641-8745",
        celular: "(44)99985-1020"   
      },
      {
        codigo: 4,
        descricao: "Mercado Bella Vista",
        razaoSocial: "Mercado Bella Vista LTDA",
        nomeFantasia: "Mercado Bella Vista",
        cnpjCpf: "16308837000999",
        inscricaoEstadual: "123456789",
        endereco: "Av. Fulano de tal Numero 123",
        telefone: "(44) 3641-7854",
        celular: "(44)99985-1234"   
      },

    ]
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

    this.erroSalvar = this.formulario.status === 'INVALID'

    if(this.erroSalvar === false){
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
    }


  }
}
