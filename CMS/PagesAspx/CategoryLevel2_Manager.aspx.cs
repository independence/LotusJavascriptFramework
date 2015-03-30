using System;
using BussinessLogic;
using EntitiesExt;
using Library;
using System.Collections.Generic;
using System.Web;
using CORE;
using DataAccess;


namespace CMS
{
    public partial class CategoryLevel2_Manager : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Session["LoginAccount"] == null)
            {
                Response.Redirect("../Login.aspx");
            }
            else
            {
                bool IsAvailActionPage = false;
                IsAvailActionPage = CheckPermit(HttpContext.Current.Request.Url.AbsolutePath, CustomType.PermitActionType.View);
                if (IsAvailActionPage == false)
                {
                    //Response.Redirect("../Error1.htm");
                }
            }
            //========================================================
            // Khởi tạo xử lý đa ngôn ngữ từng trang
            // txtLANG_DATA : Thẻ Hidden phải có trong từng trang ASPX
            //========================================================

            

            //========================================================

            //========================================================
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