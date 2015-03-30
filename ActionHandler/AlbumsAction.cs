using System;
using System.Collections.Generic;
using System.Linq;
using System.Configuration;
using System.Web;
using Library;
using Newtonsoft.Json;
using EntitiesExt;
using Newtonsoft.Json.Converters;
using BussinessLogic;
using System.IO;
using System.Globalization;
using CORE;
using DataAccess;

namespace ActionHandler
{
    public class AlbumsAction : IAction
    {
        public class AlbumInfo
        {
            public Albums Albums = new Albums();
            public List<Files> ListFiles = new List<Files>();
        }
        public SystemUsers aCurrentSystemUsers = new SystemUsers();
      //  private IsoDateTimeConverter _converter = new IsoDateTimeConverter();

        public void Do(HttpContext context)
        {
            string action = context.Request["action"].ToString();
            if (!String.IsNullOrEmpty(action))
            {
                this.aCurrentSystemUsers = (SystemUsers)context.Session["LoginAccount"];
                switch (action)
                {

                    case "Sel_ByCode_ByIDLang":
                        Sel_ByCode_ByIDLang(context);
                        break;

                    case "Sel":
                        Sel(context);
                        break;

                    case "Sel_all_ByCode":

                        Sel_all_ByCode(context, CORE_Language.sys_CUR_LANG);
                        break;
                    case "Sel_all_ByIDLang":
                        Sel_all_ByIDLang(context, CORE_Language.sys_CUR_LANG);
                        break;

                    case "Upd_ByCode":
                        Upd_ByCode(context, CORE_Language.sys_CUR_LANG);
                        break;
                    case "Ins":
                        Ins(context, CORE_Language.sys_CUR_LANG);
                        break;

                    case "Del_ByCode":
                        Del_ByCode(context);
                        break;          
                    case "Upd_Disable":
                        Upd_Disable(context);
                        break;
                    default:
                        context.Response.Write("Can't find action");
                        break;
                }
            }
        }
        private IsoDateTimeConverter _converter = new IsoDateTimeConverter();

        private IFormatProvider culture = new CultureInfo("es-ES", true);

        public void Sel_all_ByCode(HttpContext context, int IDLang)
        {
            AlbumsBO aAlbumsBO = new AlbumsBO();
            String jSonString = "";
            //string Code = aAlbumsBO.Sel(int.Parse(context.Request.QueryString["IDAlbums"])).Code;

           // List<Albums> obj = aAlbumsBO.Sel_all_ByCode(Code);
            /*for (int i = 0; i < NUM_LANG; i++)
            {
                obj[i].Info = HttpUtility.HtmlDecode(obj[i].Info);
                obj[i].Intro = HttpUtility.HtmlDecode(obj[i].Intro);
            }*/
            /*
            if (obj != null)
            {
              //  _converter.DateTimeFormat = "dd/MM/yyyy";

                jSonString = JsonConvert.SerializeObject(obj, _converter);
            }
            */
            jSonString = "{\"Albums_Group\":" + jSonString + "}";
            context.Response.Write(jSonString);
        }

        public void Sel_all_ByIDLang(HttpContext context, int IDLang)
        {
            AlbumsBO aAlbumsBO = new AlbumsBO();
            String jSonString = "";

            List<Albums> obj = aAlbumsBO.Sel_ByIDLang(IDLang);
            /*for (int i = 0; i < NUM_LANG; i++)
            {
                obj[i].Info = HttpUtility.HtmlDecode(obj[i].Info);
                obj[i].Intro = HttpUtility.HtmlDecode(obj[i].Intro);
            }*/
            if (obj != null)
            {
               // _converter.DateTimeFormat = "dd/MM/yyyy";

               // jSonString = JsonConvert.SerializeObject(obj, _converter);
            }
            jSonString = "{\"Albums_Group\":" + jSonString + "}";
            context.Response.Write(jSonString);
        }

        public void Ins(HttpContext context, int NUM_LANG)
        {
            int ret = -1;
            String jSonString = "";
            try
            {
                Albums aAlbums = new Albums();

                aAlbums.Status = !String.IsNullOrEmpty(context.Request.Form["txt_Status"]) ? Convert.ToInt32(context.Request.Form["txt_Status"]) : 1;

                aAlbums.Disable = !String.IsNullOrEmpty(context.Request.Form["txt_Disable"]) ? Convert.ToBoolean(context.Request.Form["txt_Disable"]) : false;

                aAlbums.CreateDate = !String.IsNullOrEmpty(context.Request.Form["txt_CreateDate"]) ? DateTime.ParseExact(context.Request.Form["txt_CreateDate"], "dd/MM/yyyy", culture) : DateTime.Now;

                aAlbums.CreateByIDUser = aCurrentSystemUsers.ID;
                aAlbums.Image = !String.IsNullOrEmpty(context.Request.Form["txt_Image_1"]) ? Convert.ToString(context.Request.Form["txt_Image"]) : "";

                aAlbums.Image1 = !String.IsNullOrEmpty(context.Request.Form["txt_Image_2"]) ? Convert.ToString(context.Request.Form["txt_Image1"]) : "";
                aAlbums.Image2 = !String.IsNullOrEmpty(context.Request.Form["txt_Image_3"]) ? Convert.ToString(context.Request.Form["txt_Image2"]) : "";
                aAlbums.Image3 = !String.IsNullOrEmpty(context.Request.Form["txt_Image_4"]) ? Convert.ToString(context.Request.Form["txt_Image3"]) : "";

                aAlbums.Type = !String.IsNullOrEmpty(context.Request.Form["txt_Type"]) ? Convert.ToInt32(context.Request.Form["txt_Type"]) : 0;

                aAlbums.IDLang = !String.IsNullOrEmpty(context.Request.Form["txt_IDLang"]) ? Convert.ToInt32(context.Request.Form["txt_IDLang"]) : 1;

                aAlbums.ViewCount = !String.IsNullOrEmpty(context.Request.Form["txt_ViewCount"]) ? Convert.ToInt64(context.Request.Form["txt_ViewCount"]) : 0;
                aAlbums.DownloadCount = !String.IsNullOrEmpty(context.Request.Form["txt_DownloadCount"]) ? Convert.ToInt64(context.Request.Form["txt_DownloadCount"]) : 0;


                long a = DateTime.Now.Ticks;
                TimeSpan Codespan = new TimeSpan(a);
                aAlbums.Code = Math.Floor(Codespan.TotalSeconds).ToString();
                AlbumsBO aAlbumsBO = new AlbumsBO();
                for (int i = 1; i <= NUM_LANG; i++)
                {
                    aAlbums.IDLang = !String.IsNullOrEmpty(context.Request.Form["IDLang_" + i]) ? Convert.ToInt32(context.Request.Form["IDLang_" + i]) : 0;

                    aAlbums.Title = !String.IsNullOrEmpty(context.Request.Form["txt_Title_Lang" + i]) ? Convert.ToString(context.Request.Form["txt_Title_Lang" + i]) : "";

                    aAlbums.Info = !String.IsNullOrEmpty(context.Request.Form["txt_Info_Lang" + i]) ? Convert.ToString(HttpUtility.HtmlDecode(context.Request.Form["txt_Info_Lang" + i])) : "";

                    aAlbums.Intro = !String.IsNullOrEmpty(context.Request.Form["txt_Intro_Lang" + i]) ? Convert.ToString(context.Request.Form["txt_Intro_Lang" + i]) : "";

                    ret = aAlbumsBO.Ins(aAlbums);
                    if (ret == 0)
                    {
                        jSonString = "{\"status\":\"error|" + ret.ToString() + "\"}";
                        break;
                    }

                }
                if (ret != 0)
                { jSonString = "{\"status\": \"success\"}"; }
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

        public void Upd_ByCode(HttpContext context, int NUM_LANG)
        {
            int ret = -1;
            String jSonString = "";
            try
            {
                if (NUM_LANG < 1)
                {
                    NUM_LANG = 1;
                }
                AlbumsBO aAlbumsBO = new AlbumsBO();
                List<Albums> aAlbums = new List<Albums>();
                String Code = aAlbumsBO.Sel_ByID(int.Parse(context.Request.QueryString["IDAlbums"])).Code;

                aAlbums = aAlbumsBO.Sel_ByCode(Code);

                int LoopUpdate = 0;

                if (aAlbums.Count <= NUM_LANG)
                {
                    LoopUpdate = aAlbums.Count;
                    for (int i = 0; i < LoopUpdate; i++)
                    {

                        aAlbums[i].ID = aAlbums[i].ID;




                        aAlbums[i].Title = !String.IsNullOrEmpty(context.Request.Form["txt_Name_Lang" + (i + 1)]) ? Convert.ToString(context.Request.Form["txt_Name_Lang" + (i + 1)]) : aAlbums[i].Title;

                        aAlbums[i].Info = !String.IsNullOrEmpty(context.Request.Form["txt_Info_Lang" + (i + 1)]) ? Convert.ToString(HttpUtility.HtmlDecode(context.Request.Form["txt_Info_Lang" + (i + 1)])) : aAlbums[i].Info;

                        aAlbums[i].Intro = !String.IsNullOrEmpty(context.Request.Form["txt_Intro_Lang" + (i + 1)]) ? Convert.ToString(context.Request.Form["txt_Intro_Lang" + (i + 1)]) : aAlbums[i].Intro;

                        aAlbums[i].Status = !String.IsNullOrEmpty(context.Request.Form["txt_Status"]) ? Convert.ToInt32(context.Request.Form["txt_Status"]) : aAlbums[i].Status;

                        aAlbums[i].Disable = !String.IsNullOrEmpty(context.Request.Form["txt_Disable"]) ? Convert.ToBoolean(context.Request.Form["txt_Disable"]) : aAlbums[i].Disable;

                        aAlbums[i].CreateDate = !String.IsNullOrEmpty(context.Request.Form["txt_CreateDate"]) ? DateTime.ParseExact(context.Request.Form["txt_CreateDate"], "dd/MM/yyyy", culture) : aAlbums[i].CreateDate;

                        aAlbums[i].CreateByIDUser = aCurrentSystemUsers.ID;
                        aAlbums[i].Image = !String.IsNullOrEmpty(context.Request.Form["txt_Image_1"]) ? Convert.ToString(context.Request.Form["txt_Image_1"]) : aAlbums[i].Image;

                        aAlbums[i].Image1 = !String.IsNullOrEmpty(context.Request.Form["txt_Image_2"]) ? Convert.ToString(context.Request.Form["txt_Image_2"]) : aAlbums[i].Image1;
                        aAlbums[i].Image2 = !String.IsNullOrEmpty(context.Request.Form["txt_Image_3"]) ? Convert.ToString(context.Request.Form["txt_Image_3"]) : aAlbums[i].Image2;
                        aAlbums[i].Image3 = !String.IsNullOrEmpty(context.Request.Form["txt_Image_4"]) ? Convert.ToString(context.Request.Form["txt_Image_4"]) : aAlbums[i].Image3;

                        aAlbums[i].Type = !String.IsNullOrEmpty(context.Request.Form["txt_Type"]) ? Convert.ToInt32(context.Request.Form["txt_Type"]) : aAlbums[i].Type;

                        aAlbums[i].IDLang = !String.IsNullOrEmpty(context.Request.Form["IDLanguage_Lang" + (i + 1)]) ? Convert.ToInt32(context.Request.Form["IDLanguage_Lang" + (i + 1)]) : aAlbums[i].IDLang;
                        aAlbums[i].ViewCount = !String.IsNullOrEmpty(context.Request.Form["txt_ViewCount"]) ? Convert.ToInt64(context.Request.Form["txt_ViewCount"]) : aAlbums[i].ViewCount;
                        aAlbums[i].DownloadCount = !String.IsNullOrEmpty(context.Request.Form["txt_DownloadCount"]) ? Convert.ToInt64(context.Request.Form["txt_DownloadCount"]) : aAlbums[i].DownloadCount;




                        ret = aAlbumsBO.Upd(aAlbums[i]);
                        if (ret == 0)
                        {
                            jSonString = "{\"status\":\"error|" + ret.ToString() + "\"}";
                            break;
                        }

                    }
                }
                if (ret != 0)
                { jSonString = "{\"status\": \"success\"}"; }
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

        public void Upd_Disable(HttpContext context)
        {
            int ret = -1;
            String jSonString = "";
            try
            {
                AlbumsBO aAlbumsBO = new AlbumsBO();
                Albums aAlbums = new Albums();
                int IDAlbums = Convert.ToInt32(context.Request.QueryString["IDAlbums"]);
                aAlbums = aAlbumsBO.Sel_ByID(IDAlbums);

                aAlbums.Disable = true;

                ret = aAlbumsBO.Upd(aAlbums);
                if (ret != 0)
                {
                    jSonString = "{\"status\":\"error|" + ret.ToString() + "\"}";

                }

                if (ret == 0)
                { jSonString = "{\"status\": \"success\"}"; }
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
        ////=================================================================================================

        public void Sel_ByCode_ByIDLang(HttpContext context)
        {
            AlbumsBO aAlbumsBO = new AlbumsBO();
            String jSonString = "";
            string Code = context.Request.QueryString["Code"];
            int IDLang = int.Parse(context.Request.QueryString["IDLang"]);

            Albums obj = aAlbumsBO.Sel_ByCode_ByIDLang(Code, IDLang);
            //obj.Info = HttpUtility.HtmlDecode(obj.Info);
            //obj.Intro = HttpUtility.HtmlDecode(obj.Intro);

            if (obj != null)
            {
                _converter.DateTimeFormat = "dd/MM/yyyy";

                jSonString = JsonConvert.SerializeObject(obj, _converter);
            }
            jSonString = "{\"Albums\":" + jSonString + "}";
            context.Response.Write(jSonString);
        }

        public void Sel(HttpContext context)
        {

            String jSonString = "";
            int IDAlbums = Convert.ToInt32(context.Request.QueryString["IDAlbums"]);

            AlbumsBO aAlbumsBO = new AlbumsBO();
            Albums obj = aAlbumsBO.Sel_ByID(IDAlbums);
            //obj.Info = HttpUtility.HtmlDecode(obj.Info);
            //obj.Intro = HttpUtility.HtmlDecode(obj.Intro);

            if (obj != null)
            {
                _converter.DateTimeFormat = "dd/MM/yyyy";

                jSonString = JsonConvert.SerializeObject(obj, _converter);
            }
            jSonString = "{\"Albums\":" + jSonString + "}";
            context.Response.Write(jSonString);
        }

        public void Del(HttpContext context)
        {

            String jSonString = "";
            int IDAlbums = Convert.ToInt32(context.Request.QueryString["IDAlbums"]);

            AlbumsBO aAlbumsBO = new AlbumsBO();
            int ret = aAlbumsBO.Del_ByID(IDAlbums);


            if (ret != 0)
            { jSonString = "{\"status\": \"success\"}"; }

            if (ret == 0)
            { jSonString = "{\"status\":\"error|" + ret.ToString() + "\"}"; }


            context.Response.Write(jSonString);
        }

        public void Del_ByCode(HttpContext context)
        {
            AlbumsBO aAlbumsBO = new AlbumsBO();
            String jSonString = "";
            string Code = aAlbumsBO.Sel_ByID(int.Parse(context.Request.QueryString["IDAlbums"])).Code;


            int ret = aAlbumsBO.Del_ByCode(Code);


            if (ret != 0)
            { jSonString = "{\"status\": \"success\"}"; }

            if (ret == 0)
            { jSonString = "{\"status\":\"error|" + ret.ToString() + "\"}"; }


            context.Response.Write(jSonString);
        }
    }
}
