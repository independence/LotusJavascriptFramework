using System;
using System.Collections.Generic;
using System.Linq;
using System.Data.Sql;
using System.Data;
using System.Data.SqlClient;
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
    public class CategoryLevel1Action : IAction
    {

        public void Do(HttpContext context)
        {
            string action = context.Request["action"].ToString();
            if (!String.IsNullOrEmpty(action))
            {
                switch (action)
                {


                    case "Sel_ByCode":
                        Sel_ByCode(context, CORE_Language.sys_NUM_LANG);
                        break;
                    case "Sel_ByIDLang":
                        this.Sel_ByIDLang(context);
                        break;
                    case "Sel_ByIDLang_DropList":
                        Sel_ByIDLang_DropList(context, CORE_Language.sys_CUR_LANG);
                        break;
                    case "Sel_ByCodeCategoryLevel2":
                        Sel_ByCodeCategoryLevel2(context, CORE_Language.sys_CUR_LANG);
                        break;
                    case "Upd_ByCode":
                        Upd(context, CORE_Language.sys_NUM_LANG);
                        break;
                    case "Ins":
                        Ins(context, CORE_Language.sys_NUM_LANG);
                        break;
                    case "Upd_Disable":
                        Upd_Disable(context);
                        break;
                    case "Del_ByCode":
                        Del_ByCode(context);
                        break;

                    /*****Front-end*****/

                    //tqtrung

                    case "Sel_ByCodeCategoryLevel2_ByIDLang":
                        Sel_ByCodeCategoryLevel2_ByIDLang(context);
                        break;

                    default:
                        context.Response.Write("Can't find action");
                        break;

                    /*####################################*/
                    // NgocBM
                    case "Sel_Ext_ByCode":
                        this.Sel_Ext_ByCode(context);
                        break;
                    case "Sel_ByKeyCodeCategoryLevel2_ByIDLang":
                        this.Sel_ByKeyCodeCategoryLevel2_ByIDLang(context);
                        break;
                    case "Sel_ByKeyCodeCategoryLevel1_ByIDLang":
                        this.Sel_ByKeyCodeCategoryLevel1_ByIDLang(context);
                        break;
                }
            }
        }



        private IsoDateTimeConverter _converter = new IsoDateTimeConverter();


        public void Sel_ByCode(HttpContext context, int NUM_LANG)
        {
            CategoryLevel1BO aCategoryLevel1BO = new CategoryLevel1BO();
            String jSonString = "";
            //string Code = aCategoryLevel1BO.Sel(int.Parse(context.Request.QueryString["IDCategoryLevel1"])).Code;

            //List<CategoryLevel1> obj = aCategoryLevel1BO.Sel_ByCode(Code);
            ///*for (int i = 0; i < NUM_LANG; i++)
            //{
            //    obj[i].Info = HttpUtility.HtmlDecode(obj[i].Info);
            //    obj[i].Intro = HttpUtility.HtmlDecode(obj[i].Intro);
            //}*/
            //if (obj != null)
            //{
            //    _converter.DateTimeFormat = "dd/MM/yyyy";

            //    jSonString = JsonConvert.SerializeObject(obj, _converter);
            //}
            jSonString = "{\"data\":" + jSonString + "}";
            context.Response.Write(jSonString);
        }

        public void Sel_ByIDLang(HttpContext context)
        {

            String jSonString = "";
            CategoryLevel1BO aCategoryLevel1BO = new CategoryLevel1BO();
            int IDLang = string.IsNullOrEmpty(context.Request.QueryString["IDLang"]) ? CORE_Language.sys_CUR_LANG : int.Parse(context.Request.QueryString["IDLang"]);

            List<CategoryLevel1> obj = aCategoryLevel1BO.Sel_ByIDLang(IDLang).ToList();
            /*for (int i = 0; i < NUM_LANG; i++)
            {
                obj[i].Info = HttpUtility.HtmlDecode(obj[i].Info);
                obj[i].Intro = HttpUtility.HtmlDecode(obj[i].Intro);
            }*/
            if (obj != null)
            {
                _converter.DateTimeFormat = "dd/MM/yyyy";

                jSonString = JsonConvert.SerializeObject(obj, _converter);
            }
            jSonString = "{\"data\":" + jSonString + "}";
            context.Response.Write(jSonString);
        }

        public void Sel_ByIDLang_DropList(HttpContext context, int IDLang)
        {

            String jSonString = "";
            string CodeCategoryLevel2 = context.Request.QueryString["CodeCategoryLevel2"];
            CategoryLevel1BO aCategoryLevel1BO = new CategoryLevel1BO();
            //List<CategoryLevel1> obj = aCategoryLevel1BO.Sel_ByIDLang(IDLang).Where(p => p.CodeCategoryLevel2 == CodeCategoryLevel2).ToList<CategoryLevel1>();

            //if (obj != null)
            //{
            //    _converter.DateTimeFormat = "dd/MM/yyyy";

            //    jSonString = JsonConvert.SerializeObject(obj, _converter);
            //}
            jSonString = "{\"data\":" + jSonString + "}";
            context.Response.Write(jSonString);
        }

        public void Sel_ByCodeCategoryLevel2(HttpContext context, int IDLang)
        {
            ConfigsBO aConfigsBO = new ConfigsBO();
            String jSonString = "";
            string CodeCategoryLevel2 = "";
            CodeCategoryLevel2 = context.Request.QueryString["CodeCat2"];          

            CategoryLevel1BO aCategoryLevel1BO = new CategoryLevel1BO();

            
            //List<CategoryLevel1> obj = aCategoryLevel1BO.Sel_ByIDLang(IDLang).Where(p => !p.CodeCategoryLevel2.Contains(CodeCategoryLevel2)).ToList<CategoryLevel1>();
            List<vw_CategoryLevel1ViewAll> obj = aCategoryLevel1BO.Sel_Ext_ByCodeCategoryLevel2(CodeCategoryLevel2).ToList();

            if (obj != null)
            {
                _converter.DateTimeFormat = "dd/MM/yyyy";

                jSonString = JsonConvert.SerializeObject(obj, _converter);
            }
            jSonString = "{\"CategoryLevel1s\":" + jSonString + "}";
            context.Response.Write(jSonString);
        }

        public void Sel_ByCodeCategoryLevel2_ContentsPage(HttpContext context, int IDLang)
        {
            ConfigsBO aConfigsBO = new ConfigsBO();
            String jSonString = "";
            string CodeCategoryLevel2 = "";
            string CategoryLevel2 = Convert.ToString(context.Request.QueryString["CategoryLevel2"]);
            switch (CategoryLevel2)
            {
                case "Contents":
                    CodeCategoryLevel2 = aConfigsBO.Sel_ByAccessKey("CATEGORYLEVEL2_Contents").Value;
                    break;
                case "Wedding":
                    CodeCategoryLevel2 = aConfigsBO.Sel_ByAccessKey("CategoryLevel2_Wedding").Value;
                    break;
                case "Travel":
                    CodeCategoryLevel2 = aConfigsBO.Sel_ByAccessKey("CategoryLevel2_Travel").Value;
                    break;
            }
            CategoryLevel1BO aCategoryLevel1BO = new CategoryLevel1BO();
            //List<CategoryLevel1> obj = aCategoryLevel1BO.Sel_ByIDLang(IDLang).Where(p => p.CodeCategoryLevel2 == CodeCategoryLevel2).ToList<CategoryLevel1>();

            //if (obj != null)
            //{
            //    _converter.DateTimeFormat = "dd/MM/yyyy";

            //    jSonString = JsonConvert.SerializeObject(obj, _converter);
            //}
            jSonString = "{\"data\":" + jSonString + "}";
            context.Response.Write(jSonString);
        }


        public void Ins(HttpContext context, int NUM_LANG)
        {
            int ret = -1;
            String jSonString = "";
            try
            {
                CategoryLevel1 aCategoryLevel1 = new CategoryLevel1();


                aCategoryLevel1.Status = !String.IsNullOrEmpty(context.Request.Form["txt_Status"]) ? Convert.ToInt32(context.Request.Form["txt_Status"]) : 0;

                aCategoryLevel1.Disable = !String.IsNullOrEmpty(context.Request.Form["txt_Disable"]) ? Convert.ToBoolean(context.Request.Form["txt_Disable"]) : false;

               // aCategoryLevel1.CodeCategoryLevel2 = !String.IsNullOrEmpty(context.Request.Form["txt_CodeCategoryLevel2"]) ? Convert.ToString(context.Request.Form["txt_CodeCategoryLevel2"]) : "";

                aCategoryLevel1.Type = !String.IsNullOrEmpty(context.Request.Form["txt_Type"]) ? Convert.ToInt32(context.Request.Form["txt_Type"]) : 0;

                aCategoryLevel1.IDAlbum = !String.IsNullOrEmpty(context.Request.Form["txt_IDAlbum"]) ? Convert.ToInt32(context.Request.Form["txt_IDAlbum"]) : 0;
                aCategoryLevel1.Image = !String.IsNullOrEmpty(context.Request.Form["txt_Image_1"]) ? Convert.ToString(context.Request.Form["txt_Image_1"]) : "";
                aCategoryLevel1.Image1 = !String.IsNullOrEmpty(context.Request.Form["txt_Image_2"]) ? Convert.ToString(context.Request.Form["txt_Image_2"]) : "";
                aCategoryLevel1.Image2 = !String.IsNullOrEmpty(context.Request.Form["txt_Image_3"]) ? Convert.ToString(context.Request.Form["txt_Image_3"]) : "";
                aCategoryLevel1.Image3 = !String.IsNullOrEmpty(context.Request.Form["txt_Image_4"]) ? Convert.ToString(context.Request.Form["txt_Image_4"]) : "";
                aCategoryLevel1.Tag = !String.IsNullOrEmpty(context.Request.Form["txt_Tag"]) ? Convert.ToString(context.Request.Form["txt_Tag"]) : "";
                aCategoryLevel1.Note = !String.IsNullOrEmpty(context.Request.Form["txt_Note"]) ? Convert.ToString(context.Request.Form["txt_Note"]) : "";
                aCategoryLevel1.Tag = !String.IsNullOrEmpty(context.Request.Form["txt_Tag"]) ? Convert.ToString(context.Request.Form["txt_Tag"]) : "";
                aCategoryLevel1.ViewCount = !String.IsNullOrEmpty(context.Request.Form["txt_ViewCount"]) ? Convert.ToInt32(context.Request.Form["txt_ViewCount"]) : 0;



                long a = DateTime.Now.Ticks;
                TimeSpan Codespan = new TimeSpan(a);
                aCategoryLevel1.Code = Math.Floor(Codespan.TotalSeconds).ToString();

                for (int i = 1; i <= NUM_LANG; i++)
                {
                    aCategoryLevel1.IDLang = !String.IsNullOrEmpty(context.Request.Form["IDLang_" + i]) ? Convert.ToInt32(context.Request.Form["IDLang_" + i]) : 0;

                    aCategoryLevel1.CategoryNameLevel1 = !String.IsNullOrEmpty(context.Request.Form["txt_CategoryNameLevel1_Lang" + i]) ? Convert.ToString(context.Request.Form["txt_CategoryNameLevel1_Lang" + i]) : "";
                    aCategoryLevel1.Intro = !String.IsNullOrEmpty(context.Request.Form["txt_Intro_Lang" + i]) ? Convert.ToString(HttpUtility.HtmlDecode(context.Request.Form["txt_Intro_Lang" + i])) : "";
                    aCategoryLevel1.Info = !String.IsNullOrEmpty(context.Request.Form["txt_Info_Lang" + i]) ? Convert.ToString(HttpUtility.HtmlDecode(context.Request.Form["txt_Info_Lang" + i])) : "";
                    CategoryLevel1BO aCategoryLevel1BO = new CategoryLevel1BO();
                    ret = aCategoryLevel1BO.Ins(aCategoryLevel1);
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
        //tqtrung
        public void Ins_CategoryLevel1_CategoryLevel2(HttpContext context, int NUM_LANG)
        {
            int ret = -1;
            String jSonString = "";
            try
            {
                CategoryLevel1_CategoryLevel2 aCategoryLevel1_CategoryLevel2 = new CategoryLevel1_CategoryLevel2();

                //long a = DateTime.Now.Ticks;
                //TimeSpan Codespan = new TimeSpan(a);
                //aCategoryLevel1.Code = Math.Floor(Codespan.TotalSeconds).ToString();

                for (int i = 1; i <= NUM_LANG; i++)
                {
                    aCategoryLevel1_CategoryLevel2.IDLang = !String.IsNullOrEmpty(context.Request.Form["IDLang_" + i]) ? Convert.ToInt32(context.Request.Form["IDLang_" + i]) : 0;

                    aCategoryLevel1_CategoryLevel2.Status = !String.IsNullOrEmpty(context.Request.Form["txt_Status"]) ? Convert.ToInt32(context.Request.Form["txt_Status"]) : 0;

                    aCategoryLevel1_CategoryLevel2.Disable = !String.IsNullOrEmpty(context.Request.Form["txt_Disable"]) ? Convert.ToBoolean(context.Request.Form["txt_Disable"]) : false;

                    // aCategoryLevel1.CodeCategoryLevel2 = !String.IsNullOrEmpty(context.Request.Form["txt_CodeCategoryLevel2"]) ? Convert.ToString(context.Request.Form["txt_CodeCategoryLevel2"]) : "";

                    aCategoryLevel1_CategoryLevel2.Type = !String.IsNullOrEmpty(context.Request.Form["txt_Type"]) ? Convert.ToInt32(context.Request.Form["txt_Type"]) : 0;

                    aCategoryLevel1_CategoryLevel2.CodeCategoryLevel1 = !String.IsNullOrEmpty(context.Request.Form["txt_CodeCategoryLevel1"]) ? Convert.ToString(context.Request.Form["txt_CodeCategoryLevel1"]) : "";
                    aCategoryLevel1_CategoryLevel2.CodeCategoryLevel2 = !String.IsNullOrEmpty(context.Request.Form["txt_CodeCategoryLevel2"]) ? Convert.ToString(context.Request.Form["txt_CodeCategoryLevel2"]) : "";

                    CategoryLevel1BO aCategoryLevel1BO = new CategoryLevel1BO();
                    ret = aCategoryLevel1BO.InsCategoryLevel1_CategoryLevel2(aCategoryLevel1_CategoryLevel2);
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

        public void Upd(HttpContext context, int NUM_LANG)
        {
            int ret = -1;
            String jSonString = "";
            try
            {
                if (NUM_LANG < 1)
                {
                    NUM_LANG = 1;
                }
                List<CategoryLevel1> aCategoryLevel1 = new List<CategoryLevel1>();
                CategoryLevel1BO aCategoryLevel1BO = new CategoryLevel1BO();
                //String Code = aCategoryLevel1BO.Sel(int.Parse(context.Request.QueryString["IDCategoryLevel1"])).Code;

                //aCategoryLevel1 = aCategoryLevel1BO.Sel_ByCode(Code);

                int LoopUpdate = 0;

                if (aCategoryLevel1.Count <= NUM_LANG)
                {
                    LoopUpdate = aCategoryLevel1.Count;
                    for (int i = 0; i < LoopUpdate; i++)
                    {

                        aCategoryLevel1[i].ID = aCategoryLevel1[i].ID;

                        aCategoryLevel1[i].Code = aCategoryLevel1[i].Code;
                        aCategoryLevel1[i].IDLang = aCategoryLevel1[i].IDLang;


                        aCategoryLevel1[i].CategoryNameLevel1 = !String.IsNullOrEmpty(context.Request.Form["txt_CategoryNameLevel1_Lang" + (i + 1)]) ? Convert.ToString(context.Request.Form["txt_CategoryNameLevel1_Lang" + (i + 1)]) : aCategoryLevel1[i].CategoryNameLevel1;

                        aCategoryLevel1[i].Status = !String.IsNullOrEmpty(context.Request.Form["txt_Status"]) ? Convert.ToInt32(context.Request.Form["txt_Status"]) : aCategoryLevel1[i].Status;

                        aCategoryLevel1[i].Disable = !String.IsNullOrEmpty(context.Request.Form["txt_Disable"]) ? Convert.ToBoolean(context.Request.Form["txt_Disable"]) : aCategoryLevel1[i].Disable;

                        aCategoryLevel1[i].Type = !String.IsNullOrEmpty(context.Request.Form["txt_Type"]) ? Convert.ToInt32(context.Request.Form["txt_Type"]) : aCategoryLevel1[i].Type;

                        ret = aCategoryLevel1BO.Upd(aCategoryLevel1[i]);
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
                CategoryLevel1BO aCategoryLevel1BO = new CategoryLevel1BO();
                List<CategoryLevel1> listCategoryLevel1 = new List<CategoryLevel1>();
                //string Code = aCategoryLevel1BO.Sel(int.Parse(context.Request.QueryString["IDCategoryLevel1"])).Code;
                //listCategoryLevel1 = aCategoryLevel1BO.Sel_ByCode(Code);
                for (int i = 0; i < listCategoryLevel1.Count; i++)
                {
                    listCategoryLevel1[i].Disable = true;
                    ret = aCategoryLevel1BO.Upd(listCategoryLevel1[i]);
                }

                //chuyển disable những tin tức trực thuộc
                ContentsBO aContentsBO = new ContentsBO();

                //List<Contents> listContents = aContentsBO.Sel().Where(p => p.CodeCategoryLevel1 == Code).ToList<Contents>();
                //for (int i = 0; i < listContents.Count; i++)
                //{
                //    listContents[i].Disable = true;
                //    ret = aContentsBO.Upd(listContents[i]);
                //}
                //if (ret == 0)
                //{
                //    jSonString = "{\"status\":\"error|" + ret.ToString() + "\"}";

                //}

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
        //=================================================================================================

        public void Sel_ByCode_ByIDLang(HttpContext context)
        {

            String jSonString = "";
            string Code = context.Request.QueryString["Code"];
            int IDLang = int.Parse(context.Request.QueryString["IDLang"]);
            CategoryLevel1BO aCategoryLevel1BO = new CategoryLevel1BO();
            CategoryLevel1 obj = aCategoryLevel1BO.Sel_ByCode_ByIDLang(Code, IDLang);
            //obj.Info = HttpUtility.HtmlDecode(obj.Info);
            //obj.Intro = HttpUtility.HtmlDecode(obj.Intro);

            if (obj != null)
            {
                _converter.DateTimeFormat = "dd/MM/yyyy";

                jSonString = JsonConvert.SerializeObject(obj, _converter);
            }
            jSonString = "{\"CategoryLevel1\":" + jSonString + "}";
            context.Response.Write(jSonString);
        }

        public void Sel(HttpContext context)
        {

            String jSonString = "";
            int IDCategoryLevel1 = Convert.ToInt32(context.Request.QueryString["IDCategoryLevel1"]);

            CategoryLevel1BO aCategoryLevel1BO = new CategoryLevel1BO();
            //CategoryLevel1 obj = aCategoryLevel1BO.Sel(IDCategoryLevel1);
            ////obj.Info = HttpUtility.HtmlDecode(obj.Info);
            ////obj.Intro = HttpUtility.HtmlDecode(obj.Intro);

            //if (obj != null)
            //{
            //    _converter.DateTimeFormat = "dd/MM/yyyy";

            //    jSonString = JsonConvert.SerializeObject(obj, _converter);
            //}
            jSonString = "{\"CategoryLevel1\":" + jSonString + "}";
            context.Response.Write(jSonString);
        }

        public void Del(HttpContext context)
        {

            String jSonString = "";
            int IDCategoryLevel1 = Convert.ToInt32(context.Request.QueryString["IDCategoryLevel1"]);

            CategoryLevel1BO aCategoryLevel1BO = new CategoryLevel1BO();
            //int ret = aCategoryLevel1BO.Del(IDCategoryLevel1);


            //if (ret != 0)
            //{ jSonString = "{\"status\": \"success\"}"; }

            //if (ret == 0)
            //{ jSonString = "{\"status\":\"error|" + ret.ToString() + "\"}"; }


            context.Response.Write(jSonString);
        }

        public void Del_ByCode(HttpContext context)
        {
            CategoryLevel1BO aCategoryLevel1BO = new CategoryLevel1BO();
            String jSonString = "";
            //string Code = aCategoryLevel1BO.Sel(int.Parse(context.Request.QueryString["IDCategoryLevel1"])).Code;


            //int ret = aCategoryLevel1BO.Del_ByCode(Code);


            //if (ret != 0)
            //{ jSonString = "{\"status\": \"success\"}"; }

            //else
            //{ jSonString = "{\"status\":\"error|" + ret.ToString() + "\"}"; }


            context.Response.Write(jSonString);
        }

        //=================================================================================================
        public void Sel_ByCodeCategoryLevel2_ByIDLang(HttpContext context)   // Load ra danh sách các CategoryLevel1 bằng CodeCategpryLevel2 va IDLang
        {

            String jSonString = "";

            string CodeCategoryLevel2 = context.Request.QueryString["CodeCategoryLevel2"] != null && context.Request.QueryString["CodeCategoryLevel2"] != "undefined" ? context.Request.QueryString["CodeCategoryLevel2"] : "-1";
            int TitleLenght = context.Request.QueryString["TitleLenght"] != null && context.Request.QueryString["TitleLenght"] != "undefined" ? int.Parse(context.Request.QueryString["TitleLenght"]) : -1;
            int Limit = context.Request.QueryString["Limit"] != null && context.Request.QueryString["Limit"] != "undefined" ? int.Parse(context.Request.QueryString["Limit"]) : -1;
            string Order = context.Request.QueryString["Order"] != null && context.Request.QueryString["Order"] != "undefined" ? context.Request.QueryString["Order"] : "-1";
            string IsDesc = context.Request.QueryString["IsDesc"] != null && context.Request.QueryString["IsDesc"] != "undefined" ? context.Request.QueryString["IsDesc"] : "-1";
            //int IDLang =int.Parse(context.Request.QueryString["IDLang"]); 

            CategoryLevel1BO aCategoryLevel1BO = new CategoryLevel1BO();
            List<vw_CategoryLevel1ViewAll> obj = aCategoryLevel1BO.Sel_Ext_ByCodeCategoryLevel2_ByIDLang(CodeCategoryLevel2, 1).ToList();
            List<vw_CategoryLevel1ViewAll> ObjOrder = new List<vw_CategoryLevel1ViewAll>();

            switch (Order)
            {
                case "CategoryLevel1_CategoryNameLevel1":
                    if (IsDesc == "False")
                    {
                        ObjOrder = obj.OrderBy(a => a.CategoryLevel1_CategoryNameLevel1).ToList();
                    }
                    else
                    {
                        ObjOrder = obj.OrderByDescending(a => a.CategoryLevel1_CategoryNameLevel1).ToList();
                    }
                    break;
                case "CategoryLevel2_CategoryNameLevel2":
                    if (IsDesc == "False")
                    {
                        ObjOrder = obj.OrderBy(a => a.CategoryLevel2_CategoryNameLevel2).ToList();
                    }
                    else
                    {
                        ObjOrder = obj.OrderByDescending(a => a.CategoryLevel2_CategoryNameLevel2).ToList();
                    }
                    break;
                case "CategoryLevel1_ID":
                    if (IsDesc == "False")
                    {
                        ObjOrder = obj.OrderBy(a => a.CategoryLevel1_ID).ToList();
                    }
                    else
                    {
                        ObjOrder = obj.OrderByDescending(a => a.CategoryLevel1_ID).ToList();
                    }
                    break;
                default:
                    ObjOrder = obj;
                    break;
            }

            for (int i = 0; i < ObjOrder.Count; i++)
            {
                if ((TitleLenght > -1) & (ObjOrder[i].CategoryLevel1_CategoryNameLevel1.Length > TitleLenght))
                {
                    ObjOrder[i].CategoryLevel1_CategoryNameLevel1 = ObjOrder[i].CategoryLevel1_CategoryNameLevel1.Substring(0, TitleLenght - 1);
                }
            }
            List<vw_CategoryLevel1ViewAll> ObjOrderLimit = new List<vw_CategoryLevel1ViewAll>();
            if ((Limit > -1) & (ObjOrder.Count > Limit))
            {
                ObjOrderLimit = ObjOrder.GetRange(0, Limit).ToList();

                _converter.DateTimeFormat = "dd/MM/yyyy";
                jSonString = JsonConvert.SerializeObject(ObjOrderLimit, _converter);
            }
            else
            {
                if (ObjOrder != null)
                {
                    _converter.DateTimeFormat = "dd/MM/yyyy";
                    jSonString = JsonConvert.SerializeObject(ObjOrder, _converter);
                }
            }
            jSonString = "{\"CategoryLevel1s\":" + jSonString + "}";
            context.Response.Write(jSonString);
        }

        public void Sel_ByKeyCodeCategoryLevel2_ByIDLang(HttpContext context)   // Load ra danh sách các contact bằng IDLang
        {

            String jSonString = "";

            string KeyCodeCategoryLevel1 = context.Request.QueryString["KeyCodeCategoryLevel1"] != null && context.Request.QueryString["KeyCodeCategoryLevel1"] != "undefined" ? context.Request.QueryString["KeyCodeCategoryLevel1"] : "";
            int IDLang = context.Request.QueryString["IDLang"] != null && context.Request.QueryString["IDLang"] != "undefined" ? int.Parse(context.Request.QueryString["IDLang"]) : 1;

            int InfoLenght = context.Request.QueryString["IntroLenght"] != null && context.Request.QueryString["IntroLenght"] != "undefined" ? int.Parse(context.Request.QueryString["IntroLenght"]) : -1;
            int TitleLenght = context.Request.QueryString["TitleLenght"] != null && context.Request.QueryString["TitleLenght"] != "undefined" ? int.Parse(context.Request.QueryString["TitleLenght"]) : -1;
            int Limit = context.Request.QueryString["Limit"] != null && context.Request.QueryString["Limit"] != "undefined" ? int.Parse(context.Request.QueryString["Limit"]) : -1;
            string Order = context.Request.QueryString["Order"] != null && context.Request.QueryString["Order"] != "undefined" ? context.Request.QueryString["Order"] : "-1";
            string IsDesc = context.Request.QueryString["IsDesc"] != null && context.Request.QueryString["IsDesc"] != "undefined" ? context.Request.QueryString["IsDesc"] : "-1";

            CategoryLevel1BO aCategoryLevel1BO = new CategoryLevel1BO();
            List<vw_CategoryLevel1ViewAll> obj = aCategoryLevel1BO.Sel_ByKeyCodeCategoryLevel1_ByIDLang(KeyCodeCategoryLevel1, IDLang);
            List<vw_CategoryLevel1ViewAll> ObjOrder = new List<vw_CategoryLevel1ViewAll>();

            switch (Order)
            {
                case "CategoryLevel1_Code":
                    if (IsDesc == "False")
                    {
                        ObjOrder = obj.OrderBy(a => a.CategoryLevel1_Code).ToList();
                    }
                    else
                    {
                        ObjOrder = obj.OrderByDescending(a => a.CategoryLevel1_Code).ToList();
                    }
                    break;

                case "CategoryLevel2_Code":
                    if (IsDesc == "False")
                    {
                        ObjOrder = obj.OrderBy(a => a.CategoryLevel2_Code).ToList();
                    }
                    else
                    {
                        ObjOrder = obj.OrderByDescending(a => a.CategoryLevel2_Code).ToList();
                    }
                    break;

                case "CountContentDisable":
                    if (IsDesc == "False")
                    {
                        ObjOrder = obj.OrderBy(a => a.CountContentDisable).ToList();
                    }
                    else
                    {
                        ObjOrder = obj.OrderByDescending(a => a.CountContentDisable).ToList();
                    }
                    break;
                case "CountContentEnable":
                    if (IsDesc == "False")
                    {
                        ObjOrder = obj.OrderBy(a => a.CountContentEnable).ToList();
                    }
                    else
                    {
                        ObjOrder = obj.OrderByDescending(a => a.CountContentEnable).ToList();
                    }
                    break;
                case "CountContent":
                    if (IsDesc == "False")
                    {
                        ObjOrder = obj.OrderBy(a => a.CountContent).ToList();
                    }
                    else
                    {
                        ObjOrder = obj.OrderByDescending(a => a.CountContent).ToList();
                    }
                    break;
                case "CategoryLevel2_Status":
                    if (IsDesc == "False")
                    {
                        ObjOrder = obj.OrderBy(a => a.CategoryLevel2_Status).ToList();
                    }
                    else
                    {
                        ObjOrder = obj.OrderByDescending(a => a.CategoryLevel2_Status).ToList();
                    }
                    break;
                case "CategoryLevel2_ID":
                    if (IsDesc == "False")
                    {
                        ObjOrder = obj.OrderBy(a => a.CategoryLevel2_ID).ToList();
                    }
                    else
                    {
                        ObjOrder = obj.OrderByDescending(a => a.CategoryLevel2_ID).ToList();
                    }
                    break;
                case "CategoryLevel1_ViewCount":
                    if (IsDesc == "False")
                    {
                        ObjOrder = obj.OrderBy(a => a.CategoryLevel1_ViewCount).ToList();
                    }
                    else
                    {
                        ObjOrder = obj.OrderByDescending(a => a.CategoryLevel1_ViewCount).ToList();
                    }
                    break;
                case "CategoryLevel1_Type":
                    if (IsDesc == "False")
                    {
                        ObjOrder = obj.OrderBy(a => a.CategoryLevel1_Type).ToList();
                    }
                    else
                    {
                        ObjOrder = obj.OrderByDescending(a => a.CategoryLevel1_Type).ToList();
                    }
                    break;
                case "CategoryLevel1_Status":
                    if (IsDesc == "False")
                    {
                        ObjOrder = obj.OrderBy(a => a.CategoryLevel1_Status).ToList();
                    }
                    else
                    {
                        ObjOrder = obj.OrderByDescending(a => a.CategoryLevel1_Status).ToList();
                    }
                    break;
                case "CategoryLevel1_ID":
                    if (IsDesc == "False")
                    {
                        ObjOrder = obj.OrderBy(a => a.CategoryLevel1_ID).ToList();
                    }
                    else
                    {
                        ObjOrder = obj.OrderByDescending(a => a.CategoryLevel1_ID).ToList();
                    }
                    break;
                case "CategoryLevel1_CategoryLevel2_Disable":
                    if (IsDesc == "False")
                    {
                        ObjOrder = obj.OrderBy(a => a.CategoryLevel1_CategoryLevel2_Disable).ToList();
                    }
                    else
                    {
                        ObjOrder = obj.OrderByDescending(a => a.CategoryLevel1_CategoryLevel2_Disable).ToList();
                    }
                    break;
                default:
                    ObjOrder = obj;
                    break;
            }

            for (int i = 0; i < ObjOrder.Count; i++)
            {
                if ((TitleLenght > -1) & (ObjOrder[i].CategoryLevel1_CategoryNameLevel1.Length > TitleLenght))
                {
                    ObjOrder[i].CategoryLevel1_CategoryNameLevel1 = ObjOrder[i].CategoryLevel1_CategoryNameLevel1.Substring(0, TitleLenght - 1);
                }
                if ((InfoLenght > -1) & (ObjOrder[i].CategoryLevel1_Info.Length > InfoLenght))
                {
                    ObjOrder[i].CategoryLevel1_Info = ObjOrder[i].CategoryLevel1_Info.Substring(0, InfoLenght - 1);
                }
            }
            List<vw_CategoryLevel1ViewAll> ObjOrderLimit = new List<vw_CategoryLevel1ViewAll>();
            if ((Limit > -1) & (ObjOrder.Count > Limit))
            {
                ObjOrderLimit = ObjOrder.GetRange(0, Limit).ToList();
                _converter.DateTimeFormat = "dd/MM/yyyy";
                jSonString = JsonConvert.SerializeObject(ObjOrderLimit, _converter);
            }
            else
            {
                if (ObjOrder != null)
                {
                    _converter.DateTimeFormat = "dd/MM/yyyy";
                    jSonString = JsonConvert.SerializeObject(ObjOrder, _converter);
                }
            }
            jSonString = "{\"CategoryLevel1\":" + jSonString + "}";
            context.Response.Write(jSonString);
        }

        public void Sel_ByKeyCodeCategoryLevel1_ByIDLang(HttpContext context)   // Load ra danh sách các contact bằng IDLang
        {
            String jSonString = "";

            string KeyCodeCategoryLevel1 = context.Request.QueryString["KeyCodeCategoryLevel1"] != null && context.Request.QueryString["KeyCodeCategoryLevel1"] != "undefined" ? context.Request.QueryString["KeyCodeCategoryLevel1"] : "";
            int IDLang = string.IsNullOrEmpty(context.Request.QueryString["IDLang"]) == false && context.Request.QueryString["IDLang"] != "undefined" ? int.Parse(context.Request.QueryString["IDLang"]) : 1;

            int IntroLenght = context.Request.QueryString["IntroLenght"] != null && context.Request.QueryString["IntroLenght"] != "undefined" ? int.Parse(context.Request.QueryString["IntroLenght"]) : -1;
            int TitleLenght = context.Request.QueryString["TitleLenght"] != null && context.Request.QueryString["TitleLenght"] != "undefined" ? int.Parse(context.Request.QueryString["TitleLenght"]) : -1;
            int Limit = context.Request.QueryString["Limit"] != null && context.Request.QueryString["Limit"] != "undefined" ? int.Parse(context.Request.QueryString["Limit"]) : -1;
            string Order = context.Request.QueryString["Order"] != null && context.Request.QueryString["Order"] != "undefined" ? context.Request.QueryString["Order"] : "-1";
            string IsDesc = context.Request.QueryString["IsDesc"] != null && context.Request.QueryString["IsDesc"] != "undefined" ? context.Request.QueryString["IsDesc"] : "-1";

            CategoryLevel1BO aCategoryLevel1BO = new CategoryLevel1BO();
            List<vw_CategoryLevel1ViewAll> obj = aCategoryLevel1BO.Sel_ByKeyCodeCategoryLevel1_ByIDLang(KeyCodeCategoryLevel1, IDLang);
            List<vw_CategoryLevel1ViewAll> ObjOrder = new List<vw_CategoryLevel1ViewAll>();

            switch (Order)
            {
                case "CategoryLevel1_Code":
                    if (IsDesc == "False")
                    {
                        ObjOrder = obj.OrderBy(a => a.CategoryLevel1_Code).ToList();
                    }
                    else
                    {
                        ObjOrder = obj.OrderByDescending(a => a.CategoryLevel1_Code).ToList();
                    }
                    break;

                case "CategoryLevel2_Code":
                    if (IsDesc == "False")
                    {
                        ObjOrder = obj.OrderBy(a => a.CategoryLevel2_Code).ToList();
                    }
                    else
                    {
                        ObjOrder = obj.OrderByDescending(a => a.CategoryLevel2_Code).ToList();
                    }
                    break;

                case "CountContentDisable":
                    if (IsDesc == "False")
                    {
                        ObjOrder = obj.OrderBy(a => a.CountContentDisable).ToList();
                    }
                    else
                    {
                        ObjOrder = obj.OrderByDescending(a => a.CountContentDisable).ToList();
                    }
                    break;
                case "CountContentEnable":
                    if (IsDesc == "False")
                    {
                        ObjOrder = obj.OrderBy(a => a.CountContentEnable).ToList();
                    }
                    else
                    {
                        ObjOrder = obj.OrderByDescending(a => a.CountContentEnable).ToList();
                    }
                    break;
                case "CountContent":
                    if (IsDesc == "False")
                    {
                        ObjOrder = obj.OrderBy(a => a.CountContent).ToList();
                    }
                    else
                    {
                        ObjOrder = obj.OrderByDescending(a => a.CountContent).ToList();
                    }
                    break;
                case "CategoryLevel2_Status":
                    if (IsDesc == "False")
                    {
                        ObjOrder = obj.OrderBy(a => a.CategoryLevel2_Status).ToList();
                    }
                    else
                    {
                        ObjOrder = obj.OrderByDescending(a => a.CategoryLevel2_Status).ToList();
                    }
                    break;
                case "CategoryLevel2_ID":
                    if (IsDesc == "False")
                    {
                        ObjOrder = obj.OrderBy(a => a.CategoryLevel2_ID).ToList();
                    }
                    else
                    {
                        ObjOrder = obj.OrderByDescending(a => a.CategoryLevel2_ID).ToList();
                    }
                    break;
                case "CategoryLevel1_ViewCount":
                    if (IsDesc == "False")
                    {
                        ObjOrder = obj.OrderBy(a => a.CategoryLevel1_ViewCount).ToList();
                    }
                    else
                    {
                        ObjOrder = obj.OrderByDescending(a => a.CategoryLevel1_ViewCount).ToList();
                    }
                    break;
                case "CategoryLevel1_Type":
                    if (IsDesc == "False")
                    {
                        ObjOrder = obj.OrderBy(a => a.CategoryLevel1_Type).ToList();
                    }
                    else
                    {
                        ObjOrder = obj.OrderByDescending(a => a.CategoryLevel1_Type).ToList();
                    }
                    break;
                case "CategoryLevel1_Status":
                    if (IsDesc == "False")
                    {
                        ObjOrder = obj.OrderBy(a => a.CategoryLevel1_Status).ToList();
                    }
                    else
                    {
                        ObjOrder = obj.OrderByDescending(a => a.CategoryLevel1_Status).ToList();
                    }
                    break;
                case "CategoryLevel1_ID":
                    if (IsDesc == "False")
                    {
                        ObjOrder = obj.OrderBy(a => a.CategoryLevel1_ID).ToList();
                    }
                    else
                    {
                        ObjOrder = obj.OrderByDescending(a => a.CategoryLevel1_ID).ToList();
                    }
                    break;
                case "CategoryLevel1_CategoryLevel2_Disable":
                    if (IsDesc == "False")
                    {
                        ObjOrder = obj.OrderBy(a => a.CategoryLevel1_CategoryLevel2_Disable).ToList();
                    }
                    else
                    {
                        ObjOrder = obj.OrderByDescending(a => a.CategoryLevel1_CategoryLevel2_Disable).ToList();
                    }
                    break;
                default:
                    ObjOrder = obj;
                    break;
            }

            for (int i = 0; i < ObjOrder.Count; i++)
            {
                if ((TitleLenght > -1) & (ObjOrder[i].CategoryLevel1_CategoryNameLevel1.Length > TitleLenght))
                {
                    ObjOrder[i].CategoryLevel1_CategoryNameLevel1 = ObjOrder[i].CategoryLevel1_CategoryNameLevel1.Substring(0, TitleLenght - 1);
                }
                if ((IntroLenght > -1) & (ObjOrder[i].CategoryLevel1_Info.Length > IntroLenght))
                {
                    ObjOrder[i].CategoryLevel1_Info = ObjOrder[i].CategoryLevel1_Info.Substring(0, IntroLenght - 1);
                }
            }
            List<vw_CategoryLevel1ViewAll> ObjOrderLimit = new List<vw_CategoryLevel1ViewAll>();
            if ((Limit > -1) & (ObjOrder.Count > Limit))
            {
                ObjOrderLimit = ObjOrder.GetRange(0, Limit).ToList();
                _converter.DateTimeFormat = "dd/MM/yyyy";
                jSonString = JsonConvert.SerializeObject(ObjOrderLimit, _converter);
            }
            else
            {
                if (ObjOrder != null)
                {
                    _converter.DateTimeFormat = "dd/MM/yyyy";
                    jSonString = JsonConvert.SerializeObject(ObjOrder, _converter);
                }
            }
            jSonString = "{\"CategoryLevel1\":" + jSonString + "}";
            context.Response.Write(jSonString);
        }

        public void Sel_Ext_ByCode(HttpContext context)   // Load ra danh sách các contact bằng IDLang
        {

            String jSonString = "";

            string Code = context.Request.QueryString["Code"] != null && context.Request.QueryString["Code"] != "undefined" ? context.Request.QueryString["Code"] : "";
            int IDLang = context.Request.QueryString["IDLang"] != null && context.Request.QueryString["IDLang"] != "undefined" ? int.Parse(context.Request.QueryString["IDLang"]) : 1;

            int IntroLenght = context.Request.QueryString["IntroLenght"] != null && context.Request.QueryString["IntroLenght"] != "undefined" ? int.Parse(context.Request.QueryString["IntroLenght"]) : -1;
            int TitleLenght = context.Request.QueryString["TitleLenght"] != null && context.Request.QueryString["TitleLenght"] != "undefined" ? int.Parse(context.Request.QueryString["TitleLenght"]) : -1;
            int Limit = context.Request.QueryString["Limit"] != null && context.Request.QueryString["Limit"] != "undefined" ? int.Parse(context.Request.QueryString["Limit"]) : -1;
            string Order = context.Request.QueryString["Order"] != null && context.Request.QueryString["Order"] != "undefined" ? context.Request.QueryString["Order"] : "-1";
            string IsDesc = context.Request.QueryString["IsDesc"] != null && context.Request.QueryString["IsDesc"] != "undefined" ? context.Request.QueryString["IsDesc"] : "-1";

            CategoryLevel1BO aCategoryLevel1BO = new CategoryLevel1BO();
            List<vw_CategoryLevel1ViewAll> obj = aCategoryLevel1BO.Sel_Ext_ByCode(Code);

            List<vw_CategoryLevel1ViewAll> ObjOrder = new List<vw_CategoryLevel1ViewAll>();

            switch (Order)
            {
                case "CategoryLevel1_Code":
                    if (IsDesc == "False")
                    {
                        ObjOrder = obj.OrderBy(a => a.CategoryLevel1_Code).ToList();
                    }
                    else
                    {
                        ObjOrder = obj.OrderByDescending(a => a.CategoryLevel1_Code).ToList();
                    }
                    break;

                case "CategoryLevel2_Code":
                    if (IsDesc == "False")
                    {
                        ObjOrder = obj.OrderBy(a => a.CategoryLevel2_Code).ToList();
                    }
                    else
                    {
                        ObjOrder = obj.OrderByDescending(a => a.CategoryLevel2_Code).ToList();
                    }
                    break;

                case "CountContentDisable":
                    if (IsDesc == "False")
                    {
                        ObjOrder = obj.OrderBy(a => a.CountContentDisable).ToList();
                    }
                    else
                    {
                        ObjOrder = obj.OrderByDescending(a => a.CountContentDisable).ToList();
                    }
                    break;
                case "CountContentEnable":
                    if (IsDesc == "False")
                    {
                        ObjOrder = obj.OrderBy(a => a.CountContentEnable).ToList();
                    }
                    else
                    {
                        ObjOrder = obj.OrderByDescending(a => a.CountContentEnable).ToList();
                    }
                    break;
                case "CountContent":
                    if (IsDesc == "False")
                    {
                        ObjOrder = obj.OrderBy(a => a.CountContent).ToList();
                    }
                    else
                    {
                        ObjOrder = obj.OrderByDescending(a => a.CountContent).ToList();
                    }
                    break;
                case "CategoryLevel2_Status":
                    if (IsDesc == "False")
                    {
                        ObjOrder = obj.OrderBy(a => a.CategoryLevel2_Status).ToList();
                    }
                    else
                    {
                        ObjOrder = obj.OrderByDescending(a => a.CategoryLevel2_Status).ToList();
                    }
                    break;
                case "CategoryLevel2_ID":
                    if (IsDesc == "False")
                    {
                        ObjOrder = obj.OrderBy(a => a.CategoryLevel2_ID).ToList();
                    }
                    else
                    {
                        ObjOrder = obj.OrderByDescending(a => a.CategoryLevel2_ID).ToList();
                    }
                    break;
                case "CategoryLevel1_ViewCount":
                    if (IsDesc == "False")
                    {
                        ObjOrder = obj.OrderBy(a => a.CategoryLevel1_ViewCount).ToList();
                    }
                    else
                    {
                        ObjOrder = obj.OrderByDescending(a => a.CategoryLevel1_ViewCount).ToList();
                    }
                    break;
                case "CategoryLevel1_Type":
                    if (IsDesc == "False")
                    {
                        ObjOrder = obj.OrderBy(a => a.CategoryLevel1_Type).ToList();
                    }
                    else
                    {
                        ObjOrder = obj.OrderByDescending(a => a.CategoryLevel1_Type).ToList();
                    }
                    break;
                case "CategoryLevel1_Status":
                    if (IsDesc == "False")
                    {
                        ObjOrder = obj.OrderBy(a => a.CategoryLevel1_Status).ToList();
                    }
                    else
                    {
                        ObjOrder = obj.OrderByDescending(a => a.CategoryLevel1_Status).ToList();
                    }
                    break;
                case "CategoryLevel1_ID":
                    if (IsDesc == "False")
                    {
                        ObjOrder = obj.OrderBy(a => a.CategoryLevel1_ID).ToList();
                    }
                    else
                    {
                        ObjOrder = obj.OrderByDescending(a => a.CategoryLevel1_ID).ToList();
                    }
                    break;
                case "CategoryLevel1_CategoryLevel2_Disable":
                    if (IsDesc == "False")
                    {
                        ObjOrder = obj.OrderBy(a => a.CategoryLevel1_CategoryLevel2_Disable).ToList();
                    }
                    else
                    {
                        ObjOrder = obj.OrderByDescending(a => a.CategoryLevel1_CategoryLevel2_Disable).ToList();
                    }
                    break;
                default:
                    ObjOrder = obj;
                    break;
            }


            for (int i = 0; i < ObjOrder.Count; i++)
            {
                if ((TitleLenght > -1) & (ObjOrder[i].CategoryLevel1_CategoryNameLevel1.Length > TitleLenght))
                {
                    ObjOrder[i].CategoryLevel1_CategoryNameLevel1 = ObjOrder[i].CategoryLevel1_CategoryNameLevel1.Substring(0, TitleLenght - 1);
                }
                if ((IntroLenght > -1) & (ObjOrder[i].CategoryLevel1_Info.Length > IntroLenght))
                {
                    ObjOrder[i].CategoryLevel1_Info = ObjOrder[i].CategoryLevel1_Info.Substring(0, IntroLenght - 1);
                }
            }
            List<vw_CategoryLevel1ViewAll> ObjOrderLimit = new List<vw_CategoryLevel1ViewAll>();
            if ((Limit > -1) & (ObjOrder.Count > Limit))
            {
                ObjOrderLimit = ObjOrder.GetRange(0, Limit).ToList();
                _converter.DateTimeFormat = "dd/MM/yyyy";
                jSonString = JsonConvert.SerializeObject(ObjOrderLimit, _converter);
            }
            else
            {
                if (ObjOrder != null)
                {
                    _converter.DateTimeFormat = "dd/MM/yyyy";
                    jSonString = JsonConvert.SerializeObject(ObjOrder, _converter);
                }
            }
            jSonString = "{\"CategoryLevel1\":" + jSonString + "}";
            context.Response.Write(jSonString);
        }
        //=================================================================================================
    }
}
