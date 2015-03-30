using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ActionHandler;
using System.Web.SessionState;
using ActionHandler.FRAMEWORK;

namespace EnglishCamp.Action
{
    /// <summary>
    /// Summary description for ProcessFrontendAction
    /// </summary>
    public class ProcessFrontendAction : IHttpHandler, IRequiresSessionState
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

        
        static ProcessFrontendAction()
        {
            RegisterAction("CORE", new COREAction());
            RegisterAction("Contents", new ContentsAction());
            RegisterAction("CategoryLevel1", new CategoryLevel1Action());
            RegisterAction("CategoryLevel2", new CategoryLevel2Action());
            RegisterAction("Configs", new ConfigsAction());
            RegisterAction("Albums", new AlbumsAction());
            RegisterAction("SystemUsers", new SystemUsersAction());
            RegisterAction("Files", new FilesAction());
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