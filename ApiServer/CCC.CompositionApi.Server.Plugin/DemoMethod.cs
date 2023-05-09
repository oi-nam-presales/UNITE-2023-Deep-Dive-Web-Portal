using QBM.CompositionApi.ApiManager;
using QBM.CompositionApi.Definition;
using QBM.CompositionApi.Session;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CCC.CompositionApi.Server.Plugin
{
    internal class DemoBinaryFileApiMethod : BaseMethod
    {
        public DemoBinaryFileApiMethod(string url) : base(url)
        {
            RouteProviders.Add(new MethodRoute(Settings)
            {
                UrlSuffix = "/uploadfilebinary2/{filename}",
                HttpMethods =
                {
                    {
                        "POST", new MethodRouteVerb(new JsonResponseBuilder(async (request, ct) =>
                        {
                                byte[] bytes = request.Request.Content.ReadAsByteArrayAsync().Result;

                               var fileName = request.Parameters.Get<string>("filename");

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


                               return await System.Threading.Tasks.Task.FromResult("Saved file '" + fileName + "' to directory '" + dir + "'");
                        }))
                        {
                            Description = "Processes uploaded binary file.",
                            InputType = typeof(string),
                            DefaultResultType = typeof(SessionResponse)
                        }
                    }
                }
            });
        }
    }
}
