using System;
using System.Collections.Generic;
using System.Linq;

using System.Web;
using DataAccess;
using Newtonsoft.Json;
using EntitiesExt;
using Newtonsoft.Json.Converters;
using BussinessLogic;

namespace ActionHandler
{
    public class LanguagesAction : IAction
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
                    
                    case "Upd_ByID":
                        Upd_ByID(context);
                        break;
                    case "Del":
                        Del_ByID(context);
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

        LanguagesBO aLanguagesBO = new LanguagesBO();

        public void Ins(HttpContext context)
        {
            LanguagesBO aLanguagesBO = new LanguagesBO();
			String jSonString = "";
           try
           {
			
				
				Languages aLanguages = new Languages();

				
				
				aLanguages.NameLang = !String.IsNullOrEmpty(context.Request.Form["txt_NameLang"]) ? Convert.ToString(context.Request.Form["txt_NameLang"]) : aLanguages.NameLang;
				
				aLanguages.Image = !String.IsNullOrEmpty(context.Request.Form["txt_Image"]) ? Convert.ToString(context.Request.Form["txt_Image"]) : aLanguages.Image;
				
				aLanguages.Directory = !String.IsNullOrEmpty(context.Request.Form["txt_Directory"]) ? Convert.ToString(context.Request.Form["txt_Directory"]) : aLanguages.Directory;
				
				aLanguages.Filename = !String.IsNullOrEmpty(context.Request.Form["txt_Filename"]) ? Convert.ToString(context.Request.Form["txt_Filename"]) : aLanguages.Filename;

                aLanguages.Status = !String.IsNullOrEmpty(context.Request.Form["txt_Status"]) ? Convert.ToInt32(context.Request.Form["txt_Status"]) : aLanguages.Status;


                int ret = aLanguagesBO.Ins(aLanguages);


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

        public void Upd_ByID(HttpContext context)
        {
            LanguagesBO aLanguagesBO = new LanguagesBO();

			String jSonString = "";
			try
			{
				Languages aLanguages = new Languages();
                int LanguagesID = Convert.ToInt32(context.Request.QueryString["IDLanguages"]);


                aLanguages = aLanguagesBO.Sel(LanguagesID);
				
			
				aLanguages.NameLang = !String.IsNullOrEmpty(context.Request.Form["txt_NameLang"]) ? Convert.ToString(context.Request.Form["txt_NameLang"]) : aLanguages.NameLang;
				
				aLanguages.Image = !String.IsNullOrEmpty(context.Request.Form["txt_Image"]) ? Convert.ToString(context.Request.Form["txt_Image"]) : aLanguages.Image;
				
				aLanguages.Directory = !String.IsNullOrEmpty(context.Request.Form["txt_Directory"]) ? Convert.ToString(context.Request.Form["txt_Directory"]) : aLanguages.Directory;
				
				aLanguages.Filename = !String.IsNullOrEmpty(context.Request.Form["txt_Filename"]) ? Convert.ToString(context.Request.Form["txt_Filename"]) : aLanguages.Filename;

                aLanguages.Status = !String.IsNullOrEmpty(context.Request.Form["txt_Status"]) ? Convert.ToInt32(context.Request.Form["txt_Status"]) : aLanguages.Status;


                int ret = aLanguagesBO.Upd(aLanguages);

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

            String jSonString = "";
            int LanguagesID = Convert.ToInt32(context.Request.QueryString["IDLanguages"]);


            Languages obj = aLanguagesBO.Sel(LanguagesID);

            if (obj != null)
            {
                _converter.DateTimeFormat = "dd/MM/yyyy";
                jSonString = JsonConvert.SerializeObject(obj, _converter);
            }
            jSonString = "{\"Languages\":" + jSonString + "}";
            context.Response.Write(jSonString);
        }
        public void Sel_all(HttpContext context)
        {

            String jSonString = "";
            List<Languages> obj = aLanguagesBO.Sel();

            if (obj != null)
            {
                _converter.DateTimeFormat = "dd/MM/yyyy";
                jSonString = JsonConvert.SerializeObject(obj, _converter);
            }
            jSonString = "{\"data\":" + jSonString + "}";
            context.Response.Write(jSonString);
        }
        public void Del_ByID(HttpContext context)
        {
			String jSonString = "";
			try
			{

                int LanguagesID = Convert.ToInt32(context.Request.QueryString["IDLanguages"]);


                int ret = aLanguagesBO.Del(LanguagesID);


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
