import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitePluginSqlComponent } from './unite-plugin-sql.component';

describe('UnitePluginSqlComponent', () => {
  let component: UnitePluginSqlComponent;
  let fixture: ComponentFixture<UnitePluginSqlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnitePluginSqlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitePluginSqlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
