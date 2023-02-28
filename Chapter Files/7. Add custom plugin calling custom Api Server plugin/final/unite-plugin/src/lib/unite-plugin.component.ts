import { Component, OnInit } from '@angular/core';
import { EuiSidesheetConfig, EuiSidesheetService } from '@elemental-ui/core';
import { imx_SessionService } from 'qbm';
import { RequestsService } from 'qer';
import { UnitePluginScriptComponent } from './unite-plugin-script/unite-plugin-script.component';
import { UnitePluginService } from './unite-plugin.service';

@Component({
  selector: 'imx-unite-plugin',
  templateUrl: './unite-plugin.component.html',
  styles: [
  ]
})
export class UnitePluginComponent implements OnInit {

  caption: string = "View Custom Data"
  actionText: string = "";
  userId: string = "";
  description: string = "Logged in user can view a list of his reports with assigned Business Roles"
  title: string = "Reports with assigned Business Roles"

  constructor(
    public requestsService: RequestsService,
    public readonly sessionService: imx_SessionService,
    public unitePluginService: UnitePluginService,
    private readonly sidesheetService: EuiSidesheetService
  ) { }

  async ngOnInit(): Promise<void> {
    console.log("UnitePluginComponent -> onInit")      
    this.userId =  (await this.sessionService.getSessionState()).UserUid   
    this.actionText =  (await this.sessionService.getSessionState()).Username    
  }

  public async doOnClickOperation(): Promise<void> {
    
    const title = this.title;

    const config: EuiSidesheetConfig = {
      title: title,
      width: '900px',
      headerColour: 'green',
      data: this.userId,
    };

    const sidesheetRef = this.sidesheetService.open(
      UnitePluginScriptComponent, config
    );
  }
}
