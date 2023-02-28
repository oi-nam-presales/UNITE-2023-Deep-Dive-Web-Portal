import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AppConfigService, ExtService, ImxTranslationProviderService } from 'qbm';
import { UnitePluginComponent } from './unite-plugin.component';
import { V2Client, TypedClient } from 'imx-api-customplugin';

@Injectable({
  providedIn: 'root'
})
export class UnitePluginService {

  private v2Client: V2Client;
  private typedClient: TypedClient;


  constructor(
    private readonly extService: ExtService,
    private readonly router: Router,
    private readonly appConfig: AppConfigService,
    private readonly translationProvider: ImxTranslationProviderService
  ) {
    const schemaProvider = appConfig.client;
    this.v2Client = new V2Client(appConfig.apiClient, schemaProvider);
    this.typedClient = new TypedClient(this.v2Client, this.translationProvider);
   }

  public onInit(routes: Route[]): void{
    this.addRoutes(routes);
    this.extService.register('Dashboard-SmallTiles', {instance: UnitePluginComponent})
  } 
      
  addRoutes(routes: Route[]) {
    const config = this.router.config;
    routes.forEach(route => {
      config.unshift(route);
    });
    this.router.resetConfig(config);
  }

  async userGetReportRolesScript(uidPerson): Promise<any> {    
    try{
      
      var data = await this.v2Client.portal_uniteplugin_getreportsrolesscript_get(uidPerson);
      return data;
    }catch(e) {
      console.error(e);
    }
  }

  async userGetReportRolesSQL(uidPerson): Promise<any> {    
    try{      
      var x = await this.typedClient.PortalUnitepluginGetreportsrolessql.Get(uidPerson);          
      return x;
    }catch(e) {
      console.error(e);
    }
  }

  async userGetReportRolesSQLSchema(): Promise<any> {    
    try{      
      var x = await this.typedClient.PortalUnitepluginGetreportsrolessql.GetSchema()
      return x;
    }catch(e) {
      console.error(e);
    }
  }
}
