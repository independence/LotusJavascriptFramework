using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ActionHandler;
using ActionHandler.FRAMEWORK;

using System.Web.SessionState;
using EntitiesExt;


namespace CMS.Action
{
    /// <summary>

    /// </summary>
    public class ProcessBackendAction : IHttpHandler, IRequiresSessionState
    {

        static readonly IDictionary<string, IAction> Dicts = new Dictionary<string, IAction>();
        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            string actionName = context.Request.QueryString["ActionObject"].Trim();
            IAction action = GetAction(actionName);
            if (action != null)
                action.Do(context);
        }

        static ProcessBackendAction()
        {
            RegisterAction("CORE", new COREAction());

            RegisterAction("Albums", new AlbumsAction());
            RegisterAction("Files", new FilesAction());
            RegisterAction("Configs", new ConfigsAction());
            RegisterAction("Languages", new LanguagesAction());

          
            RegisterAction("Contents", new ContentsAction());
            RegisterAction("Contents_CategoryLevel1", new Contents_CategoryLevel1Action());
            
            RegisterAction("CategoryLevel1", new CategoryLevel1Action());
            RegisterAction("CategoryLevel2", new CategoryLevel2Action());
            RegisterAction("PermitDetails", new PermitDetailsAction());
            RegisterAction("Permits", new PermitsAction());
       
            RegisterAction("SystemUsers", new SystemUsersAction());
        }

        public static IAction GetAction(string actionName)
        {
            IAction action;
            if (Dicts.TryGetValue(actionName, out action))
            {
                return action;
            }
            return null;
        }

        public static void RegisterAction(string actionName, IAction action)
        {
            Dicts[actionName] = action;
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}