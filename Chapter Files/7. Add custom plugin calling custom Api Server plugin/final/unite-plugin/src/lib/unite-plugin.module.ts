import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnitePluginComponent } from './unite-plugin.component';
import { UnitePluginService } from './unite-plugin.service';
import { DataSourceToolbarModule, DataTableModule, TileModule } from "qbm";
import { UnitePluginScriptComponent } from './unite-plugin-script/unite-plugin-script.component';
import { MatTableModule } from '@angular/material/table';
import { UnitePluginSqlComponent } from './unite-plugin-sql/unite-plugin-sql.component';

const routes: Routes = [
    {
      path: 'imx-unite-plugin-sql',
      component: UnitePluginSqlComponent
    }
];

@NgModule({
    declarations: [
        UnitePluginComponent,
        UnitePluginScriptComponent,
        UnitePluginSqlComponent
    ],
    exports: [
        UnitePluginComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        TileModule,
        MatTableModule,
        DataSourceToolbarModule,
        DataTableModule
    ]
})
export class UnitePluginModule { 
  constructor(private readonly initializer: UnitePluginService) {
        console.log('In constructor of UnitePluginModule.');
        this.initializer.onInit(routes);
        console.log('UnitePluginModule initialized');
    }
}
