using System;
using BussinessLogic;
using EntitiesExt;
using Library;

using System.Web;
using System.Collections.Generic;
using System.Configuration;
using System.Xml.Linq;
using Newtonsoft.Json.Converters;
using System.Globalization;
using Newtonsoft.Json;
using System.Xml;
using CORE;
using DataAccess;

namespace CMS
{
    public partial class WebDefault1 : System.Web.UI.MasterPage
    {
        private IsoDateTimeConverter _converter = new IsoDateTimeConverter();
        private IFormatProvider culture = new CultureInfo("es-ES", true);

        protected void Page_Load(object sender, EventArgs e)
        {
            
            txtCurrentUser.Value = Session["LoginAccount"].ToString();
            //txtLANG_DATA_MASTER.Value = CORE_Language.Load_Languages_MasterPage_ToSession(this.Page, "CMS");
            
            txtNumLang.Value = CORE_Language.sys_NUM_LANG.ToString();
            txtCurLang.Value = CORE_Language.sys_CUR_LANG.ToString();
            txtDefLang.Value = CORE_Language.sys_DEF_LANG.ToString();

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
            Response.Redirect("http://" + HttpContext.Current.Request.Url.Authority);
        }

      

    }
}