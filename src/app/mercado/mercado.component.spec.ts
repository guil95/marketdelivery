import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MercadoComponent } from './mercado.component';

describe('MercadoComponent', () => {
  let component: MercadoComponent;
  let fixture: ComponentFixture<MercadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MercadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MercadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
