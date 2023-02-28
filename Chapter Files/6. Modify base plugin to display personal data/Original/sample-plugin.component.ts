import { Component, OnInit } from '@angular/core';
import { imx_SessionService } from 'qbm';
import { RequestsService } from 'qer';

@Component({
  selector: 'imx-sample-plugin',
  templateUrl: './sample-plugin.component.html',
  styles: [
  ]
})
export class SamplePluginComponent implements OnInit {

  caption: string = "View Personal Information"
  actionText: string = "";
  description: string = "Logged in user can view his name"


  constructor(
    public requestsService: RequestsService,
    public readonly sessionService: imx_SessionService

  ) { }

  async ngOnInit(): Promise<void> {
    console.log("SamplePluginComponent -> onInit")   
    this.actionText =  (await this.sessionService.getSessionState()).Username     
  }

  public async doOnClickOperation(): Promise<void> {
    this.requestsService.openSnackbar('Hello ' + this.actionText, '#LDS#Close');
  }

}
