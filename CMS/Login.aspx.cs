using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using BussinessLogic;
using DataAccess;

namespace CMS
{
    public partial class Login : CORE.CORE_Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

            SystemUsersBO aSystemUsersBO = new SystemUsersBO();
            PermitsBO aPermitsBO = new PermitsBO();

            if (IsPostBack == true)
            {
                string Pass = Library.StringUtility.md5(Page.Request.Form["txtPassword"].ToString());
                string User = Page.Request.Form["txtUsername"].ToString();
                bool disable = false;
                SystemUsers aSystemUsers = aSystemUsersBO.Sel_ByUsername_ByPassword(User, Pass,disable);

                if (aSystemUsers != null)
                {
                    Session["LoginAccount"] = aSystemUsers;
                    List<vw_PermitViewAll> ListPermitViewAll = aPermitsBO.GetAllInfoLogin_ByUsername(aSystemUsers.Username);
                    Session["LoginPermitViewAll"] = ListPermitViewAll;


                    Response.Redirect("Main.aspx");
                }
                else
                {

                    Response.Redirect("Default.aspx");
                }


            }

        }
    }
}