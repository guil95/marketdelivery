import { Component, OnInit, ViewChild } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms'
import { Validators } from '@angular/forms';
import { Mercado } from '../models/mercado.model'
import { validateConfig } from '@angular/router/src/config';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { DataTableDirective } from 'angular-datatables';

import { ValidformService } from '../services/validform.service'
import { CrudService } from '../services/crud.service'


import { URL_API_MERCADOS } from '../app.api'

@Component({
  selector: 'app-mercado',
  templateUrl: './mercado.component.html',
  styleUrls: ['./mercado.component.css']
})
export class MercadoComponent implements OnInit, AfterViewInit {

  @ViewChild(DataTableDirective) tabela: DataTableDirective;
  
  public mercados: any
  public erroSalvar: boolean = false
  public erroCnpjCpf: boolean = true
  public buscarMercadosOpen: boolean = false

  //para utilização do datable dinamico
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(
    private validFormService: ValidformService,
    private crudService: CrudService
  ) { 
    
  }
  
  ngOnInit() {
    //para utilizaao do datatable dinamico
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
  }

  //para não utilização do datable dinamico
  ngAfterViewInit(): void {
      this.dtTrigger.next();

  }
  
  public formulario: FormGroup = new FormGroup({
    'id': new FormControl(null),
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
    this.formulario.controls.id.setValue(mercado.id)
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
        this.erroCnpjCpf = this.formulario.value.cnpjCpf.length > 11 ? this.validFormService.validarCNPJ(this.formulario.value.cnpjCpf) : this.validFormService.validarCpf(this.formulario.value.cnpjCpf)
        if(this.erroCnpjCpf == true){
          let mercado: Mercado = this.formulario.value;
          if(this.formulario.value.id != null){
            mercado.id = this.formulario.value.id
            this.crudService.put<Mercado>(
              URL_API_MERCADOS+'/'+mercado.id,
              mercado
            ).subscribe(ret => {
              this.buscarMercados();
              // console.log(ret)
            }, (err) => {
            })
          }else{
            if(mercado.id == null){
              delete mercado.id
            }
            this.crudService.post<Mercado>( 
              URL_API_MERCADOS,
              mercado
            ).subscribe(ret => {
              this.buscarMercados();
              // console.log(ret)
            }, (err) => {

            })
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

  public buscarMercados(){
    this.crudService.get<Mercado[]>(URL_API_MERCADOS).subscribe(ret => {

      this.mercados = ret['data']
      //para utilização do datable dinamico
      this.tabela.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.destroy();
        // Call the dtTrigger to rerender again
        this.dtTrigger.next();
      });

    }, (err) => {
      console.log(err)
    })
  }

  public buscarMercadosClick(){
    this.buscarMercadosOpen = !this.buscarMercadosOpen

    if(this.buscarMercadosOpen == true){
      this.buscarMercados()
    }
  }
}
