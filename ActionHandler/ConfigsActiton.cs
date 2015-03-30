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
    public class ConfigsAction : IAction
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
  
                    case "Upd":
                        Upd(context);
                        break;
                    case "Del":
                        Del(context);
                        break;
                    case "Sel_all":
                        Sel_all(context);
                        break;
                    case "Sel_ByAccessKey":
                        Sel_ByAccessKey(context);
                        break;
                    default:
                        context.Response.Write("Can't find action");
                        break;
                }
            }
        }
        #endregion


        private IsoDateTimeConverter _converter = new IsoDateTimeConverter();
        public void GetBy_IDConfigs(HttpContext context)
        {
            ConfigsBO aConfigsBO = new ConfigsBO();
            String _jSonString = "";
            int IDConfigs;
            Configs aConfigs = new Configs();
            if (!String.IsNullOrEmpty(context.Request.QueryString["IDConfigs"].ToString()))
            {
                IDConfigs = int.Parse(context.Request.QueryString["IDConfigs"].ToString());
                aConfigs = aConfigsBO.Sel(IDConfigs);
            }
            if (aConfigs != null)
            {
                _converter.DateTimeFormat = "dd/MM/yyyy";
                _jSonString = JsonConvert.SerializeObject(aConfigs, _converter);

            }
            _jSonString = "{Configs:" + _jSonString + "}";
            context.Response.Write(_jSonString);
        }
        public void Sel_ByAccessKey(HttpContext context)
        {
            ConfigsBO aConfigsBO = new ConfigsBO();
            String _jSonString = "";
            string AccessKey;
            Configs aConfigs = new Configs();
            if (!String.IsNullOrEmpty(context.Request.QueryString["AccessKey"].ToString()))
            {
                AccessKey = context.Request.QueryString["AccessKey"].ToString();
                aConfigs = aConfigsBO.Sel_ByAccessKey(AccessKey);
            }
            if (aConfigs != null)
            {
                _converter.DateTimeFormat = "dd/MM/yyyy";
                _jSonString = JsonConvert.SerializeObject(aConfigs, _converter);

            }
            _jSonString = "{\"Configs\":" + _jSonString + "}";
          
            context.Response.Write(_jSonString);
        }
        public void Ins(HttpContext context)
        {
            String jSonString = "";
            try
            {


                Configs aConfigs = new Configs();


                aConfigs.AccessKey = !String.IsNullOrEmpty(context.Request.Form["txt_AccessKey"]) ? Convert.ToString(context.Request.Form["txt_AccessKey"]) : "";

                aConfigs.Value = !String.IsNullOrEmpty(context.Request.Form["txt_Value"]) ? Convert.ToString(context.Request.Form["txt_Value"]) : "";

                aConfigs.Status = !String.IsNullOrEmpty(context.Request.Form["txt_Status"]) ? Convert.ToInt32(context.Request.Form["txt_Status"]) : 0;
                aConfigs.Type = !String.IsNullOrEmpty(context.Request.Form["txt_Type"]) ? Convert.ToInt32(context.Request.Form["txt_Type"]) : 0;
                
                aConfigs.Group = !String.IsNullOrEmpty(context.Request.Form["txt_Group"]) ? Convert.ToInt32(context.Request.Form["txt_Group"]) : 0;
                aConfigs.Note = !String.IsNullOrEmpty(context.Request.Form["txt_Note"]) ? Convert.ToString(context.Request.Form["txt_Note"]) : "";
                ConfigsBO aConfigsBO = new ConfigsBO();
                int ret = aConfigsBO.Ins(aConfigs);


                if (ret != 0)
                { jSonString = "{\"status\": \"success\"}"; }
                if (ret == 0)
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
                Configs aConfigs = new Configs();
                int IDConfigs = Convert.ToInt32(context.Request.QueryString["IDConfigs"]);
                ConfigsBO aConfigsBO = new ConfigsBO();
                aConfigs = aConfigsBO.Sel(IDConfigs);
                aConfigs.ID = IDConfigs;

                aConfigs.AccessKey = !String.IsNullOrEmpty(context.Request.Form["txt_AccessKey"]) ? Convert.ToString(context.Request.Form["txt_AccessKey"]) : aConfigs.AccessKey;

                aConfigs.Value = !String.IsNullOrEmpty(context.Request.Form["txt_Value"]) ? Convert.ToString(context.Request.Form["txt_Value"]) : aConfigs.Value;

                aConfigs.Status = !String.IsNullOrEmpty(context.Request.Form["txt_Status"]) ? Convert.ToInt32(context.Request.Form["txt_Status"]) : aConfigs.Status;
                aConfigs.Group = !String.IsNullOrEmpty(context.Request.Form["txt_Group"]) ? Convert.ToInt32(context.Request.Form["txt_Group"]) : aConfigs.Group;
                aConfigs.Type = !String.IsNullOrEmpty(context.Request.Form["txt_Type"]) ? Convert.ToInt32(context.Request.Form["txt_Type"]) : aConfigs.Type;
                aConfigs.Note = !String.IsNullOrEmpty(context.Request.Form["txt_Note"]) ? Convert.ToString(context.Request.Form["txt_Note"]) : "";

                int ret = aConfigsBO.Upd(aConfigs);

                if (ret != 0)
                { jSonString = "{\"status\": \"success\"}"; }
                if (ret == 0)
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
            int IDConfigs = Convert.ToInt32(context.Request.QueryString["IDConfigs"]);

            ConfigsBO aConfigsBO = new ConfigsBO();
            Configs obj = aConfigsBO.Sel(IDConfigs);

            if (obj != null)
            {
                _converter.DateTimeFormat = "dd/MM/yyyy";
                jSonString = JsonConvert.SerializeObject(obj, _converter);
            }
            jSonString = "{\"Configs\":" + jSonString + "}";
            context.Response.Write(jSonString);
        }

        public void Sel_all(HttpContext context)
        {

            String jSonString = "";
            ConfigsBO aConfigsBO = new ConfigsBO();
            List<Configs> obj = aConfigsBO.Sel_all();

            if (obj != null)
            {
                _converter.DateTimeFormat = "dd/MM/yyyy";
                jSonString = JsonConvert.SerializeObject(obj, _converter);
            }
            jSonString = "{\"Configs\":" + jSonString + "}";
            context.Response.Write(jSonString);
        }
        public void Del(HttpContext context)
        {
            String jSonString = "";
            try
            {

                int IDConfigs = Convert.ToInt32(context.Request.QueryString["IDConfigs"]);

                ConfigsBO aConfigsBO = new ConfigsBO();
                int ret = aConfigsBO.Del(IDConfigs);


                if (ret != 0)
                { jSonString = "{\"status\": \"success\"}"; }
                if (ret == 0)
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
