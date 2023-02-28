import { NgModule } from '@angular/core';
import { TileModule } from 'qbm';
import { SamplePluginComponent } from './sample-plugin.component';
import { SamplePluginService } from './sample-plugin.service';



@NgModule({
  declarations: [
    SamplePluginComponent
  ],
  imports: [
    TileModule
  ],
  exports: [
    SamplePluginComponent
  ]
})

export class SamplePluginModule { 
  constructor(private readonly initializer: SamplePluginService) {
    console.log('In constructor of SamplePluginModule.');
    this.initializer.onInit();
    console.log('SamplePluginModule initialized');
  }
}

