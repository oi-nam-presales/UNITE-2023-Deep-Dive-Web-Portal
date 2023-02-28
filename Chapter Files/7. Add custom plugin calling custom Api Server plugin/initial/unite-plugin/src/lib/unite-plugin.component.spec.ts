import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitePluginComponent } from './unite-plugin.component';

describe('UnitePluginComponent', () => {
  let component: UnitePluginComponent;
  let fixture: ComponentFixture<UnitePluginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnitePluginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitePluginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
