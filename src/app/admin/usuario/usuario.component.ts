import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidformService } from '../../services/validform.service'
import { Usuario } from  '../../models/usuario.model'
import { Mercado } from  '../../models/mercado.model'
import { CrudService } from '../../services/crud.service';
import { URL_API_MERCADOS, URL_API_USUARIOS } from '../../app.api';
import { DataTableDirective } from 'angular-datatables';





@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {


  @ViewChild(DataTableDirective) tabela: DataTableDirective;

  public mercados: Mercado[]
  public usuarios: Array<Usuario>
  public erroSalvar: boolean = false
  public erroCpf: boolean = true
  public buscarUsuariosOpen: boolean = false

  //para utilização do datable dinamico
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor( 
    private crudService: CrudService,
    private validFormService: ValidformService
  ) { }

  ngOnInit() {
     //para utilizaao do datatable dinamico
     this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };

    this.buscarMercados();
  }

  //para não utilização do datable dinamico
  ngAfterViewInit(): void {
    this.dtTrigger.next();

  }
    
  public formulario: FormGroup = new FormGroup({
    'id': new FormControl(null),
    'nome': new FormControl(null, Validators.required),
    'mercado': new FormControl(null, Validators.required),
    'cpf': new FormControl(null, Validators.required),
    'rg': new FormControl(null),
    'telefone': new FormControl(null),
    'celular': new FormControl(null, Validators.required),
    'email': new FormControl(null, Validators.required),
    'senha': new FormControl(null, Validators.required)
  })


  public buscarMercados(){
    this.crudService.get<Mercado[]>(URL_API_MERCADOS).subscribe(ret => {
      console.log(ret)
      this.mercados = ret['data'];
    }, (err) => {
      console.log(err)
    })
  }

  public buscarUsuarios(){
    this.crudService.get<Usuario[]>(URL_API_USUARIOS).subscribe(usuariosRet => {
      let usuarios = usuariosRet['data']
      
      usuarios.forEach((usuario)=>{
        this.mercados.forEach((mercado)=>{
          if(mercado.id == usuario.mercado){
            usuario.mercadoDescricao = mercado.descricao
          }
        })
      })
      this.usuarios = usuarios;

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

  public saveUsuario(){
    this.formulario.get('nome').markAsTouched()
    this.formulario.get('mercado').markAsTouched()
    this.formulario.get('cpf').markAsTouched()
    this.formulario.get('celular').markAsTouched()
    this.formulario.get('email').markAsTouched()
    this.formulario.get('senha').markAsTouched()

    this.erroSalvar = this.formulario.invalid

    if(this.erroSalvar === false){
        this.erroCpf = this.validFormService.validarCpf(this.formulario.value.cpf)
        if(this.erroCpf == true){
          let usuario: Usuario = this.formulario.value
          
      
          if(this.formulario.value.id != null){
            usuario.id = this.formulario.value.id
            this.crudService.put<Usuario>(
              URL_API_USUARIOS+'/'+usuario.id,
              usuario
            ).subscribe(ret => {
              console.log(ret)
              this.buscarUsuarios();
            }, (err) => {
              console.log(err)
            })
          }else{
            // console.log(usuario)
            if(usuario.id == null){
              delete usuario.id
            }
            console.log(usuario)
            this.crudService.post<Usuario>( 
              URL_API_USUARIOS,
              usuario
            ).subscribe(ret => {
              console.log(ret)
              this.buscarUsuarios();
            }, (err) => {
              console.log(err)
            })
          }
        }else{
          this.erroSalvar = true
        }
      }
  }

  public buscarUsuariosClick(){
    this.buscarUsuariosOpen = !this.buscarUsuariosOpen

    if(this.buscarUsuariosOpen == true){
      this.buscarUsuarios()
    }
  }

  public editarUsuario(usuario): void{
    this.formulario.controls.id.setValue(usuario.id)
    this.formulario.controls.nome.setValue(usuario.nome)    
    this.formulario.controls.mercado.setValue(usuario.mercado) 
    this.formulario.controls.cpf.setValue(usuario.cpf) 
    this.formulario.controls.rg.setValue(usuario.rg) 
    this.formulario.controls.telefone.setValue(usuario.telefone) 
    this.formulario.controls.celular.setValue(usuario.celular) 
    this.formulario.controls.telefone.setValue(usuario.telefone) 
    this.formulario.controls.email.setValue(usuario.email) 
    
  }

}
