using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using EntitiesExt;
using BussinessLogic;
using Newtonsoft.Json.Converters;
using System.Globalization;
using Newtonsoft.Json;
using CORE;
using DataAccess;


namespace CMS.Modules
{
    public partial class ucMenuAdmin : System.Web.UI.UserControl
    {
        private IsoDateTimeConverter _converter = new IsoDateTimeConverter();
        private IFormatProvider culture = new CultureInfo("es-ES", true);
        public List<LanguagesItem> List_ItemLang;

        protected void Page_Load(object sender, EventArgs e)
        {
            //CORE_Language.Load_Languages_Page_ToSession(this.Page, "CMS");
            if (Session["LoginAccount"] != null)
            {
                 SystemUsers aSystemUsers = (SystemUsers)Session["LoginAccount"];
                 lbCurrentUser.Text = "[" + aSystemUsers.Username + "][" + aSystemUsers.Email + "]";
              
            }
            else
            {
                Response.Redirect("../Error1.htm");
            }
        }
        protected void btnLogout_Click(object sender, EventArgs e)
        {
            Session.RemoveAll();
            Session.Abandon();
            Response.Redirect("http://"+HttpContext.Current.Request.Url.Authority);
        }
    }
}