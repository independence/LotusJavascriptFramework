using CORE;
using DataAccess;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace CMS
{
    public partial class WebDefault : System.Web.UI.MasterPage
    {

        private IsoDateTimeConverter _converter = new IsoDateTimeConverter();
        private IFormatProvider culture = new CultureInfo("es-ES", true);
      
        protected void Page_Load(object sender, EventArgs e)
        {
            
            txtCurrentUser.Value = Session["LoginAccount"].ToString();
            //txtLANG_DATA_MASTER.Value = CORE_Language.Load_Languages_MasterPage_ToSession(this.Page, "CMS");
            
            ////txtLANG_DATA.Value = CORE_Language.Load_Languages_Page_ToSession(this.Page, "CMS");

            txtNumLang.Value = CORE_Language.sys_NUM_LANG.ToString();
            txtCurLang.Value = CORE_Language.sys_CUR_LANG.ToString();
            txtDefLang.Value = CORE_Language.sys_DEF_LANG.ToString();

            if (Session["LoginAccount"] != null)
            {
                SystemUsers aSystemUsers = (SystemUsers)Session["LoginAccount"];
                //lbCurrentUser.Text = "[" + aSystemUsers.Username + "][" + aSystemUsers.Email + "]";
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