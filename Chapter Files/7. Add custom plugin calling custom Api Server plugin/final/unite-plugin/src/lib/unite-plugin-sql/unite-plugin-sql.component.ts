import { OverlayRef } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EuiLoadingService } from '@elemental-ui/core';
import { EntitySchemaNew } from 'html/tsb/lib/accounts/account-ext/account-ext-declaration';
import { CollectionLoadParameters, EntitySchema, FilterData, IClientProperty, ValType } from 'imx-qbm-dbts';
import { AppConfigService, DataSourceToolbarSettings, imx_SessionService, SettingsService } from 'qbm';
import { UnitePluginService } from '../unite-plugin.service';

@Component({
  selector: 'imx-unite-plugin-sql',
  templateUrl: './unite-plugin-sql.component.html',
  styleUrls: ['./unite-plugin-sql.component.css']
})
export class UnitePluginSqlComponent implements OnInit {

  myDataArray: any;
  public dstSettings: DataSourceToolbarSettings;
  userId: string = "";
  private readonly busy: EuiLoadingService
  displayColumn: any;
  public displayedColumns: IClientProperty[];

  constructor(
    public readonly sessionService: imx_SessionService,
    public unitePluginService: UnitePluginService,
    private readonly appConfig: AppConfigService,
    private readonly router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    this.userId =  (await this.sessionService.getSessionState()).UserUid
    var roles = await this.unitePluginService.userGetReportRolesSQL(this.userId);
    
    var schema = await this.unitePluginService.userGetReportRolesSQLSchema();
    //---------------------------------------------------------------------------------------    
    this.displayedColumns = [
      schema.Columns.CentralAccount,
      schema.Columns.FirstName,
      schema.Columns.LastName,
      schema.Columns.Ident_Org,
      schema.Columns.Title
    ];
    //----------------------------------------------------------------------------------------   
    
      this.dstSettings = {
        displayedColumns: this.displayedColumns, //
        dataSource: roles,
        entitySchema: schema,
        navigationState: { PageSize: 5, StartIndex:0 } 
      };    
  }

  navigateToStartPage():void{
    this.router.navigate([this.appConfig.Config.routeConfig.start], { queryParams: {} });
  }
}

