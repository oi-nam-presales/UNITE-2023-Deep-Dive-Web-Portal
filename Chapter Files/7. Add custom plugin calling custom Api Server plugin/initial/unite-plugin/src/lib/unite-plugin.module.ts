import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnitePluginComponent } from './unite-plugin.component';
import { UnitePluginService } from './unite-plugin.service';
import { DataSourceToolbarModule, DataTableModule, TileModule } from "qbm";
import { MatTableModule } from '@angular/material/table';


@NgModule({
    declarations: [
        UnitePluginComponent
    ],
    exports: [
        UnitePluginComponent
    ],
    imports: [
        TileModule
    ]
})
export class UnitePluginModule { 
  constructor(private readonly initializer: UnitePluginService) {
        console.log('In constructor of UnitePluginModule.');
        this.initializer.onInit();
        console.log('UnitePluginModule initialized');
    }
}
