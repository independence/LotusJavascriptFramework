using System;
using System.Collections.Generic;
using System.Linq;

using System.Web;

using Newtonsoft.Json;
using EntitiesExt;
using Newtonsoft.Json.Converters;
using BussinessLogic;
using DataAccess;


namespace ActionHandler
{
    public class PermitDetailsAction : IAction
    {
        #region IAction Members

        public void Do(HttpContext context)
        {
            //string action = context.Request["action"].ToString();
            //if (!String.IsNullOrEmpty(action))
            //{
            //    switch (action)
            //    {
            //        case "Ins":
            //            Ins(context);
            //            break;
            //        case "Sel":
            //            Sel(context);
            //            break;
            //        case "Sel_Page_ForFlexigrid":
            //            //Sel_Page_ForFlexigrid(context);
            //            break;
            //        case "Upd":
            //            Upd(context);
            //            break;
            //        case "Del":
            //            Del(context);
            //            break;
            //        case "Sel_all":
            //            Sel_all(context);
            //            break;  

            //        default:
            //            context.Response.Write("Can't find action");
            //            break;
            //    }
            //}
        }
        #endregion


        //private IsoDateTimeConverter _converter = new IsoDateTimeConverter();
        //public void GetBy_ID(HttpContext context)
        //{
        //    String _jSonString = "";
        //    int IDPermitDetails;
        //    PermitDetails aPermitDetails = new PermitDetails();
        //    PermitDetailsBO aPermitDetailsBO = new PermitDetailsBO();
        //    if (!String.IsNullOrEmpty(context.Request.QueryString["IDPermitDetails"].ToString()))
        //    {
        //        IDPermitDetails= int.Parse(context.Request.QueryString["IDPermitDetails"].ToString());
        //        aPermitDetails = aPermitDetailsBO.Sel_ByID(IDPermitDetails);
        //    }
        //    if (aPermitDetails != null)
        //    {
        //        _converter.DateTimeFormat = "dd/MM/yyyy";
        //        _jSonString = JsonConvert.SerializeObject(aPermitDetails, _converter);

        //    }
        //    _jSonString = "{PermitDetails:" + _jSonString + "}";
        //    context.Response.Write(_jSonString);
        //}

        //public void Ins(HttpContext context)
        //{
        //    String jSonString = "";
        //    try
        //    {


        //        PermitDetails aPermitDetails = new PermitDetails();
        //        PermitDetailsBO aPermitDetailsBO = new PermitDetailsBO();

        //        aPermitDetails.IDPermit = !String.IsNullOrEmpty(context.Request.Form["txt_IDPermit"]) ? Convert.ToInt32(context.Request.Form["txt_IDPermit"]) : 0;

        //        aPermitDetails.Name = !String.IsNullOrEmpty(context.Request.Form["txt_Name"]) ? Convert.ToString(context.Request.Form["txt_Name"]) : "";

        //        aPermitDetails.PageURL = !String.IsNullOrEmpty(context.Request.Form["txt_PageURL"]) ? Convert.ToString(context.Request.Form["txt_PageURL"]) : "";

        //        aPermitDetails.Type = !String.IsNullOrEmpty(context.Request.Form["txt_Type"]) ? Convert.ToInt32(context.Request.Form["txt_Type"]) : 0;

        //        aPermitDetails.Status = !String.IsNullOrEmpty(context.Request.Form["txt_Status"]) ? Convert.ToInt32(context.Request.Form["txt_Status"]) : 0;
        //        int ret = aPermitDetailsBO.Ins(aPermitDetails);


        //        if (ret > 0)
        //        { jSonString = "{\"status\": \"success\"}"; }
        //        if (ret == 0)
        //        { jSonString = "{\"status\":\"error|" + ret.ToString() + "\"}"; }
        //    }
        //    catch (Exception ex)
        //    {
        //        jSonString = "{\"status\":\"error\" ,\"message\":\"" + ex.Message.ToString() + "\"}";
        //    }
        //    finally
        //    {
        //        context.Response.Write(jSonString);
        //    }
        //}

        //public void Upd(HttpContext context)
        //{
        //    String jSonString = "";
        //    try
        //    {
        //        PermitDetails aPermitDetails = new PermitDetails();
        //        PermitDetailsBO aPermitDetailsBO = new PermitDetailsBO();
        //        int IDPermitDetails = Convert.ToInt32(context.Request.QueryString["IDPermitDetails"]);

        //        aPermitDetails.ID = IDPermitDetails;

        //        aPermitDetails.IDPermit = !String.IsNullOrEmpty(context.Request.Form["txt_IDPermit"]) ? Convert.ToInt32(context.Request.Form["txt_IDPermit"]) : aPermitDetails.IDPermit;

        //        aPermitDetails.Name = !String.IsNullOrEmpty(context.Request.Form["txt_Name"]) ? Convert.ToString(context.Request.Form["txt_Name"]) : aPermitDetails.Name;

        //        aPermitDetails.PageURL = !String.IsNullOrEmpty(context.Request.Form["txt_PageURL"]) ? Convert.ToString(context.Request.Form["txt_PageURL"]) : aPermitDetails.PageURL;

        //        aPermitDetails.Type = !String.IsNullOrEmpty(context.Request.Form["txt_Type"]) ? Convert.ToInt32(context.Request.Form["txt_Type"]) : aPermitDetails.Type;

        //        aPermitDetails.Status = !String.IsNullOrEmpty(context.Request.Form["txt_Status"]) ? Convert.ToInt32(context.Request.Form["txt_Status"]) : aPermitDetails.Status;

        //        int ret = aPermitDetailsBO.Upd(aPermitDetails);

        //        if (ret > 0)
        //        { jSonString = "{\"status\": \"success\"}"; }
        //        if (ret == 0)
        //        { jSonString = "{\"status\":\"error|" + ret.ToString() + "\"}"; }
        //    }
        //    catch (Exception ex)
        //    {
        //        jSonString = "{\"status\":\"error\" ,\"message\":\"" + ex.Message.ToString() + "\"}";
        //    }
        //    finally
        //    {
        //        context.Response.Write(jSonString);
        //    }
        //}



        //public void Sel(HttpContext context)
        //{

        //    String jSonString = "";
        //    int IDPermitDetails= Convert.ToInt32(context.Request.QueryString["IDPermitDetails"]);

        //    PermitDetailsBO aPermitDetailsBO = new PermitDetailsBO();
        //    PermitDetails obj = aPermitDetailsBO.Sel(IDPermitDetails);

        //    if (obj != null)
        //    {
        //        _converter.DateTimeFormat = "dd/MM/yyyy";
        //        jSonString = JsonConvert.SerializeObject(obj, _converter);
        //    }
        //    jSonString = "{\"PermitDetails\":" + jSonString + "}";
        //    context.Response.Write(jSonString);
        //}

        //public void Sel_all(HttpContext context)
        //{

        //    String jSonString = "";
        //    PermitDetailsBO aPermitDetailsBO = new PermitDetailsBO();
        //    List<PermitDetails> obj = aPermitDetailsBO.Sel_all();

        //    if (obj != null)
        //    {
        //        _converter.DateTimeFormat = "dd/MM/yyyy";
        //        jSonString = JsonConvert.SerializeObject(obj, _converter);
        //    }
        //    jSonString = "{\"PermitDetails\":" + jSonString + "}";
        //    context.Response.Write(jSonString);
        //}
        //public void Del(HttpContext context)
        //{
        //    String jSonString = "";
        //    try
        //    {

        //        int IDPermitDetails= Convert.ToInt32(context.Request.QueryString["IDPermitDetails"]);

        //        PermitDetailsBO aPermitDetailsBO = new PermitDetailsBO();
        //        int ret = aPermitDetailsBO.Del(IDPermitDetails);


        //            if (ret == 0)
        //            { jSonString = "{\"status\": \"success\"}"; }
        //            if (ret != 0)
        //            { jSonString = "{\"status\":\"error|" + ret.ToString() + "\"}"; }
        //    }
        //    catch (Exception ex)
        //    {
        //        jSonString = "{\"status\":\"error\" ,\"message\":\"" + ex.Message.ToString() + "\"}";
        //    }
        //    finally 
        //    {
        //        context.Response.Write(jSonString);
        //    }
        //}
    }
}
