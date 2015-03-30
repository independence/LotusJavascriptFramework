using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ActionHandler;
using System.Web;
using CORE;
using DataAccess;
using Newtonsoft.Json.Converters;
using System.Globalization;

namespace ActionHandler.FRAMEWORK
{
    public class COREAction : IAction
    {
        public SystemUsers aCurrentSystemUsers = new SystemUsers();
        private IsoDateTimeConverter _converter = new IsoDateTimeConverter();
        private IFormatProvider culture = new CultureInfo("es-ES", true);

        public void Do(HttpContext context)
        {
            string action = context.Request["action"].ToString();
            if (!String.IsNullOrEmpty(action))
            {
                this.aCurrentSystemUsers = (SystemUsers)context.Session["LoginAccount"];
                switch (action.ToUpper())
                {
                    case "STATIC_DATA_LANGUAGE":
                        GetStaticDataLanguage(context);
                        break;
                    case "DYNAMIC_DATA_LANGUAGE":
                        GetDynamicDataLanguage(context);
                        break;
                    default:
                        context.Response.Write("Can't find action");
                        break;
                }
            }
        }

        public void GetStaticDataLanguage(HttpContext context)
        {
         
            String jSonString = "";
            try
            {

                jSonString = CORE_Language.Load_StaticDataLanguage_Page(context, "CMS");

            }
            catch (Exception ex)
            {
                jSonString = "{\"status\":\"error\" ,\"message\":\"" + ex.Message.ToString() + "\"}";
            }
            finally
            {
                context.Response.Write(jSonString);
            }
        }
        public void GetDynamicDataLanguage(HttpContext context)
        {

            String jSonString = "";
            try
            {

                jSonString = CORE_Language.Load_DynamicDataLanguage_Page(context, "CMS");

            }
            catch (Exception ex)
            {
                jSonString = "{\"status\":\"error\" ,\"message\":\"" + ex.Message.ToString() + "\"}";
            }
            finally
            {
                context.Response.Write(jSonString);
            }
        }

    }
}
