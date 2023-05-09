//From: QBM\src\lib\admin\config.compnents.ts

export class ConfigComponent {

  apiClient: ApiClient;

  constructor(private readonly appConfigSvc: AppConfigService,
    public readonly configSvc: ConfigService,
    private readonly translator: TranslateService,
    private readonly sidesheet: EuiSidesheetService,
    private readonly translate: TranslateService,
    private readonly snackbar: SnackBarService
  ) {
    this.apiClient = appConfigSvc.apiClient;
   }

  //=================================================================

  arrayBufferToBase64( buffer ) {
    var bytes = new Uint8Array( buffer );    
    var str = String.fromCharCode.apply(null, bytes)
    return window.btoa( str );
  }

  async onFileSelected(event) {

    const file:File = event.target.files[0];

    if (file) {
        
      var body = this.arrayBufferToBase64(await file.arrayBuffer());
      
      try{
        
        var ret = await this.apiClient.processRequest(
            {
              path: "/admin/uniteadminplugin/uploadfilebinary/"+file.name,  
              parameters: [
                {
                  name: 'payload',
                  value: body,
                  required: true,
                  in: 'body'
                },
              ],           
              method: 'POST',
              headers: {
                'imx-timezone': TimeZoneInfo.get(),
                'Content-Type': 'image/jpeg'
              },
              credentials: 'include',
              observe: 'response',
              responseType: 'json',              
            }
          )  

          const key = "Uploaded file '" + file.name + "' to ApiServer directory '" + ret + "'"
          console.info(key)

          this.snackbar.openAtTheBottom({key});
          
        }catch(e) {
          console.error(e);
        }
                
        //const upload$ = this.http.post("/api/thumbnail-upload", formData);

        //upload$.subscribe();
    }
  }
}