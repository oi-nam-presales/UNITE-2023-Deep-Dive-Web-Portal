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

namespace SamplePlugin.CompositionApi.Server.Plugin
{
    //P.S. Class implementing IApiProviderFor<QER.CompositionApi.Portal.PortalApiProject>
    //will be included in the "Portal" project.
    //This way we can extend portal project with custom methods
    //and user's login to portal will work with this plugin.
    public class CustomMethods : IApiProviderFor<QER.CompositionApi.Portal.PortalApiProject>, IApiProvider
    {
        public void Build(IApiBuilder builder)
        {
            // This is how a method can return objects of any type,
            // provided that the type can be serialized.
            builder.AddMethod(Method.Define("sampleplugin")
                .HandleGet(qr => new DataObject { Message = "Hello world test!" })
            );

            // This is how posted data of any type can be processed.
            builder.AddMethod(Method.Define("sampleplugin/post")
                .Handle<PostedMessage, DataObject>("POST",
                    (posted, qr) => new DataObject
                    {
                        Message = "You posted the following message: " + posted.Input
                    })
             );

            // This is an example of a method that generates plain text (not JSON formatted).
            // You can use this to generate content of any type.
            builder.AddMethod(Method.Define("sampleplugin/text")
                .AllowUnauthenticated()
                .HandleGet(new ContentTypeSelector
                {
                    // Specifiy the MIME type of the response.
                    new ResponseBuilder("text/plain", async (qr, ct) =>
                    {
                        return new System.Net.Http.HttpResponseMessage
                        {
                            Content = new System.Net.Http.StringContent("Hello world Test Text!")
                        };
                    })
                }, typeof(string)));
        }
    }

    // This class defines the type of data object that will be sent to the client.
    public class DataObject
    {
        public string Message { get; set; }
    }

    // This class defines the type of data object that will be sent from the client to the server.
    public class PostedMessage
    {
        public string Input { get; set; }
        public string Output { get; set; }
    }
}
