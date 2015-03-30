using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
//using VTCeBank.SSO.Utils;

namespace CMS
{
    public partial class Default : System.Web.UI.Page
    {

        protected void Page_Load(object sender, EventArgs e)
        {

            if (Session["LoginAccount"] != null)
            {
                Response.Redirect("Main.aspx");
            }
            else
            {
                Response.Redirect("Login.aspx");
            }
        }

    }
}
