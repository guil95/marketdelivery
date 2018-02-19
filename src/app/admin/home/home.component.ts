import { Mercado } from './../../models/mercado.model';
import { URL_API_MERCADOS } from './../../app.api';
import { CrudService } from './../../services/crud.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public mercados
  constructor(private crudService: CrudService) { }

  ngOnInit() {
    this.buscarMercados()
  }

  public buscarMercados(){
    this.crudService.get<Mercado[]>(URL_API_MERCADOS).subscribe(ret => {
     
      this.mercados = ret['data'].length;
    }, (err) => {
      console.log(err)
    })
  }

}
