import { Component, OnInit } from '@angular/core';
import { EuiSidesheetConfig, EuiSidesheetService } from '@elemental-ui/core';
import { imx_SessionService } from 'qbm';
import { RequestsService } from 'qer';
import { UnitePluginService } from './unite-plugin.service';

@Component({
  selector: 'imx-unite-plugin',
  templateUrl: './unite-plugin.component.html',
  styles: [
  ]
})
export class UnitePluginComponent implements OnInit {

  caption: string = "View Custom Data"
  actionText: string = "Click here";
  userId: string = "";
  description: string = "Logged in user can view a list of his reports with assigned Business Roles"
  title: string = "Reports with assigned Business Roles"

  constructor(
    public requestsService: RequestsService,
    public unitePluginService: UnitePluginService 
  ) { }

  async ngOnInit(): Promise<void> {
    console.log("UnitePluginComponent -> onInit")
  }

  public async doOnClickOperation(): Promise<void> {    
    this.requestsService.openSnackbar('Hello ' + this.actionText, '#LDS#Close');
  }
}
