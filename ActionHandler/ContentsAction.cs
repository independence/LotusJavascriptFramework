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
using Bussiness;

namespace ActionHandler
{
    public class ContentsAction : IAction
    {
        public SystemUsers aCurrentSystemUsers = new SystemUsers();
        public void Do(HttpContext context)
        {
            string action = context.Request["action"].ToString();
            if (!String.IsNullOrEmpty(action))
            {
                this.aCurrentSystemUsers = (SystemUsers)context.Session["LoginAccount"];

                switch (action)
                {
                    case "Sel_ByIDLang":
                        this.Sel_ByIDLang(context);
                        break;
                    case "Upd_ByCode":
                        this.Upd_ByCode(context, CORE_Language.sys_NUM_LANG);
                        break;
                    case "Ins":
                        this.Ins(context, CORE_Language.sys_NUM_LANG);
                        break;
                    case "Del_ByCode":
                        this.Del_ByCode(context);
                        break;
                    case "Sel_ByCode":
                        this.Sel_ByCode(context);
                        break;
                    case "Sel_ByID":
                        this.Sel_ByID(context);
                        break;
                    case "Sel_ByCode_ByIDLang":
                        this.Sel_ByCode_ByIDLang(context);
                        break;
                    case "Sel_Ext_ByCodeCategoryLevel1":
                        this.Sel_Ext_ByCodeCategoryLevel1(context);
                        break;
                    case "Sel_Ext_ByCodeCategoryLevel1_ByIDLang":
                        this.Sel_Ext_ByCodeCategoryLevel1_ByIDLang(context);
                        break;
                    /*####################################*/
                    case "Sel_Ext_ByCode":
                        this.Sel_Ext_ByCode(context);
                        break;
                    case "Sel_Ext_ByKeyCodeContent_ByIDLang":
                        this.Sel_Ext_ByKeyCodeContent_ByIDLang(context);
                        break;
                    case "Sel_Ext_ByKeyCodeCategoryLevel1_ByIDLang":
                        this.Sel_Ext_ByKeyCodeCategoryLevel1_ByIDLang(context);
                        break;
                    //-----------------------------------------------------------------------
                    default:
                        context.Response.Write("Can't find action");
                        break;
                }
            }
        }


        private IsoDateTimeConverter _converter = new IsoDateTimeConverter();
        private IFormatProvider culture = new CultureInfo("es-ES", true);

        public void Sel_ByIDLang(HttpContext context)
        {

            String jSonString = "";
            ContentsBO aContentsBO = new ContentsBO();
            int IDLang = string.IsNullOrEmpty(context.Request.QueryString["IDLang"]) ? CORE_Language.sys_CUR_LANG : int.Parse(context.Request.QueryString["IDLang"]);


            List<vw_ContentViewAll> obj = new List<vw_ContentViewAll>();
            if (string.IsNullOrEmpty(context.Request.QueryString["Disable"]))
            {
                 obj = aContentsBO.Sel_Ext_ByIDLang(IDLang);
            }
            else
            {
                obj = aContentsBO.Sel_Ext_ByIDLang(IDLang, bool.Parse(context.Request.QueryString["Disable"]) );
            }
            
           
            int count = obj.Count;

            for (int i = 0; i < obj.Count; i++)
            {
                obj[i].Contents_Info = HttpUtility.HtmlDecode(obj[i].Contents_Info);
                // obj[i].Contents_Intro = HttpUtility.HtmlDecode(obj[i].Intro);
            }
            if (obj != null)
            {
                _converter.DateTimeFormat = "dd/MM/yyyy";
                jSonString = JsonConvert.SerializeObject(obj, _converter);
            }

            jSonString = "{\"data\":" + jSonString + "}";
            context.Response.Write(jSonString);
        }

        public void Ins(HttpContext context, int NUM_LANG)
        {
            ConfigsBO aConfigsBO = new ConfigsBO();

            //CodeCategoryLevel1 = Convert.ToString(context.Request.Form["txtCodeCategoryLevel1"]);

            
            String jSonString = "";
            try
            {
                List<Contents> aListContents = new List<Contents>();

                ContentsBO aContentsBO = new ContentsBO();
                Contents aContents = new Contents();
                TimeSpan Codespan = new TimeSpan(DateTime.Now.Ticks);
                string Code = Math.Floor(Codespan.TotalSeconds).ToString();

                for (int i = 1; i <= NUM_LANG; i++)
                {
                    aContents = new Contents();
                    aContents.Code = Code;
                    aContents.Data = null;

                    aContents.Type = !String.IsNullOrEmpty(context.Request.Form["cbbType"]) ? Convert.ToInt32(context.Request.Form["cbbType"]) : 0;
                    aContents.Status = !String.IsNullOrEmpty(context.Request.Form["cbbStatus"]) ? Convert.ToInt32(context.Request.Form["cbbStatus"]) : 0;
                    aContents.CreatedBy = aCurrentSystemUsers.Username;

                    aContents.Disable = !String.IsNullOrEmpty(context.Request.Form["cbbDisable"]) ? Convert.ToBoolean(context.Request.Form["cbbDisable"]) : false;
                    aContents.Tag = !String.IsNullOrEmpty(context.Request.Form["txtTag"]) ? Convert.ToString(context.Request.Form["txtTag"]) : "";
                    aContents.DateCreated = !String.IsNullOrEmpty(context.Request.Form["txtDateCreated"]) ? DateTime.ParseExact(context.Request.Form["txtDateCreated"], "dd/MM/yyyy", culture) : DateTime.Now;

                    aContents.DateEdited = !String.IsNullOrEmpty(context.Request.Form["txtDateEdited"]) ? DateTime.ParseExact(context.Request.Form["txtDateEdited"], "dd/MM/yyyy", culture) : DateTime.Now;
                    aContents.UpdateBy = !String.IsNullOrEmpty(context.Request.Form["txtUpdateBy"]) ? Convert.ToString(context.Request.Form["txtUpdateBy"]) : "";
                    aContents.PublishDate = !String.IsNullOrEmpty(context.Request.Form["txtPublishDate"]) ? DateTime.ParseExact(context.Request.Form["txtPublishDate"], "dd/MM/yyyy", culture) : DateTime.Now;

                    aContents.ExpireDate = !String.IsNullOrEmpty(context.Request.Form["txtExpireDate"]) ? DateTime.ParseExact(context.Request.Form["txtExpireDate"], "dd/MM/yyyy", culture) : DateTime.Now;
                    aContents.IDAlbum = !String.IsNullOrEmpty(context.Request.Form["txtIDAlbum"]) ? Convert.ToInt32(context.Request.Form["txtIDAlbum"]) : 0;
                    aContents.ViewCount = !String.IsNullOrEmpty(context.Request.Form["txtViewCount"]) ? Convert.ToInt64(context.Request.Form["txtViewCount"]) : 0;

                    aContents.Image1 = !String.IsNullOrEmpty(context.Request.Form["txtImage_2"]) ? Convert.ToString(context.Request.Form["txtImage_2"]) : "";
                    aContents.Image2 = !String.IsNullOrEmpty(context.Request.Form["txtImage_3"]) ? Convert.ToString(context.Request.Form["txtImage_3"]) : "";
                    aContents.Image3 = !String.IsNullOrEmpty(context.Request.Form["txtImage_4"]) ? Convert.ToString(context.Request.Form["txtImage_4"]) : "";

                    aContents.Title = !String.IsNullOrEmpty(context.Request.Form["txtTitle_Lang" + i]) ? Convert.ToString(context.Request.Form["txtTitle_Lang" + i]) : "";
                    aContents.Intro = !String.IsNullOrEmpty(context.Request.Form["txtIntro_Lang" + i]) ? Convert.ToString(HttpUtility.HtmlDecode(context.Request.Form["txtIntro_Lang" + i])) : "";
                    aContents.Info = !String.IsNullOrEmpty(context.Request.Form["txtInfo_Lang" + i]) ? Convert.ToString(HttpUtility.HtmlDecode(context.Request.Form["txtInfo_Lang" + i])) : "";

                    aContents.ExtendProperties1 = !String.IsNullOrEmpty(context.Request.Form["txtExtendProperties1_Lang" + i]) ? Convert.ToString(context.Request.Form["txtExtendProperties1_Lang" + i]) : "";
                    aContents.ExtendProperties2 = !String.IsNullOrEmpty(context.Request.Form["txtExtendProperties2_Lang" + i]) ? Convert.ToString(context.Request.Form["txtExtendProperties2_Lang" + i]) : "";
                    aContents.ExtendProperties3 = !String.IsNullOrEmpty(context.Request.Form["txtExtendProperties3_Lang" + i]) ? Convert.ToString(context.Request.Form["txtExtendProperties3_Lang" + i]) : "";

                    aContents.Image = !String.IsNullOrEmpty(context.Request.Form["txtImage_1"]) ? Convert.ToString(context.Request.Form["txtImage_1"]) : "";
                    aContents.IDLang = !String.IsNullOrEmpty(context.Request.Form["IDLang_" + i]) ? Convert.ToInt32(context.Request.Form["IDLang_" + i]) : 0;

                    aListContents.Add(aContents);
                }

                int Ret1 = -1;
                Ret1 = aContentsBO.Ins(ref aListContents);
                if (Ret1 < aListContents.Count)
                {
                    jSonString = "{\"status\":\"error\" ,\"message\":\"" + Ret1.ToString() + "\"}";
                    aContentsBO.Del(aListContents);
                    return;
                }
                else
                {
                    string ListTempt = !String.IsNullOrEmpty(context.Request.Form["ckbCodeCategoryLevel1[]"]) ? Convert.ToString(context.Request.Form["ckbCodeCategoryLevel1[]"]) : "";
                    if (string.IsNullOrEmpty(ListTempt) == true)
                    {
                        CategoryLevel1BO aCategoryLevel1BO = new CategoryLevel1BO();
                        List<CategoryLevel1> aListItem = aCategoryLevel1BO.Sel_ByCode("000");
                        if (aListItem.Count > 0)
                        {
                            ListTempt = aListItem[0].Code;
                        }
                        else
                        {
                            this.CreateCategoryLevel1Default(context, "[Default]", NUM_LANG);
                            ListTempt = "000";
                        }
                    }

                    //else if (string.IsNullOrEmpty(ListTempt) == false)
                    //{
                        List<string> ListCodeCategoryLevel1 = ListTempt.Split(',').ToList();
                        List<Contents_CategoryLevel1> aListContents_CategoryLevel1 = new List<Contents_CategoryLevel1>();
                        Contents_CategoryLevel1 aContents_CategoryLevel1 = new Contents_CategoryLevel1();


                        for (int ii = 0; ii < aListContents.Count; ii++)
                        {
                            for (int iii = 0; iii < ListCodeCategoryLevel1.Count; iii++)
                            {
                                aContents_CategoryLevel1 = new Contents_CategoryLevel1();

                                aContents_CategoryLevel1.CodeCategoryLevel1 = ListCodeCategoryLevel1[iii].ToString();
                                aContents_CategoryLevel1.CodeContents = aListContents[ii].Code.ToString();
                                aContents_CategoryLevel1.Disable = aListContents[ii].Disable;
                                aContents_CategoryLevel1.IDLang = aListContents[ii].IDLang;
                                aContents_CategoryLevel1.Status = aListContents[ii].Status;
                                aContents_CategoryLevel1.Type = aListContents[ii].Type;

                                aListContents_CategoryLevel1.Add(aContents_CategoryLevel1);
                            }
                        }
                        Contents_CategoryLevel1BO aContents_CategoryLevel1BO = new Contents_CategoryLevel1BO();
                        int Ret2 = -1;
                        Ret2 = aContents_CategoryLevel1BO.Ins(ref aListContents_CategoryLevel1);
                        if (Ret2 < aListContents_CategoryLevel1.Count)
                        {
                            aContents_CategoryLevel1BO.Del(aListContents_CategoryLevel1);
                            aContentsBO.Del(aListContents);
                            jSonString = "{\"status\":\"error\" ,\"message\":\"" + Ret2.ToString() + "\"}";
                            return;
                        }
                    //}
                }

                jSonString = "{\"status\": \"success\"}";
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

        public void Upd_ViewCount(HttpContext context, int NUM_LANG)
        {
            int ret = -1;
            String jSonString = "";
            String Code = context.Request.QueryString["CodeContents"];

            //if ( context.Request.Cookies["ViewCount"] == null)
            if (context.Session[Code] == null) 
            {
                try
                {
                    if (NUM_LANG < 1)
                    {
                        NUM_LANG = 1;
                    }
                    List<Contents> aListContents = new List<Contents>();
                    ContentsBO aContentsBO = new ContentsBO();
                    

                    //aListContents = aContentsBO.Sel_all_ByCode(Code);

                    int LoopUpdate = 0;

                    if (aListContents.Count <= NUM_LANG)
                    {
                        LoopUpdate = aListContents.Count;
                        for (int i = 0; i < LoopUpdate; i++)
                        {

                            aListContents[i].ViewCount = !String.IsNullOrEmpty(aListContents[i].ViewCount.ToString()) ? Convert.ToInt64(aListContents[i].ViewCount + 1) : 1;


                            ret = aContentsBO.Upd(aListContents[i]);
                            if (ret == 0)
                            {
                                jSonString = "{\"status\":\"error|" + ret.ToString() + "\"}";
                                break;
                            }

                        }
                    }
                    if (ret != 0)
                    { jSonString = "{\"status\": \"success\"}"; }
                    //HttpCookie aHttpCookie = new HttpCookie("ViewCount");
                    //aHttpCookie.Expires = DateTime.Now.AddDays(10);
                    //context.Request.Cookies.Add(aHttpCookie);
                    context.Session[Code] = 1;

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

        public void Upd_ByCode(HttpContext context, int NUM_LANG)
        {


            try
            {
                if (NUM_LANG < 1)
                {
                    NUM_LANG = 1;
                }
                List<Contents> aListContents = new List<Contents>();
                ContentsBO aContentsBO = new ContentsBO();
                String Code = context.Request.Form["txtCode"];

                aListContents = aContentsBO.Sel_ByCode(Code);

                if (aListContents.Count <= NUM_LANG)
                {
                    for (int i = 0; i < aListContents.Count; i++)
                    {
                        aListContents[i].UpdateBy = aCurrentSystemUsers.Username;

                        aListContents[i].Type = !String.IsNullOrEmpty(context.Request.Form["txtType"]) ? Convert.ToInt32(context.Request.Form["txtType"]) : aListContents[i].Type;

                        aListContents[i].Title = !String.IsNullOrEmpty(context.Request.Form["txtTitle_Lang" + (i + 1)]) ? Convert.ToString(context.Request.Form["txtTitle_Lang" + (i + 1)]) : aListContents[i].Title;

                        aListContents[i].Info = !String.IsNullOrEmpty(context.Request.Form["txtInfo_Lang" + (i + 1)]) ? Convert.ToString(HttpUtility.HtmlDecode(context.Request.Form["txtInfo_Lang" + (i + 1)])) : aListContents[i].Info;

                        aListContents[i].Intro = !String.IsNullOrEmpty(context.Request.Form["txtIntro_Lang" + (i + 1)]) ? Convert.ToString(HttpUtility.HtmlDecode(context.Request.Form["txtIntro_Lang" + (i + 1)])) : aListContents[i].Intro;

                        aListContents[i].Status = !String.IsNullOrEmpty(context.Request.Form["ddlStatus"]) ? Convert.ToInt32(context.Request.Form["ddlStatus"]) : aListContents[i].Status;

                        aListContents[i].CreatedBy = !String.IsNullOrEmpty(context.Request.Form["txtCreatedBy"]) ? Convert.ToString(context.Request.Form["txtCreatedBy"]) : aListContents[i].CreatedBy;

                        aListContents[i].Disable = !String.IsNullOrEmpty(context.Request.Form["cbbDisable"]) ? Convert.ToBoolean(context.Request.Form["cbbDisable"]) : aListContents[i].Disable;

                        aListContents[i].Tag = !String.IsNullOrEmpty(context.Request.Form["txtTag"]) ? Convert.ToString(context.Request.Form["txtTag"]) : aListContents[i].Tag;

                        aListContents[i].DateCreated = !String.IsNullOrEmpty(context.Request.Form["dtpDateCreated"]) ? DateTime.ParseExact(context.Request.Form["dtpDateCreated"], "dd/MM/yyyy", culture) : aListContents[i].DateCreated;

                        aListContents[i].DateEdited = !String.IsNullOrEmpty(context.Request.Form["dtpDateEdited"]) ? DateTime.ParseExact(context.Request.Form["dtpDateEdited"], "dd/MM/yyyy", culture) : aListContents[i].DateEdited;

                        aListContents[i].PublishDate = !String.IsNullOrEmpty(context.Request.Form["dtpPublishDate"]) ? DateTime.ParseExact(context.Request.Form["dtpPublishDate"], "dd/MM/yyyy", culture) : aListContents[i].PublishDate;

                        aListContents[i].ExpireDate = !String.IsNullOrEmpty(context.Request.Form["dtpExpireDate"]) ? DateTime.ParseExact(context.Request.Form["dtpExpireDate"], "dd/MM/yyyy", culture) : aListContents[i].ExpireDate;

                        aListContents[i].Image = !String.IsNullOrEmpty(context.Request.Form["txtImage_1"]) ? Convert.ToString(context.Request.Form["txtImage_1"]) : "";
                        aListContents[i].Image1 = !String.IsNullOrEmpty(context.Request.Form["txtImage_2"]) ? Convert.ToString(context.Request.Form["txtImage_2"]) : "";
                        aListContents[i].Image2 = !String.IsNullOrEmpty(context.Request.Form["txtImage_3"]) ? Convert.ToString(context.Request.Form["txtImage_3"]) : "";
                        aListContents[i].Image3 = !String.IsNullOrEmpty(context.Request.Form["txtImage_4"]) ? Convert.ToString(context.Request.Form["txtImage_4"]) : "";

                        aListContents[i].IDAlbum = !String.IsNullOrEmpty(context.Request.Form["txtIDAlbum"]) ? Convert.ToInt32(context.Request.Form["txtIDAlbum"]) : aListContents[i].IDAlbum;

                        aListContents[i].IDLang = !String.IsNullOrEmpty(context.Request.Form["IDLanguage_Lang" + (i + 1)]) ? Convert.ToInt32(context.Request.Form["IDLanguage_Lang" + (i + 1)]) : aListContents[i].IDLang;

                        aListContents[i].Code = !String.IsNullOrEmpty(context.Request.Form["txtCode"]) ? Convert.ToString(context.Request.Form["txtCode"]) : aListContents[i].Code;

                        aListContents[i].ExtendProperties1 = !String.IsNullOrEmpty(context.Request.Form["txtExtendProperties1_Lang" + (i + 1)]) ? Convert.ToString(context.Request.Form["txtExtendProperties1_Lang" + (i + 1)]) : aListContents[i].ExtendProperties1;

                        aListContents[i].ExtendProperties2 = !String.IsNullOrEmpty(context.Request.Form["txtExtendProperties2_Lang" + (i + 1)]) ? Convert.ToString(context.Request.Form["txtExtendProperties2_Lang" + (i + 1)]) : aListContents[i].ExtendProperties2;

                        aListContents[i].ExtendProperties3 = !String.IsNullOrEmpty(context.Request.Form["txtExtendProperties3_Lang" + (i + 1)]) ? Convert.ToString(context.Request.Form["txtExtendProperties3_Lang" + (i + 1)]) : aListContents[i].ExtendProperties3;

                        aListContents[i].ViewCount = !String.IsNullOrEmpty(context.Request.Form["txtViewCount"]) ? Convert.ToInt64(context.Request.Form["txtViewCount"]) : 0;
                    }

                    int Ret1 = -1;
                    Ret1 = aContentsBO.Upd(aListContents);
                    String jSonString = "";

                    

                        string ListTempt = !String.IsNullOrEmpty(context.Request.Form["ckbCodeCategoryLevel1[]"]) ? Convert.ToString(context.Request.Form["ckbCodeCategoryLevel1[]"]) : "";

                        if (string.IsNullOrEmpty(ListTempt) == false)
                        {
                            List<string> ListCodeCategoryLevel1 = ListTempt.Split(',').ToList();
                            List<Contents_CategoryLevel1> aListContents_CategoryLevel1 = new List<Contents_CategoryLevel1>();
                            List<Contents_CategoryLevel1> aListTempt = new List<Contents_CategoryLevel1>();

                            Contents_CategoryLevel1 aContents_CategoryLevel1 = new Contents_CategoryLevel1();
                            Contents_CategoryLevel1BO aContents_CategoryLevel1BO = new Contents_CategoryLevel1BO();
                            for (int ii = 0; ii < aListContents.Count; ii++)
                            {
                                for (int iii = 0; iii < ListCodeCategoryLevel1.Count; iii++)
                                {
                                    aListTempt = aContents_CategoryLevel1BO.Sel_ByCodeContents_ByIDLang(aListContents[ii].Code, aListContents[ii].IDLang.GetValueOrDefault(0)).Where(p => p.CodeCategoryLevel1 == ListCodeCategoryLevel1[iii]).ToList();
                                    if (aListTempt.Count > 0)
                                    {
                                        aListTempt[0].Disable = aListContents[ii].Disable;
                                        aListTempt[0].Status = aListContents[ii].Status;
                                        aListTempt[0].Type = aListContents[ii].Type;

                                        aListContents_CategoryLevel1.Add(aListTempt[0]);
                                        
                                    }
                                    else
                                    {
                                        aContents_CategoryLevel1 = new Contents_CategoryLevel1();

                                        aContents_CategoryLevel1.Disable = aListContents[ii].Disable;
                                        aContents_CategoryLevel1.Status = aListContents[ii].Status;
                                        aContents_CategoryLevel1.Type = aListContents[ii].Type;
                                        
                                        aContents_CategoryLevel1.CodeContents = aListContents[ii].Code;
                                        aContents_CategoryLevel1.CodeCategoryLevel1 = ListCodeCategoryLevel1[iii];
                                        aContents_CategoryLevel1.IDLang = aListContents[ii].IDLang;

                                        aListContents_CategoryLevel1.Add(aContents_CategoryLevel1);
                                        
                                    }

                                }
                            }

                            int Ret2 = -1;
                            Ret2 = aContents_CategoryLevel1BO.Upd(aListContents_CategoryLevel1);
                            jSonString = "";

                            if (Ret2 < aListContents.Count)
                            {
                                jSonString = "{\"status\":\"error\" ,\"message\":\"" + Ret2.ToString() + "\"}";

                                return;
                            }
                        }
                   
                }
            }
            catch (Exception e1)
            { 
            }     
        }

        public void Upd_Disable(HttpContext context)
        {
            int ret = -1;
            String jSonString = "";
            try
            {
                ContentsBO aContentsBO = new ContentsBO();
                List<Contents> listContents = new List<Contents>();
                string Code = aContentsBO.Sel_ByID(int.Parse(context.Request.QueryString["IDContents"])).Code;
                //listContents = aContentsBO.Sel_all_ByCode(Code);
                for (int i = 0; i < listContents.Count; i++)
                {
                    listContents[i].Disable = true;
                    ret = aContentsBO.Upd(listContents[i]);
                }

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
        //=================================================================================================

        public void Sel_ByCode_ByIDLang(HttpContext context)
        {

            String jSonString = "";
            string Code = context.Request.QueryString["Code"];
          int IDLang=  int.Parse(context.Request.QueryString["IDLang"]);

            ContentsBO aContentsBO = new ContentsBO();
            Contents obj = aContentsBO.Sel_ByCode_ByIDLang(Code, IDLang);


            //obj.Info = HttpUtility.HtmlDecode(obj.Info);
            //obj.Intro = HttpUtility.HtmlDecode(obj.Intro);

            if (obj != null)
            {
                _converter.DateTimeFormat = "dd/MM/yyyy";

                jSonString = JsonConvert.SerializeObject(obj, _converter);
            }
            jSonString = "{\"data\":" + jSonString + "}";
            context.Response.Write(jSonString);
        }
        public void Sel_ByCode(HttpContext context)
        {

            String jSonString = "";
            string Code = context.Request.QueryString["Code"];

            int Limit = context.Request.QueryString["Limit"] != null && context.Request.QueryString["Limit"] != "undefined" ? int.Parse(context.Request.QueryString["Limit"]) : 50;
            int IntroLenght = context.Request.QueryString["IntroLenght"] != null && context.Request.QueryString["IntroLenght"] != "undefined" ? int.Parse(context.Request.QueryString["IntroLenght"]) : 100;
            int TitleLenght = context.Request.QueryString["TitleLenght"] != null && context.Request.QueryString["TitleLenght"] != "undefined" ? int.Parse(context.Request.QueryString["TitleLenght"]) : 100;
            string Order = string.IsNullOrEmpty(context.Request.QueryString["Order"]) == false ? context.Request.QueryString["Order"] : "Contents_ID";
            bool IsDesc = context.Request.QueryString["IsDesc"] != null && context.Request.QueryString["IsDesc"] != "undefined" ? bool.Parse(context.Request.QueryString["IsDesc"]) : true;

            ContentsBO aContentsBO = new ContentsBO();
            List<Contents> obj = aContentsBO.Sel_ByCode(Code);
            obj = this.ConvertList(obj, TitleLenght, IntroLenght, Limit, Order, IsDesc);


            //obj.Info = HttpUtility.HtmlDecode(obj.Info);
            //obj.Intro = HttpUtility.HtmlDecode(obj.Intro);

            if (obj != null)
            {
                _converter.DateTimeFormat = "dd/MM/yyyy";

                jSonString = JsonConvert.SerializeObject(obj, _converter);
            }
            jSonString = "{\"data\":" + jSonString + "}";
            context.Response.Write(jSonString);
        }
        public void Sel_ByID(HttpContext context)
        {

            String jSonString = "";
            int IDContents = int.Parse(context.Request.QueryString["IDContents"]);

            ContentsBO aContentsBO = new ContentsBO();
            Contents obj = aContentsBO.Sel_ByID(IDContents);
            //obj.Info = HttpUtility.HtmlDecode(obj.Info);
            //obj.Intro = HttpUtility.HtmlDecode(obj.Intro);

            if (obj != null)
            {
                _converter.DateTimeFormat = "dd/MM/yyyy";

                jSonString = JsonConvert.SerializeObject(obj, _converter);
            }
            jSonString = "{\"data\":" + jSonString + "}";
            context.Response.Write(jSonString);
        }

        public void Sel_Ext_ByCodeCategoryLevel1(HttpContext context)
        {

            String jSonString = "";
            string CodeCategory1 = context.Request.QueryString["CodeCategoryLevel1"];
            

            //obj.Info = HttpUtility.HtmlDecode(obj.Info);
            //obj.Intro = HttpUtility.HtmlDecode(obj.Intro);

            int Limit = context.Request.QueryString["Limit"] != null && context.Request.QueryString["Limit"] != "undefined" ? int.Parse(context.Request.QueryString["Limit"]) : 50;
            int IntroLenght = context.Request.QueryString["IntroLenght"] != null && context.Request.QueryString["IntroLenght"] != "undefined" ? int.Parse(context.Request.QueryString["IntroLenght"]) : 100;
            int TitleLenght = context.Request.QueryString["TitleLenght"] != null && context.Request.QueryString["TitleLenght"] != "undefined" ? int.Parse(context.Request.QueryString["TitleLenght"]) : 100;
            string Order = string.IsNullOrEmpty(context.Request.QueryString["Order"]) == false ? context.Request.QueryString["Order"] : "Contents_ID";
            bool IsDesc = context.Request.QueryString["IsDesc"] != null && context.Request.QueryString["IsDesc"] != "undefined" ? bool.Parse(context.Request.QueryString["IsDesc"]) : true;

            int IDLang = !string.IsNullOrEmpty(context.Request.QueryString["IDLang"].ToString()) ? int.Parse(context.Request.QueryString["IDLang"]) : 1;

            ContentsBO aContentsBO = new ContentsBO();
            List<vw_ContentViewAll> obj = aContentsBO.Sel_Ext_ByCodeCategoryLevel1(CodeCategory1);
            obj = this.ConvertList(obj, TitleLenght, IntroLenght, Limit, Order, IsDesc);


            for (int i = 0; i < obj.Count; i++)
            {
                if ((obj[i].Contents_Intro.Length > Limit) & (Limit >= 0))
                {
                    obj[i].Contents_Intro = obj[i].Contents_Intro.Substring(0, Limit);
                }
                else
                {
                    obj[i].Contents_Intro = obj[i].Contents_Intro;
                }
            }
            List<vw_ContentViewAll> ObjOrderLimit = new List<vw_ContentViewAll>();
            if ((Limit > -1) & (obj.Count > Limit))
            {
                ObjOrderLimit = obj.GetRange(0, Limit).ToList();

                _converter.DateTimeFormat = "dd/MM/yyyy";
                jSonString = JsonConvert.SerializeObject(ObjOrderLimit, _converter);
            }
            else
            {
                if (obj != null)
                {
                    _converter.DateTimeFormat = "dd/MM/yyyy";

                    jSonString = JsonConvert.SerializeObject(obj, _converter);
                }
            }
            jSonString = "{\"data\":" + jSonString + "}";
            context.Response.Write(jSonString);
        }
        public void Sel_Ext_ByCodeCategoryLevel1_ByIDLang(HttpContext context)
        {

            String jSonString = "";
            string CodeCategory1 = context.Request.QueryString["CodeCategoryLevel1"];
            
            int Limit = context.Request.QueryString["Limit"] != null && context.Request.QueryString["Limit"] != "undefined" ? int.Parse(context.Request.QueryString["Limit"]) : 50;
            int IntroLenght = context.Request.QueryString["IntroLenght"] != null && context.Request.QueryString["IntroLenght"] != "undefined" ? int.Parse(context.Request.QueryString["IntroLenght"]) : 100;
            int TitleLenght = context.Request.QueryString["TitleLenght"] != null && context.Request.QueryString["TitleLenght"] != "undefined" ? int.Parse(context.Request.QueryString["TitleLenght"]) : 100;
            string Order = string.IsNullOrEmpty(context.Request.QueryString["Order"]) == false ? context.Request.QueryString["Order"] : "Contents_ID";
            bool IsDesc = context.Request.QueryString["IsDesc"] != null && context.Request.QueryString["IsDesc"] != "undefined" ? bool.Parse(context.Request.QueryString["IsDesc"]) : true;
            
            int IDLang = !string.IsNullOrEmpty( context.Request.QueryString["IDLang"].ToString()) ? int.Parse(context.Request.QueryString["IDLang"]) : 1;

            ContentsBO aContentsBO = new ContentsBO();
            List<vw_ContentViewAll> obj = aContentsBO.Sel_Ext_ByCodeCategoryLevel1_ByIDLang(CodeCategory1, false, IDLang);
            obj = this.ConvertList(obj, TitleLenght, IntroLenght, Limit, Order, IsDesc);
            //obj.Info = HttpUtility.HtmlDecode(obj.Info);
            //obj.Intro = HttpUtility.HtmlDecode(obj.Intro);

            for (int i = 0; i < obj.Count; i++)
            {
                if ((obj[i].Contents_Intro.Length > IntroLenght) & (IntroLenght >= 0))
                {
                    obj[i].Contents_Intro = obj[i].Contents_Intro.Substring(0, IntroLenght);
                }
                else
                {
                    obj[i].Contents_Intro = obj[i].Contents_Intro;
                }
                //--------------------------
                if ((obj[i].Contents_Title.Length > TitleLenght) & (TitleLenght >= 0))
                {
                    obj[i].Contents_Title = obj[i].Contents_Title.Substring(0, TitleLenght);
                }
                else
                {
                    obj[i].Contents_Title = obj[i].Contents_Title;
                }
                //--------------------------
            }

            List<vw_ContentViewAll> ObjOrderLimit = new List<vw_ContentViewAll>();
            if ((Limit > -1) & (obj.Count > Limit))
            {
                ObjOrderLimit = obj.GetRange(0, Limit).ToList();

                _converter.DateTimeFormat = "dd/MM/yyyy";
                jSonString = JsonConvert.SerializeObject(ObjOrderLimit, _converter);
            }
            else
            {
                if (obj != null)
                {
                    _converter.DateTimeFormat = "dd/MM/yyyy";

                    jSonString = JsonConvert.SerializeObject(obj, _converter);
                }
            }
            jSonString = "{\"data\":" + jSonString + "}";
            context.Response.Write(jSonString);
        }
        public void Sel_Ext_ByKeyCodeContent_ByIDLang(HttpContext context)   // Load ra danh sách các contact bằng IDLang
        {

            String jSonString = "";

            string KeyCodeContent = context.Request.QueryString["KeyCodeContent"] != null && context.Request.QueryString["KeyCodeContent"] != "undefined" ? context.Request.QueryString["KeyCodeContent"] : "";

            int Limit = context.Request.QueryString["Limit"] != null && context.Request.QueryString["Limit"] != "undefined" ? int.Parse(context.Request.QueryString["Limit"]) : 50;
            int IntroLenght = context.Request.QueryString["IntroLenght"] != null && context.Request.QueryString["IntroLenght"] != "undefined" ? int.Parse(context.Request.QueryString["IntroLenght"]) : 100;
            int TitleLenght = context.Request.QueryString["TitleLenght"] != null && context.Request.QueryString["TitleLenght"] != "undefined" ? int.Parse(context.Request.QueryString["TitleLenght"]) : 100;
            string Order = string.IsNullOrEmpty(context.Request.QueryString["Order"]) == false ? context.Request.QueryString["Order"] : "Contents_ID";
            bool IsDesc = context.Request.QueryString["IsDesc"] != null && context.Request.QueryString["IsDesc"] != "undefined" ? bool.Parse(context.Request.QueryString["IsDesc"]) : true;
            int IDLang = !string.IsNullOrEmpty(context.Request.QueryString["IDLang"].ToString()) ? int.Parse(context.Request.QueryString["IDLang"]) : 1;

            ContentsBO aContentsBO = new ContentsBO();
            List<vw_ContentViewAll> obj = aContentsBO.Sel_Ext_ByKeyCodeContent_ByIDLang(KeyCodeContent, IDLang);
            obj = this.ConvertList(obj, TitleLenght, IntroLenght, Limit, Order, IsDesc);

            if (obj != null)
            {
                _converter.DateTimeFormat = "dd/MM/yyyy";
                jSonString = JsonConvert.SerializeObject(obj, _converter);
            }
            jSonString = "{\"data\":" + jSonString + "}";
            context.Response.Write(jSonString);
        }
        public void Sel_Ext_ByKeyCodeCategoryLevel1_ByIDLang(HttpContext context)   // Load ra danh sách các contact bằng IDLang
        {
            String jSonString = "";

            string KeyCodeCategoryLevel1 = context.Request.QueryString["KeyCodeCategoryLevel1"] != null && context.Request.QueryString["KeyCodeCategoryLevel1"] != "undefined" ? context.Request.QueryString["KeyCodeCategoryLevel1"] : "";

            int Limit = context.Request.QueryString["Limit"] != null && context.Request.QueryString["Limit"] != "undefined" ? int.Parse(context.Request.QueryString["Limit"]) : 50;
            int IntroLenght = context.Request.QueryString["IntroLenght"] != null && context.Request.QueryString["IntroLenght"] != "undefined" ? int.Parse(context.Request.QueryString["IntroLenght"]) : 100;
            int TitleLenght = context.Request.QueryString["TitleLenght"] != null && context.Request.QueryString["TitleLenght"] != "undefined" ? int.Parse(context.Request.QueryString["TitleLenght"]) : 100;
            string Order = string.IsNullOrEmpty(context.Request.QueryString["Order"]) == false ? context.Request.QueryString["Order"] : "Contents_ID";
            bool IsDesc = context.Request.QueryString["IsDesc"] != null && context.Request.QueryString["IsDesc"] != "undefined" ? bool.Parse(context.Request.QueryString["IsDesc"]) : true;
            int IDLang = !string.IsNullOrEmpty(context.Request.QueryString["IDLang"].ToString()) ? int.Parse(context.Request.QueryString["IDLang"]) : 1;

            ContentsBO aContentsBO = new ContentsBO();
            List<vw_ContentViewAll> obj = aContentsBO.Sel_Ext_ByKeyCodeCategoryLevel1_ByIDLang(KeyCodeCategoryLevel1, IDLang);
            obj = this.ConvertList(obj, TitleLenght, IntroLenght, Limit, Order, IsDesc);

            if (obj != null)
            {
                _converter.DateTimeFormat = "dd/MM/yyyy";
                jSonString = JsonConvert.SerializeObject(obj, _converter);
            }
            jSonString = "{\"data\":" + jSonString + "}";
            context.Response.Write(jSonString);
        }
        public void Sel_Ext_ByCode(HttpContext context)   // Load ra danh sách các contact bằng IDLang
        {

            String jSonString = "";

            string Code = context.Request.QueryString["Code"] != null && context.Request.QueryString["Code"] != "undefined" ? context.Request.QueryString["Code"] : "";

            int Limit = context.Request.QueryString["Limit"] != null && context.Request.QueryString["Limit"] != "undefined" ? int.Parse(context.Request.QueryString["Limit"]) : 50;
            int IntroLenght = context.Request.QueryString["IntroLenght"] != null && context.Request.QueryString["IntroLenght"] != "undefined" ? int.Parse(context.Request.QueryString["IntroLenght"]) : 100;
            int TitleLenght = context.Request.QueryString["TitleLenght"] != null && context.Request.QueryString["TitleLenght"] != "undefined" ? int.Parse(context.Request.QueryString["TitleLenght"]) : 100;
            string Order = string.IsNullOrEmpty(context.Request.QueryString["Order"]) == false ? context.Request.QueryString["Order"] : "Contents_ID";
            bool IsDesc = context.Request.QueryString["IsDesc"] != null && context.Request.QueryString["IsDesc"] != "undefined" ? bool.Parse(context.Request.QueryString["IsDesc"]) : true;
            int IDLang = !string.IsNullOrEmpty(context.Request.QueryString["IDLang"].ToString()) ? int.Parse(context.Request.QueryString["IDLang"]) : 1;

            ContentsBO aContentsBO = new ContentsBO();
            List<vw_ContentViewAll> obj = aContentsBO.Sel_Ext_ByCode(Code);
            obj = this.ConvertList(obj, TitleLenght, IntroLenght, Limit, Order, IsDesc);


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
            int IDContents = Convert.ToInt32(context.Request.QueryString["IDContents"]);

            ContentsBO aContentsBO = new ContentsBO();
            int ret = aContentsBO.Del_ByID(IDContents);


            if (ret > 0)
            { jSonString = "{\"status\": \"success\"}"; }

            if (ret <= 0)
            { jSonString = "{\"status\":\"error\" ,\"message\":\"" + ret.ToString() + "\"}"; }


            context.Response.Write(jSonString);
        }
        public void Del_ByCode(HttpContext context)
        {
            ContentsBO aContentsBO = new ContentsBO();
            String jSonString = "";
            string Code = context.Request.QueryString["Code"].ToString();
            int ret = aContentsBO.Del_ByCode(Code);


            if (ret > 0)
            { jSonString = "{\"status\": \"success\"}"; }

            if (ret <= 0)
            { jSonString = "{\"status\":\"error\" ,\"message\":\"" + ret.ToString() + "\"}"; }


            context.Response.Write(jSonString);
        }

        //=================================================================================================
        private int CreateCategoryLevel1Default(HttpContext context, string CategoryNameLevel1, int NUM_LANG)
        {
            List<CategoryLevel1> aList = new List<CategoryLevel1>();
            CategoryLevel1 aCategoryLevel1 = new CategoryLevel1();


            for (int i = 1; i <= NUM_LANG; i++)
            {
                aCategoryLevel1 = new CategoryLevel1();

                aCategoryLevel1.Code = "000";
                aCategoryLevel1.IDLang = !String.IsNullOrEmpty(context.Request.Form["IDLang_" + i]) ? Convert.ToInt32(context.Request.Form["IDLang_" + i]) : 0;

                aCategoryLevel1.CategoryNameLevel1 = CategoryNameLevel1;
                aCategoryLevel1.Intro = "[Defaul CategoryLevel1]";
                aCategoryLevel1.Info = "[Defaul CategoryLevel1]";

                aCategoryLevel1.Status = 0;
                aCategoryLevel1.Disable = false;
                aCategoryLevel1.Type = 0;
                aCategoryLevel1.IDAlbum = 0;
                aCategoryLevel1.Image = "";
                aCategoryLevel1.Image1 = "";
                aCategoryLevel1.Image2 = "";
                aCategoryLevel1.Image3 = "";
                aCategoryLevel1.Tag = "";
                aCategoryLevel1.Note = "";
                aCategoryLevel1.Tag = "";
                aCategoryLevel1.ViewCount = 0;

                aList.Add(aCategoryLevel1);
            }
            CategoryLevel1BO aCategoryLevel1BO = new CategoryLevel1BO();


            return aCategoryLevel1BO.Ins(ref aList);
        }

        private List<vw_ContentViewAll> ConvertList(List<vw_ContentViewAll> ListContent, int TitleLenght, int IntroLenght, int Limit, string Order, bool IsDesc)
        {
            if (( Limit == null ) || (Limit <= 0))
            {
                Limit = ListContent.Count;
            }
            if (Limit > ListContent.Count)
            {
                Limit = ListContent.Count;
            }

            if ((TitleLenght == null) || (TitleLenght <= 0))
            {
                TitleLenght = 1000;
            }
            if ((IntroLenght == null) || (IntroLenght <= 0))
            {
                IntroLenght = 1000;
            }

            //=========================
            
            switch (Order)
            {
                case "Contents_Code":
                    if (IsDesc == false)
                    {
                        ListContent = ListContent.OrderBy(a => a.Contents_Code).ToList();
                    }
                    else
                    {
                        ListContent = ListContent.OrderByDescending(a => a.Contents_Code).ToList();
                    }
                    break;
                case "Contents_DateCreated":
                    if (IsDesc == false)
                    {
                        ListContent = ListContent.OrderBy(a => a.Contents_DateCreated).ToList();
                    }
                    else
                    {
                        ListContent = ListContent.OrderByDescending(a => a.Contents_DateCreated).ToList();
                    }
                    break;
                case "Contents_DateEdited":
                    if (IsDesc == false)
                    {
                        ListContent = ListContent.OrderBy(a => a.Contents_DateEdited).ToList();
                    }
                    else
                    {
                        ListContent = ListContent.OrderByDescending(a => a.Contents_DateEdited).ToList();
                    }
                    break;
                case "Contents_CommentCount":
                    if (IsDesc == false)
                    {
                        ListContent = ListContent.OrderBy(a => a.Contents_CommentCount).ToList();
                    }
                    else
                    {
                        ListContent = ListContent.OrderByDescending(a => a.Contents_CommentCount).ToList();
                    }
                    break;
                //==============================================================================
                case "Contents_ExpireDate":
                    if (IsDesc == false)
                    {
                        ListContent = ListContent.OrderBy(a => a.Contents_ExpireDate).ToList();
                    }
                    else
                    {
                        ListContent = ListContent.OrderByDescending(a => a.Contents_ExpireDate).ToList();
                    }
                    break;
                //==============================================================================
                case "Contents_ID":
                    if (IsDesc == false)
                    {
                        ListContent = ListContent.OrderBy(a => a.Contents_ID).ToList();
                    }
                    else
                    {
                        ListContent = ListContent.OrderByDescending(a => a.Contents_ID).ToList();
                    }
                    break;
                //==============================================================================
                case "Contents_LikeCount":
                    if (IsDesc == false)
                    {
                        ListContent = ListContent.OrderBy(a => a.Contents_LikeCount).ToList();
                    }
                    else
                    {
                        ListContent = ListContent.OrderByDescending(a => a.Contents_LikeCount).ToList();
                    }
                    break;
                //==============================================================================
                case "Contents_PublishDate":
                    if (IsDesc == false)
                    {
                        ListContent = ListContent.OrderBy(a => a.Contents_PublishDate).ToList();
                    }
                    else
                    {
                        ListContent = ListContent.OrderByDescending(a => a.Contents_PublishDate).ToList();
                    }
                    break;
                //==============================================================================
                case "Contents_ViewCount":
                    if (IsDesc == false)
                    {
                        ListContent = ListContent.OrderBy(a => a.Contents_ViewCount).ToList();
                    }
                    else
                    {
                        ListContent = ListContent.OrderByDescending(a => a.Contents_ViewCount).ToList();
                    }
                    break;
                //==============================================================================
                case "Contents_Vote":
                    if (IsDesc == false)
                    {
                        ListContent = ListContent.OrderBy(a => a.Contents_Vote).ToList();
                    }
                    else
                    {
                        ListContent = ListContent.OrderByDescending(a => a.Contents_Vote).ToList();
                    }
                    break;
                //==============================================================================
                case "Contents_Type":
                    if (IsDesc == false)
                    {
                        ListContent = ListContent.OrderBy(a => a.Contents_Type).ToList();
                    }
                    else
                    {
                        ListContent = ListContent.OrderByDescending(a => a.Contents_Type).ToList();
                    }
                    break;
                //==============================================================================
                case "Contents_Title":
                    if (IsDesc == false)
                    {
                        ListContent = ListContent.OrderBy(a => a.Contents_Title).ToList();
                    }
                    else
                    {
                        ListContent = ListContent.OrderByDescending(a => a.Contents_Title).ToList();
                    }
                    break;
                //==============================================================================
                case "Contents_Status":
                    if (IsDesc == false)
                    {
                        ListContent = ListContent.OrderBy(a => a.Contents_Status).ToList();
                    }
                    else
                    {
                        ListContent = ListContent.OrderByDescending(a => a.Contents_Status).ToList();
                    }
                    break;
                //==============================================================================
                case "Contents_Disable":
                    if (IsDesc == false)
                    {
                        ListContent = ListContent.OrderBy(a => a.Contents_Disable).ToList();
                    }
                    else
                    {
                        ListContent = ListContent.OrderByDescending(a => a.Contents_Disable).ToList();
                    }
                    break;
                //###############################################################################
                case "CategoryLevel1_CategoryNameLevel1":
                    if (IsDesc == false)
                    {
                        ListContent = ListContent.OrderBy(a => a.CategoryLevel1_CategoryNameLevel1).ToList();
                    }
                    else
                    {
                        ListContent = ListContent.OrderByDescending(a => a.CategoryLevel1_CategoryNameLevel1).ToList();
                    }
                    break;
                //==============================================================================
                case "CategoryLevel1_Code":
                    if (IsDesc == false)
                    {
                        ListContent = ListContent.OrderBy(a => a.CategoryLevel1_Code).ToList();
                    }
                    else
                    {
                        ListContent = ListContent.OrderByDescending(a => a.CategoryLevel1_Code).ToList();
                    }
                    break;
                //==============================================================================
                case "CategoryLevel1_Disable":
                    if (IsDesc == false)
                    {
                        ListContent = ListContent.OrderBy(a => a.CategoryLevel1_Disable).ToList();
                    }
                    else
                    {
                        ListContent = ListContent.OrderByDescending(a => a.CategoryLevel1_Disable).ToList();
                    }
                    break;
                //==============================================================================
                case "CategoryLevel1_Status":
                    if (IsDesc == false)
                    {
                        ListContent = ListContent.OrderBy(a => a.CategoryLevel1_Status).ToList();
                    }
                    else
                    {
                        ListContent = ListContent.OrderByDescending(a => a.CategoryLevel1_Status).ToList();
                    }
                    break;
                //==============================================================================
                case "CategoryLevel1_Type":
                    if (IsDesc == false)
                    {
                        ListContent = ListContent.OrderBy(a => a.CategoryLevel1_Type).ToList();
                    }
                    else
                    {
                        ListContent = ListContent.OrderByDescending(a => a.CategoryLevel1_Type).ToList();
                    }
                    break;
                //==============================================================================
                case "CategoryLevel1_ViewCount":
                    if (IsDesc == false)
                    {
                        ListContent = ListContent.OrderBy(a => a.CategoryLevel1_ViewCount).ToList();
                    }
                    else
                    {
                        ListContent = ListContent.OrderByDescending(a => a.CategoryLevel1_ViewCount).ToList();
                    }
                    break;
                //###############################################################################
                case "Contents_CategoryLevel1_Disable":
                    if (IsDesc == false)
                    {
                        ListContent = ListContent.OrderBy(a => a.Contents_CategoryLevel1_Disable).ToList();
                    }
                    else
                    {
                        ListContent = ListContent.OrderByDescending(a => a.Contents_CategoryLevel1_Disable).ToList();
                    }
                    break;
                //==============================================================================
                case "Contents_CategoryLevel1_Status":
                    if (IsDesc == false)
                    {
                        ListContent = ListContent.OrderBy(a => a.Contents_CategoryLevel1_Status).ToList();
                    }
                    else
                    {
                        ListContent = ListContent.OrderByDescending(a => a.Contents_CategoryLevel1_Status).ToList();
                    }
                    break;
                //==============================================================================
                case "Contents_CategoryLevel1_Type":
                    if (IsDesc == false)
                    {
                        ListContent = ListContent.OrderBy(a => a.Contents_CategoryLevel1_Type).ToList();
                    }
                    else
                    {
                        ListContent = ListContent.OrderByDescending(a => a.Contents_CategoryLevel1_Type).ToList();
                    }
                    break;
                //==============================================================================
                default:
                   
                    break;
            }


            //###############################################################################
            int TitleLenght_Tempt = TitleLenght;
            int IntroLenght_Tempt = IntroLenght;

            for (int i = 0; i < Limit; i++)
            {
                if (ListContent[i].Contents_Title.Length < TitleLenght_Tempt)
                {
                    TitleLenght_Tempt = ListContent[i].Contents_Title.Length;
                }
                if (ListContent[i].Contents_Intro.Length < IntroLenght_Tempt)
                {
                    IntroLenght_Tempt = ListContent[i].Contents_Intro.Length;
                }

                //if (TitleLenght == 0) { TitleLenght = 1; }
                //if (IntroLenght == 0) { IntroLenght = 1; }

                ListContent[i].Contents_Title = ListContent[i].Contents_Title.Substring(0, TitleLenght_Tempt);
                ListContent[i].Contents_Intro = ListContent[i].Contents_Intro.Substring(0, IntroLenght_Tempt);
                
                TitleLenght_Tempt = TitleLenght;
                IntroLenght_Tempt = IntroLenght;
            }

            ListContent = ListContent.GetRange(0, Limit).ToList();
            return ListContent;
            //=========================
        }
        private List<Contents> ConvertList(List<Contents> ListContent, int TitleLenght, int IntroLenght, int Limit, string Order, bool IsDesc)
        {
            if ((Limit == null) || (Limit <= 0))
            {
                Limit = ListContent.Count;
            }
            if (Limit > ListContent.Count)
            {
                Limit = ListContent.Count;
            }

            if ((TitleLenght == null) || (TitleLenght <= 0))
            {
                TitleLenght = 1000;
            }
            if ((IntroLenght == null) || (IntroLenght <= 0))
            {
                IntroLenght = 1000;
            }

            //=========================

            switch (Order)
            {
                case "Code":
                    if (IsDesc == false)
                    {
                        ListContent = ListContent.OrderBy(a => a.Code).ToList();
                    }
                    else
                    {
                        ListContent = ListContent.OrderByDescending(a => a.Code).ToList();
                    }
                    break;
                case "DateCreated":
                    if (IsDesc == false)
                    {
                        ListContent = ListContent.OrderBy(a => a.DateCreated).ToList();
                    }
                    else
                    {
                        ListContent = ListContent.OrderByDescending(a => a.DateCreated).ToList();
                    }
                    break;
                case "DateEdited":
                    if (IsDesc == false)
                    {
                        ListContent = ListContent.OrderBy(a => a.DateEdited).ToList();
                    }
                    else
                    {
                        ListContent = ListContent.OrderByDescending(a => a.DateEdited).ToList();
                    }
                    break;
                case "CommentCount":
                    if (IsDesc == false)
                    {
                        ListContent = ListContent.OrderBy(a => a.CommentCount).ToList();
                    }
                    else
                    {
                        ListContent = ListContent.OrderByDescending(a => a.CommentCount).ToList();
                    }
                    break;
                //==============================================================================
                case "ExpireDate":
                    if (IsDesc == false)
                    {
                        ListContent = ListContent.OrderBy(a => a.ExpireDate).ToList();
                    }
                    else
                    {
                        ListContent = ListContent.OrderByDescending(a => a.ExpireDate).ToList();
                    }
                    break;
                //==============================================================================
                case "ID":
                    if (IsDesc == false)
                    {
                        ListContent = ListContent.OrderBy(a => a.ID).ToList();
                    }
                    else
                    {
                        ListContent = ListContent.OrderByDescending(a => a.ID).ToList();
                    }
                    break;
                //==============================================================================
                case "LikeCount":
                    if (IsDesc == false)
                    {
                        ListContent = ListContent.OrderBy(a => a.LikeCount).ToList();
                    }
                    else
                    {
                        ListContent = ListContent.OrderByDescending(a => a.LikeCount).ToList();
                    }
                    break;
                //==============================================================================
                case "PublishDate":
                    if (IsDesc == false)
                    {
                        ListContent = ListContent.OrderBy(a => a.PublishDate).ToList();
                    }
                    else
                    {
                        ListContent = ListContent.OrderByDescending(a => a.PublishDate).ToList();
                    }
                    break;
                //==============================================================================
                case "ViewCount":
                    if (IsDesc == false)
                    {
                        ListContent = ListContent.OrderBy(a => a.ViewCount).ToList();
                    }
                    else
                    {
                        ListContent = ListContent.OrderByDescending(a => a.ViewCount).ToList();
                    }
                    break;
                //==============================================================================
                case "Vote":
                    if (IsDesc == false)
                    {
                        ListContent = ListContent.OrderBy(a => a.Vote).ToList();
                    }
                    else
                    {
                        ListContent = ListContent.OrderByDescending(a => a.Vote).ToList();
                    }
                    break;
                //==============================================================================
                case "Type":
                    if (IsDesc == false)
                    {
                        ListContent = ListContent.OrderBy(a => a.Type).ToList();
                    }
                    else
                    {
                        ListContent = ListContent.OrderByDescending(a => a.Type).ToList();
                    }
                    break;
                //==============================================================================
                case "Title":
                    if (IsDesc == false)
                    {
                        ListContent = ListContent.OrderBy(a => a.Title).ToList();
                    }
                    else
                    {
                        ListContent = ListContent.OrderByDescending(a => a.Title).ToList();
                    }
                    break;
                //==============================================================================
                case "Status":
                    if (IsDesc == false)
                    {
                        ListContent = ListContent.OrderBy(a => a.Status).ToList();
                    }
                    else
                    {
                        ListContent = ListContent.OrderByDescending(a => a.Status).ToList();
                    }
                    break;
                //==============================================================================
                case "Disable":
                    if (IsDesc == false)
                    {
                        ListContent = ListContent.OrderBy(a => a.Disable).ToList();
                    }
                    else
                    {
                        ListContent = ListContent.OrderByDescending(a => a.Disable).ToList();
                    }
                    break;
                //==============================================================================
                default:

                    break;
            }
            //###############################################################################
            int TitleLenght_Tempt = TitleLenght;
            int IntroLenght_Tempt = IntroLenght;

            for (int i = 0; i < Limit; i++)
            {
                if (ListContent[i].Title.Length < TitleLenght_Tempt)
                {
                    TitleLenght_Tempt = ListContent[i].Title.Length;
                }
                if (ListContent[i].Intro.Length < IntroLenght_Tempt)
                {
                    IntroLenght_Tempt = ListContent[i].Intro.Length;
                }

                //if (TitleLenght == 0) { TitleLenght = 1; }
                //if (IntroLenght == 0) { IntroLenght = 1; }

                ListContent[i].Title = ListContent[i].Title.Substring(0, TitleLenght_Tempt);
                ListContent[i].Intro = ListContent[i].Intro.Substring(0, IntroLenght_Tempt);

                TitleLenght_Tempt = TitleLenght;
                IntroLenght_Tempt = IntroLenght;
            }



            ListContent = ListContent.GetRange(0, Limit).ToList();
            return ListContent;
            //=========================
        }
    }
}
