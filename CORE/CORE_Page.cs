using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess;
using Library;
using System.Web.UI;
using System.Web;

namespace CORE
{
    public class CORE_Page:Page
    {
        private bool CheckPermit(string url, CustomType.PermitActionType aPermitActionType)
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

        protected void CheckRedirectPage()
        {
           if (Session["LoginAccount"] == null)
            {
                Response.Redirect("Login.aspx");
            }
            else
            {
                bool IsAvailActionPage = false;
                IsAvailActionPage = CheckPermit(HttpContext.Current.Request.Url.AbsolutePath, CustomType.PermitActionType.View);
                if (IsAvailActionPage == false)
                {
                    Response.Redirect("Error1.htm");
                }
            }

        }

    }
}
