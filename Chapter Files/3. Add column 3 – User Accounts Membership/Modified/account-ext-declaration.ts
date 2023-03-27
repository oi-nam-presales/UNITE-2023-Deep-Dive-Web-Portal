import { PortalPersonAccounts } from "imx-api-tsb";
import { EntityValue, IEntityColumn } from "imx-qbm-dbts";

/*Add additional column to the PortalPersonAccounts*/
export class PortalPersonAccountsPlus extends PortalPersonAccounts {
  readonly AccountDisabled: EntityValue<IEntityColumn>; 
  
  constructor(acc: PortalPersonAccounts, isDisabled: IEntityColumn){
    super(acc.GetEntity())
    this.AccountDisabled = new EntityValue(isDisabled);
  }
}

