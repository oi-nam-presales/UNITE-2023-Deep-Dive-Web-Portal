import { OverlayRef } from '@angular/cdk/overlay';
import { Component, ErrorHandler, OnInit } from '@angular/core';
import { EuiLoadingService, EuiSidesheetService } from '@elemental-ui/core';
import { PortalPersonMasterdataInteractive, PortalPersonReportsInteractive, ProjectConfig } from 'imx-api-qer';
import { imx_SessionService } from 'qbm';
import { IdentitySidesheetComponent, ProjectConfigurationService, QerApiService, RequestsService } from 'qer';

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
  private projectConfig: ProjectConfig;

  constructor(
    public requestsService: RequestsService,
    public readonly sessionService: imx_SessionService,
    private readonly busyService: EuiLoadingService,
    private readonly qerClient: QerApiService,
    private readonly errorHandler: ErrorHandler,
    private readonly sideSheet: EuiSidesheetService,
    private readonly configService: ProjectConfigurationService
  ) { }

  async ngOnInit(): Promise<void> {
    console.log("SamplePluginComponent -> onInit")   
    this.actionText =  (await this.sessionService.getSessionState()).Username  
    this.projectConfig = await this.configService.getConfig();       
  }

  public async doOnClickOperation(): Promise<void> {
    this.requestsService.openSnackbar('Hello ' + this.actionText, '#LDS#Close');
  }

  public async openIdentitySidesheet(): Promise<void> {

    //const uid = identity.GetEntity().GetKeys()[0];
    var uid = (await this.sessionService.getSessionState()).UserUid 
    let selectedIdentity: PortalPersonMasterdataInteractive;

    let overlayRef: OverlayRef;
    setTimeout(() => overlayRef = this.busyService.show());
    try {
      //const identityCollection = await this.qerClient.typedClient.PortalPersonReportsInteractive.Get_byid(uid);
      const identityCollection = await this.qerClient.typedClient.PortalPersonMasterdataInteractive.Get_byid(uid); 
      selectedIdentity = identityCollection?.Data?.[0];
    } finally {
      setTimeout(() => this.busyService.hide(overlayRef));
    }

    if (!selectedIdentity) {
      this.errorHandler.handleError('Identity could not be loaded.');
      return;
    }

    await this.sideSheet.open(IdentitySidesheetComponent, {
      title: selectedIdentity.GetEntity().GetDisplay(),
      headerColour: 'iris-blue',
      padding: '0px',
      disableClose: true,
      width: 'max(700px, 70%)',
      icon: 'contactinfo',
      testId: 'identity-sidesheet',
      data: {
        isAdmin: false,
        projectConfig: this.projectConfig,
        selectedIdentity,
      }
    }).afterClosed().toPromise();

    //await this.loadDirectReports();
  }

}
