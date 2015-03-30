using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using EntitiesExt;
using Library;
using CORE;
using DataAccess;

namespace CMS
{
    public partial class Contents_History_Manager : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Session["LoginAccount"] == null)
            {
                Response.Redirect("../CheckLogin.aspx");
            }
            else
            {
                bool IsAvailActionPage = false;
                IsAvailActionPage = CheckPermit(HttpContext.Current.Request.Url.AbsolutePath, CustomType.PermitActionType.View);
                if (IsAvailActionPage == false)
                {
                    Response.Redirect("../Error1.htm");
                }
            }
            
            
            //txtLANG_DATA.Value = CORE_Language.Load_Languages_Page_ToSession(this.Page,"CMS");
        }
        protected bool CheckPermit(string url, CustomType.PermitActionType aPermitActionType)
        {

            SystemUsers aSystemUsers = (SystemUsers)Session["LoginAccount"];
            List<vw_PermitViewAll> aList_PermitViewAll = (List<vw_PermitViewAll>)Session["LoginPermitViewAll"];
            if (aSystemUsers != null)
            {
                for (int i = 0; i < aList_PermitViewAll.Count; i++)
                {
                    if (aPermitActionType == CustomType.PermitActionType.Delele)
                    {
                        if ((aList_PermitViewAll[i].PermitDetails_PageURL == url) && (aList_PermitViewAll[i].Permits_SystemUsers_IsDelete == true))
                        { return true; }

                    }
                    else if (aPermitActionType == CustomType.PermitActionType.Insert)
                    {
                        if ((aList_PermitViewAll[i].PermitDetails_PageURL == url) && (aList_PermitViewAll[i].Permits_SystemUsers_IsInsert == true))
                        { return true; }

                    }
                    else if (aPermitActionType == CustomType.PermitActionType.Special)
                    {
                        if ((aList_PermitViewAll[i].PermitDetails_PageURL == url) && (aList_PermitViewAll[i].Permits_SystemUsers_IsSpecial == true))
                        { return true; }

                    }
                    else if (aPermitActionType == CustomType.PermitActionType.Update)
                    {
                        if ((aList_PermitViewAll[i].PermitDetails_PageURL == url) && (aList_PermitViewAll[i].Permits_SystemUsers_IsUpdate == true))
                        { return true; }

                    }
                    else if (aPermitActionType == CustomType.PermitActionType.View)
                    {
                        if ((aList_PermitViewAll[i].PermitDetails_PageURL == url) && (aList_PermitViewAll[i].Permits_SystemUsers_IsView == true))
                        { return true; }

                    }
                }
                return false;
            }
            return false;
        }
    }
}