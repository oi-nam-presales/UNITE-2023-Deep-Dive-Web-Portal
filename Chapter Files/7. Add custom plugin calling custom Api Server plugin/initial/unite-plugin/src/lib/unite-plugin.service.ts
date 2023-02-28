import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AppConfigService, ExtService, ImxTranslationProviderService } from 'qbm';
import { UnitePluginComponent } from './unite-plugin.component';

@Injectable({
  providedIn: 'root'
})
export class UnitePluginService {

  
  constructor(
    private readonly extService: ExtService
  ) { }

  public onInit(): void{    
    this.extService.register('Dashboard-SmallTiles', {instance: UnitePluginComponent})
  }      
  
}
