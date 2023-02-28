import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitePluginScriptComponent } from './unite-plugin-script.component';

describe('UnitePluginScriptComponent', () => {
  let component: UnitePluginScriptComponent;
  let fixture: ComponentFixture<UnitePluginScriptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnitePluginScriptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitePluginScriptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
