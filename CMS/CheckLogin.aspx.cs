using System;
using System.Collections.Generic;
//using VTCeBank.SSO.Utils;
using BussinessLogic;
using EntitiesExt;
using Library;
using System.Web;
using DataAccess;
using CORE;

namespace CMS
{
    public partial class CheckLogin : CORE.CORE_Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

            SystemUsersBO aSystemUsersBO = new SystemUsersBO();
            PermitsBO aPermitsBO = new PermitsBO();

            if (IsPostBack == true)
            {
                string Pass = Library.StringUtility.md5(Page.Request.Form["txt_password"].ToString());
                string User = Page.Request.Form["txt_username"].ToString();
                bool Disable = true;
                SystemUsers aSystemUsers = aSystemUsersBO.Sel_ByUsername_ByPassword(User, Pass,Disable);
                if (aSystemUsers!= null)
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
