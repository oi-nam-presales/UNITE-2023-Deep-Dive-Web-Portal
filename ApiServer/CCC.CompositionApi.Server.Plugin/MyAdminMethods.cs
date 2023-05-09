using QBM.CompositionApi.ApiManager;
using QBM.CompositionApi.Definition;
using QER.CompositionApi.Portal;
using VI.DB.Entities;
using VI.DB.Scripting;
using System.Collections.Generic;
using System.Collections;
using NLog;
using VI.Base;
using System;
using System.Net.Http;
using System.Net.Http.Headers;
//using System.Net.Mime;
using System.IO;
using QBM.CompositionApi.Operations;
using System.Linq;
using VI.DB;
using QBM.CompositionApi.Typed;
using QBM.CompositionApi.DataSources.Files;
using QBM.CompositionApi.Handling;
using QBM.CompositionApi.Crud;
using VI.DB.Compatibility;
using QBM.CompositionApi.Session;
using CCC.CompositionApi.Server.Plugin;
using System.Runtime.Remoting.Messaging;
using System.Text;
using VI.DB.Auth;

namespace CCC.CompositionApi.Api
{
    public class MyAdminMethods : IApiProviderFor<QBM.CompositionApi.AdminApi.AdminApiProject>, IApiProvider
    {
        public void Build(IApiBuilder builder)
        {
            builder.AddMethod(Method.Define("Hello")
              .Handle("POST", (request, ts) =>
              {
                  var url = request.Session.GetConnection().GetConfigParm(@"Custom\OneLogin\Events\BaseURL");

                  //Code using URL here

                  return System.Threading.Tasks.Task.FromResult("OK");
              }));


            builder.AddMethod(Method.Define("uniteadminplugin/uploadfileformdata")
              .AllowUnauthenticated()
              .Handle("POST", (qr, ts) =>
              {
                  //var x = await qr.Request.Content.ReadAsByteArrayAsync();

                  var streamContent = new StreamContent(qr.Request.Content.ReadAsStreamAsync().Result);
                  streamContent.Headers.ContentType = MediaTypeHeaderValue.Parse(qr.Request.Content.Headers.GetValues("Content-Type").First());

                  var provider = streamContent.ReadAsMultipartAsync().Result;

                  foreach (var httpContent in provider.Contents)
                  {
                      var fileName = httpContent.Headers.ContentDisposition.FileName;
                      fileName = fileName.Trim(new char[] { '"', '\\' });
                      string filePath = @"C:\inetpub\wwwroot\ApiServer\" + fileName;

                      if (string.IsNullOrWhiteSpace(fileName))
                      {
                          continue;
                      }

                      byte[] bytes = httpContent.ReadAsByteArrayAsync().Result;

                      using (var fs = new FileStream(filePath, FileMode.Create))
                      {
                          fs.Write(bytes, 0, bytes.Length);
                      }

                      //P.S. Another way...
                      //using (Stream fileContents = await httpContent.ReadAsStreamAsync())
                      //{                           
                      //    ////Do stuff here
                      //    //using (var fs = new FileStream(@"C:\inetpub\wwwroot\ApiServer\CustomLogo.jpg", FileMode.Create))
                      //    //{
                      //    //    fileContents.CopyTo(fs);
                      //    //}
                      //}
                  }

                  return System.Threading.Tasks.Task.FromResult("OK");

              }));

            builder.AddMethod(Method.Define("uniteadminplugin/uploadfilebinary/{filename}")
               //.AllowUnauthenticated()
               .WithParameter("filename", typeof(string), isInQuery: false)
               .Handle("POST", (qr, ts) =>
               {
                   string ret = qr.Request.Content.ReadAsStringAsync().Result;                                      
                   ret = ret.Trim(new char[] { '"' });
                   
                   byte[] bytes = Convert.FromBase64String(ret);

                   var fileName = qr.Parameters.Get<string>("filename");

                   var dir = AppDomain.CurrentDomain.BaseDirectory + @"files";

                   if (!System.IO.Directory.Exists(dir))
                   {
                       System.IO.Directory.CreateDirectory(dir);
                   }

                   fileName = fileName.Trim(new char[] { '"', '\\' });
                   //string filePath = @"C:\inetpub\wwwroot\ApiServer\" + fileName;
                   string filePath = dir + "\\" + fileName;
                                      
                   using (var fs = new FileStream(filePath, FileMode.Create))
                   {
                       fs.Write(bytes, 0, bytes.Length);
                   }

                   //P.S. Testing calls to the object layer.
                   //var conf = qr.Session.GetConnection().GetConfigParm(@"Custom\OneLogin\Events\BaseURL");

                   return System.Threading.Tasks.Task.FromResult("Saved file '" + fileName + "' to directory '" + dir + "'");

               }));

            //builder.AddMethod(new DemoBinaryFileApiMethod("uniteadminplugin"));
        }

    }

    
}