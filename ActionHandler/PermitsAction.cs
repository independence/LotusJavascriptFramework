using System;
using System.Collections.Generic;
using System.Linq;
using System.Data.Entity;
using System.Web;

using Newtonsoft.Json;
using EntitiesExt;
using Newtonsoft.Json.Converters;
using BussinessLogic;
using DataAccess;


namespace ActionHandler
{
    public class PermitsAction : IAction
    {
        #region IAction Members

        public void Do(HttpContext context)
        {
            string action = context.Request["action"].ToString();
            if (!String.IsNullOrEmpty(action))
            {
                switch (action)
                {
                    case "Ins":
                        Ins(context);
                        break;
                    case "Sel":
                        Sel(context);
                        break;
                    case "Sel_Page_ForFlexigrid":
                        //Sel_Page_ForFlexigrid(context);
                        break;
                    case "Upd":
                        Upd(context);
                        break;
                    case "Del":
                        Del(context);
                        break;
                    case "Sel_all":
                        Sel_all(context);
                        break;  

                    default:
                        context.Response.Write("Can't find action");
                        break;
                }
            }
        }
        #endregion


		private IsoDateTimeConverter _converter = new IsoDateTimeConverter();


        public void Ins(HttpContext context)
        {
			String jSonString = "";
           try
           {
			
				
				Permits aPermits = new Permits();

				
				aPermits.Name = !String.IsNullOrEmpty(context.Request.Form["txt_Name"]) ? Convert.ToString(context.Request.Form["txt_Name"]) : "";
				
				aPermits.IsAdmin = !String.IsNullOrEmpty(context.Request.Form["txt_IsAdmin"]) ? Convert.ToBoolean(context.Request.Form["txt_IsAdmin"]) : false;
				
				aPermits.IsContent = !String.IsNullOrEmpty(context.Request.Form["txt_IsContent"]) ? Convert.ToBoolean(context.Request.Form["txt_IsContent"]) : false;
				
				aPermits.IsPartner = !String.IsNullOrEmpty(context.Request.Form["txt_IsPartner"]) ? Convert.ToBoolean(context.Request.Form["txt_IsPartner"]) : false;

                aPermits.Type = !String.IsNullOrEmpty(context.Request.Form["txt_Type"]) ? Convert.ToInt32(context.Request.Form["txt_Type"]) : 0;

                aPermits.Status = !String.IsNullOrEmpty(context.Request.Form["txt_Status"]) ? Convert.ToInt32(context.Request.Form["txt_Status"]) : 0;
                PermitsBO aPermitsBO = new PermitsBO();
                int ret = aPermitsBO.Ins(aPermits);


					if (ret == 0)
					{ jSonString = "{\"status\": \"success\"}"; }
					if (ret != 0)
					{ jSonString = "{\"status\":\"error|" + ret.ToString() + "\"}"; }
            }
            catch (Exception ex)
            {
                jSonString = "{\"status\":\"error\" ,\"message\":\"" + ex.Message.ToString() + "\"}";
            }
            finally 
            {
                context.Response.Write(jSonString);
            }
        }

        public void Upd(HttpContext context)
        {
			String jSonString = "";
			try
			{
				Permits aPermits = new Permits();
				int IDPermits = Convert.ToInt32(context.Request.QueryString["IDPermits"]);

				aPermits.ID = IDPermits;

                aPermits.Name = !String.IsNullOrEmpty(context.Request.Form["txt_Name"]) ? Convert.ToString(context.Request.Form["txt_Name"]) : aPermits.Name;

                aPermits.IsAdmin = !String.IsNullOrEmpty(context.Request.Form["txt_IsAdmin"]) ? Convert.ToBoolean(context.Request.Form["txt_IsAdmin"]) : aPermits.IsAdmin;

                aPermits.IsContent = !String.IsNullOrEmpty(context.Request.Form["txt_IsContent"]) ? Convert.ToBoolean(context.Request.Form["txt_IsContent"]) : aPermits.IsContent;

                aPermits.IsPartner = !String.IsNullOrEmpty(context.Request.Form["txt_IsPartner"]) ? Convert.ToBoolean(context.Request.Form["txt_IsPartner"]) : aPermits.IsPartner;

                aPermits.Type = !String.IsNullOrEmpty(context.Request.Form["txt_Type"]) ? Convert.ToInt32(context.Request.Form["txt_Type"]) : aPermits.Type;

                aPermits.Status = !String.IsNullOrEmpty(context.Request.Form["txt_Status"]) ? Convert.ToInt32(context.Request.Form["txt_Status"]) : aPermits.Status;
                PermitsBO aPermitsBO = new PermitsBO();
                int ret = aPermitsBO.Upd(aPermits);

					if (ret == 0)
					{ jSonString = "{\"status\": \"success\"}"; }
					if (ret != 0)
					{ jSonString = "{\"status\":\"error|" + ret.ToString() + "\"}"; }
            }
            catch (Exception ex)
            {
                jSonString = "{\"status\":\"error\" ,\"message\":\"" + ex.Message.ToString() + "\"}";
            }
            finally 
            {
                context.Response.Write(jSonString);
            }
        }



        public void Sel(HttpContext context)
        {
            String _jSonString = "";
            int IDPermits;
            Permits aPermits = new Permits();
            PermitsBO aPermitsBO = new PermitsBO();
            if (!String.IsNullOrEmpty(context.Request.QueryString["IDPermits"].ToString()))
            {
                IDPermits = int.Parse(context.Request.QueryString["IDPermits"].ToString());
                aPermits = aPermitsBO.Sel(IDPermits);
            }
            if (aPermits != null)
            {
                _converter.DateTimeFormat = "dd/MM/yyyy";
                _jSonString = JsonConvert.SerializeObject(aPermits, _converter);

            }
            _jSonString = "{\"Permits\":" + _jSonString + "}";
            context.Response.Write(_jSonString);
        }



        public void Sel_all(HttpContext context)
        {

            String jSonString = "";
            PermitsBO aPermitsBO = new PermitsBO();
            List<Permits> obj = aPermitsBO.Sel_All();

            if (obj != null)
            {
                _converter.DateTimeFormat = "dd/MM/yyyy";
                jSonString = JsonConvert.SerializeObject(obj, _converter);
            }
            jSonString = "{\"data\":" + jSonString + "}";
            context.Response.Write(jSonString);
        }
        public void Del(HttpContext context)
        {
			String jSonString = "";
			try
			{

				int IDPermits = Convert.ToInt32(context.Request.QueryString["IDPermits"]);

                PermitsBO aPermitsBO = new PermitsBO();
                int ret = aPermitsBO.Del_ByID(IDPermits);


					if (ret == 0)
					{ jSonString = "{\"status\": \"success\"}"; }
					if (ret != 0)
					{ jSonString = "{\"status\":\"error|" + ret.ToString() + "\"}"; }
            }
            catch (Exception ex)
            {
                jSonString = "{\"status\":\"error\" ,\"message\":\"" + ex.Message.ToString() + "\"}";
            }
            finally 
            {
                context.Response.Write(jSonString);
            }
        }
    }
}
