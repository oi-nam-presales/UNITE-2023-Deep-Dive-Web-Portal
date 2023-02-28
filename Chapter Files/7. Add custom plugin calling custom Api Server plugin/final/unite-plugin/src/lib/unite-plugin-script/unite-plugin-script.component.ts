import {MatTableModule} from '@angular/material/table';
import { Component, Inject, OnInit } from '@angular/core';
import { EuiSidesheetRef, EuiSidesheetService, EUI_SIDESHEET_DATA } from '@elemental-ui/core';
import { UnitePluginService } from '../unite-plugin.service';
import { Router } from '@angular/router';


@Component({
  selector: 'imx-unite-plugin-script',
  templateUrl: './unite-plugin-script.component.html',
  styleUrls: ['./unite-plugin-script.component.css']
})
export class UnitePluginScriptComponent implements OnInit {

 myDataArray: any;

 columnsToDisplay = ['ManagerCentralAccount', 'FirstName', 'LastName', 'BusinessRole',  'Title'];

  constructor(
    public readonly router: Router,
    private sidesheetService: EuiSidesheetService,
    private sidesheetRef: EuiSidesheetRef,
    public unitePluginService: UnitePluginService,
    @Inject(EUI_SIDESHEET_DATA) public sidesheetdata?: any
  ) {}


  async ngOnInit(): Promise<void> {
    const uidPerson = this.sidesheetdata
    var roles = await this.unitePluginService.userGetReportRolesScript(uidPerson);
    
    this.myDataArray = roles
  }

  async navigateToSqlComponent(): Promise<void>{    
    
    this.sidesheetService.close();
    
    this.router.navigate(['imx-unite-plugin-sql']);
  }

}
