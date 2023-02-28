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

namespace UnitePlugin.CompositionApi.Api
{
    //P.S. Class implementing IApiProviderFor<QER.CompositionApi.Portal.PortalApiProject>
    //will be included in the "Portal" project.
    //This way we can extend portal project with custom methods
    //and user's login to portal will work with this plugin.
    public class MyMethods : IApiProviderFor<QER.CompositionApi.Portal.PortalApiProject>, IApiProvider
    {
        public void Build(IApiBuilder builder)
        {            
            builder.AddMethod(Method.Define("uniteplugin/getreportsrolesscript/{centralaccount}")
                .WithParameter("centralaccount", typeof(string), isInQuery: false)
                .HandleGet(qr =>
                {
                    //var allow = qr.Route.Method.Settings.AllowUnauthenticated;

                    // Setup the script runner
                    var scriptClass = qr.Session.Scripts().GetScriptClass(ScriptContext.Scripts);
                    var runner = new ScriptRunner(scriptClass, qr.Session);

                    // Add any script input parameters to this array.
                    // In this example, the script parameters are defined as
                    // URL parameters, and their values must be supplied
                    // by the client. This does not have to be the case.
                    var parameters = new object[]
                    {
                        qr.Parameters.Get<string>("centralaccount")
                    };

                    // This assumes that the script returns a string.
                    var ret = runner.Eval("CCC_Call_Database_Direct", parameters);

                    return System.Threading.Tasks.Task.FromResult(ret);
                }));


            builder.AddMethod(Method.Define("uniteplugin/getreportsrolessql/{centralaccount}")
                //.AllowUnauthenticated()
                // Insert the statement name (QBMLimitedSQL.Ident_QBMLimitedSQL) and the type
                .HandleGetBySqlStatement("CCC_Get_Reports_With_Business_Roles", SqlStatementType.SqlExecute)
                .WithParameter("centralaccount", typeof(string), isInQuery: false)
                // Define the result schema columns and data types
                //CentralAccount, FirstName, LastName, Title, Ident_Org 
                .WithResultColumns(
                    new SqlResultColumn("CentralAccount", ValType.String),
                    new SqlResultColumn("FirstName", ValType.Int),
                    new SqlResultColumn("LastName", ValType.Int),
                    new SqlResultColumn("Title", ValType.Int),
                    new SqlResultColumn("Ident_Org", ValType.Int)                   
                    )
                );

            builder.AddMethod(Method.Define("uniteplugin/averageapptovaltime/{daysToCheck}")
                //.AllowUnauthenticated()
                // Insert the statement name (QBMLimitedSQL.Ident_QBMLimitedSQL) and the type
                .HandleGetBySqlStatement("CCC_Average_Approval_Time", SqlStatementType.SqlExecute)
                .WithParameter("daysToCheck", typeof(int), isInQuery: false)
                // Define the result schema columns and data types
                //DisplayPersonOrdered, OrderDate, DisplayOrg, OrderState,OrderStateDisplay, UserAverage, OrgAverageMinutes, GlobalAverageMinutes
                .WithResultColumns(
                    new SqlResultColumn("DisplayPersonOrdered", ValType.String),
                    new SqlResultColumn("OrderDate", ValType.Int),
                    new SqlResultColumn("DisplayOrg", ValType.Int),
                    new SqlResultColumn("OrderState", ValType.Int),
                    new SqlResultColumn("OrderStateDisplay", ValType.Int),
                    new SqlResultColumn("UserAverage", ValType.Int),
                    new SqlResultColumn("OrgAverageMinutes", ValType.Int),
                    new SqlResultColumn("GlobalAverageMinutes", ValType.Int)
                    )
                );
        }
    }

    
}

