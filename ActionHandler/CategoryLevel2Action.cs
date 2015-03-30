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
    public class CategoryLevel2Action : IAction
    {

        public void Do(HttpContext context)
        {
            string action = context.Request["action"].ToString();
            if (!String.IsNullOrEmpty(action))
            {
                switch (action)
                {

                    case "Sel_ByCode":
                        Sel_all_ByCode(context, CORE_Language.sys_NUM_LANG);
                        break;
                    case "Sel_ByIDLang":
                        Sel_ByIDLang(context, CORE_Language.sys_CUR_LANG);
                        break;
                    case "Upd_ByCode":
                        Upd_ByCode(context, CORE_Language.sys_NUM_LANG);
                        break;
                    case "Ins":
                        Ins(context, CORE_Language.sys_NUM_LANG);
                        break;

                   // case "Upd_Disable":
                     //   Upd_Disable(context);
                      //  break;
                    
                    case "Del_ByCode":
                        Del_ByCode(context);
                        break;

                    case "Sel_ViewAllContent":
                        Sel_ViewAllContent(context, CORE.CORE_Language.sys_CUR_LANG);
                        break;

                    //tqtrung
                    case "Sel_ByCodeCategoryLevel1_ByIDLang":
                        Sel_ByCodeCategoryLevel1_ByIDLang(context);
                        break;
                    default:
                        context.Response.Write("Can't find action");
                        break;
                }
            }
        }



        private IsoDateTimeConverter _converter = new IsoDateTimeConverter();

        public void Sel_ViewAllContent(HttpContext context, int IDLang)
        {
            string jSonString = "";
            string CodeCategoryLevel2 = !String.IsNullOrEmpty(context.Request.QueryString["CodeCategoryLevel2"]) ? Convert.ToString(context.Request.QueryString["CodeCategoryLevel2"]) : "";

            CategoryLevel2BO aCategoryLevel2BO = new CategoryLevel2BO();

         //   ViewAllContentEntity objViewAllContentEntity = aCategoryLevel2BO.GetViewAllContent(IDLang, CodeCategoryLevel2);

            /*
            if (objViewAllContentEntity != null)
            {
                _converter.DateTimeFormat = "dd/MM/yyyy";
                jSonString = JsonConvert.SerializeObject(objViewAllContentEntity, _converter);
            }
            */
            context.Response.Write(jSonString);
        }


        public void Sel_all_ByCode(HttpContext context, int NUM_LANG)
        {
            CategoryLevel2BO aCategoryLevel2BO = new CategoryLevel2BO();
            String jSonString = "";
          
           // string Code = aCategoryLevel2BO.Sel_ByCode(int.Parse(context.Request.QueryString["IDCategoryLevel2"])).Code;

           // List<CategoryLevel2> obj = aCategoryLevel2BO.Sel_all_ByCode(Code);
            /*for (int i = 0; i < NUM_LANG; i++)
            {
                obj[i].Info = HttpUtility.HtmlDecode(obj[i].Info);
                obj[i].Tag = HttpUtility.HtmlDecode(obj[i].Tag);
            }*/
            //if (obj != null)
            //{
            //    _converter.DateTimeFormat = "dd/MM/yyyy";

            //    jSonString = JsonConvert.SerializeObject(obj, _converter);
            //}


            jSonString = "{\"CategoryLevel2_Group\":" + jSonString + "}";
            context.Response.Write(jSonString);
        }

        public void Sel_ByIDLang(HttpContext context, int IDLang)
        {
            CategoryLevel2BO aCategoryLevel2BO = new CategoryLevel2BO();
            String jSonString = "";
            List<CategoryLevel2> obj = aCategoryLevel2BO.Sel_ByIDLang(IDLang);
            /*for (int i = 0; i < NUM_LANG; i++)
            {
                obj[i].Info = HttpUtility.HtmlDecode(obj[i].Info);
                obj[i].Tag = HttpUtility.HtmlDecode(obj[i].Tag);
            }*/
            if (obj != null)
            {
                _converter.DateTimeFormat = "dd/MM/yyyy";

                jSonString = JsonConvert.SerializeObject(obj, _converter);
            }
            jSonString = "{\"CategoryLevel2\":" + jSonString + "}";
            context.Response.Write(jSonString);
        }

        public void Ins(HttpContext context, int NUM_LANG)
        {
            int ret = -1;
            String jSonString = "";
            try
            {
                CategoryLevel2BO aCategoryLevel2BO = new CategoryLevel2BO();
                CategoryLevel2 aCategoryLevel2 = new CategoryLevel2();

                aCategoryLevel2.Status = !String.IsNullOrEmpty(context.Request.Form["txt_Status"]) ? Convert.ToInt32(context.Request.Form["txt_Status"]) : 0;
				
                aCategoryLevel2.Disable = !String.IsNullOrEmpty(context.Request.Form["txt_Disable"]) ? Convert.ToBoolean(context.Request.Form["txt_Disable"]) : false;
				
                aCategoryLevel2.Type = !String.IsNullOrEmpty(context.Request.Form["txt_Type"]) ? Convert.ToInt32(context.Request.Form["txt_Type"]) : 0;
                aCategoryLevel2.IDAlbum = !String.IsNullOrEmpty(context.Request.Form["txt_IDAlbum"]) ? Convert.ToInt32(context.Request.Form["txt_IDAlbum"]) : 0;
                aCategoryLevel2.Image = !String.IsNullOrEmpty(context.Request.Form["txt_Image_1"]) ? Convert.ToString(context.Request.Form["txt_Image"]) : "";
                aCategoryLevel2.Image1 = !String.IsNullOrEmpty(context.Request.Form["txt_Image_2"]) ? Convert.ToString(context.Request.Form["txt_Image1"]) : "";
                aCategoryLevel2.Image2 = !String.IsNullOrEmpty(context.Request.Form["txt_Image_3"]) ? Convert.ToString(context.Request.Form["txt_Image2"]) : "";
                aCategoryLevel2.Image3 = !String.IsNullOrEmpty(context.Request.Form["txt_Image_4"]) ? Convert.ToString(context.Request.Form["txt_Image3"]) : "";
                aCategoryLevel2.Tag = !String.IsNullOrEmpty(context.Request.Form["txt_Tag"]) ? Convert.ToString(context.Request.Form["txt_Tag"]) : "";
                aCategoryLevel2.Note = !String.IsNullOrEmpty(context.Request.Form["txt_Note"]) ? Convert.ToString(context.Request.Form["txt_Note"]) : "";
                aCategoryLevel2.Tag = !String.IsNullOrEmpty(context.Request.Form["txt_Tag"]) ? Convert.ToString(context.Request.Form["txt_Tag"]) : "";
                aCategoryLevel2.ViewCount = !String.IsNullOrEmpty(context.Request.Form["txt_ViewCount"]) ? Convert.ToInt32(context.Request.Form["txt_ViewCount"]) : 0;


                long a = DateTime.Now.Ticks;
                TimeSpan Codespan = new TimeSpan(a);
                aCategoryLevel2.Code = Math.Floor(Codespan.TotalSeconds).ToString();

                for (int i = 1; i <= NUM_LANG; i++)
                {
                    aCategoryLevel2.IDLang = !String.IsNullOrEmpty(context.Request.Form["IDLang_" + i]) ? Convert.ToInt32(context.Request.Form["IDLang_" + i]) : 0;
                    aCategoryLevel2.CategoryNameLevel2 = !String.IsNullOrEmpty(context.Request.Form["txt_CategoryNameLevel2_Lang" + i]) ? Convert.ToString(context.Request.Form["txt_CategoryNameLevel2_Lang" + i]) : "";
                    aCategoryLevel2.Info = !String.IsNullOrEmpty(context.Request.Form["txt_Info_Lang" + i]) ? Convert.ToString((context.Request.Form["txt_Info_Lang" + i])) : "";
                    aCategoryLevel2.Intro = !String.IsNullOrEmpty(context.Request.Form["txt_Intro_Lang" + i]) ? Convert.ToString((context.Request.Form["txt_Intro_Lang" + i])) : "";

                    ret = aCategoryLevel2BO.Ins(aCategoryLevel2);
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
                CategoryLevel2BO aCategoryLevel2BO = new CategoryLevel2BO();
                List<CategoryLevel2> aCategoryLevel2 = new List<CategoryLevel2>();
                String Code = aCategoryLevel2BO.Sel_ByID(int.Parse(context.Request.QueryString["IDCategoryLevel2"])).Code;

                aCategoryLevel2 = aCategoryLevel2BO.Sel_ByCode(Code);

                int LoopUpdate = 0;

                if (aCategoryLevel2.Count <= NUM_LANG)
                {
                    LoopUpdate = aCategoryLevel2.Count;


                    for (int i = 0; i < LoopUpdate; i++)
                    {

                        aCategoryLevel2[i].ID = aCategoryLevel2[i].ID;

                        aCategoryLevel2[i].Code = aCategoryLevel2[i].Code;
                        aCategoryLevel2[i].IDLang = aCategoryLevel2[i].IDLang;


                        aCategoryLevel2[i].Status = Convert.ToInt32(context.Request.Form["txt_Status"]);

                        aCategoryLevel2[i].Disable = Convert.ToBoolean(context.Request.Form["txt_Disable"]);

                        aCategoryLevel2[i].Type = Convert.ToInt32(context.Request.Form["txt_Type"]);
                        aCategoryLevel2[i].IDAlbum = Convert.ToInt32(context.Request.Form["txt_IDAlbum"]);
                        aCategoryLevel2[i].Image = Convert.ToString(context.Request.Form["txt_Image1"]);
                        aCategoryLevel2[i].Image1 = Convert.ToString(context.Request.Form["txt_Image2"]);
                        aCategoryLevel2[i].Image2 = Convert.ToString(context.Request.Form["txt_Image3"]);
                        aCategoryLevel2[i].Image3 = Convert.ToString(context.Request.Form["txt_Image4"]);
                        aCategoryLevel2[i].Tag = Convert.ToString(context.Request.Form["txt_Tag"]);
                        aCategoryLevel2[i].Note = Convert.ToString(context.Request.Form["txt_Note"]);

                        aCategoryLevel2[i].ViewCount = Convert.ToInt32(context.Request.Form["txt_ViewCount"]);


                        aCategoryLevel2[i].CategoryNameLevel2 = Convert.ToString(context.Request.Form["txt_CategoryNameLevel2_Lang" + (i + 1)]);
                        aCategoryLevel2[i].Info = Convert.ToString((context.Request.Form["txt_Info_Lang" + (i + 1)]));
                        aCategoryLevel2[i].Intro = Convert.ToString((context.Request.Form["txt_Intro_Lang" + (i + 1)]));


                        ret = aCategoryLevel2BO.Upd(aCategoryLevel2[i]);
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
        /*
        public void Upd_Disable(HttpContext context)
        {
            int ret = -1;
            String jSonString = "";
            try
            {
                CategoryLevel2BO aCategoryLevel2BO = new CategoryLevel2BO();
                List<CategoryLevel2> listCategoryLevel2 = new List<CategoryLevel2>();
               // string Code = aCategoryLevel2BO.Sel(int.Parse(context.Request.QueryString["IDCategoryLevel2"])).Code;
               // listCategoryLevel2 = aCategoryLevel2BO.Sel_all_ByCode(Code);
                for (int i = 0; i < listCategoryLevel2.Count; i++)
                {
                    listCategoryLevel2[i].Disable = true;
                    ret = aCategoryLevel2BO.Upd(listCategoryLevel2[i]);
                }

                // chuyển disable những nhóm tin cấp 1 trực thuộc 
                CategoryLevel1BO aCategoryLevel1BO = new CategoryLevel1BO();
                List<CategoryLevel1> listCategoryLevel1 = aCategoryLevel1BO.Sel().Where(p => p.CodeCategoryLevel2 == Code).ToList<CategoryLevel1>();
                for (int i = 0; i < listCategoryLevel1.Count; i++)
                {
                    listCategoryLevel1[i].Disable = true;
                    ret = aCategoryLevel1BO.Upd(listCategoryLevel1[i]);
                }
                //chuyển disable những tin tức trực thuộc
                ContentsBO aContentsBO = new ContentsBO();
                List<Contents> listContents = aContentsBO.Sel_all().Where(p => p.CodeCategoryLevel1 == listCategoryLevel1[0].Code).ToList<Contents>();
                for (int i = 0; i < listContents.Count; i++)
                {
                    listContents[i].Disable = true;
                    ret = aContentsBO.Upd(listContents[i]);
                }
                if (ret == 0)
                {
                    jSonString = "{\"status\":\"error|" + ret.ToString() + "\"}";

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
        */
        ////=================================================================================================

        public void Sel_ByCodeCategoryLevel1_ByIDLang(HttpContext context)
        {

            String jSonString = "";
            string CodeCategoryLevel1 = context.Request.QueryString["CodeCategoryLevel1"];
            //int IDLang = int.Parse(context.Request.QueryString["IDLang"]);
            int IDLang =1;
           
        
            CategoryLevel2BO aCategoryLevel2BO = new CategoryLevel2BO();
            List<CategoryLevel2> lstCategoryLevel2 = aCategoryLevel2BO.Sel_ByCodeCategoryLevel1_ByIDLang(CodeCategoryLevel1, 1).ToList();
            //obj.Info = HttpUtility.HtmlDecode(obj.Info);
            //obj.Tag = HttpUtility.HtmlDecode(obj.Tag);

            if (lstCategoryLevel2 != null)
            {
                _converter.DateTimeFormat = "dd/MM/yyyy";

                jSonString = JsonConvert.SerializeObject(lstCategoryLevel2, _converter);
            }
            jSonString = "{\"CategoryLevel2\":" + jSonString + "}";
            context.Response.Write(jSonString);
        }

        //public void Sel(HttpContext context)
        //{

        //    String jSonString = "";
        //    int IDCategoryLevel2 = Convert.ToInt32(context.Request.QueryString["IDCategoryLevel2"]);

        //    CategoryLevel2BO aCategoryLevel2BO = new CategoryLevel2BO();
        //    CategoryLevel2 obj = aCategoryLevel2BO.Sel(IDCategoryLevel2);
        //    //obj.Info = HttpUtility.HtmlDecode(obj.Info);
        //    //obj.Tag = HttpUtility.HtmlDecode(obj.Tag);

        //    if (obj != null)
        //    {
        //        _converter.DateTimeFormat = "dd/MM/yyyy";
                
        //        jSonString = JsonConvert.SerializeObject(obj, _converter);
        //    }
        //    jSonString = "{\"CategoryLevel2\":" + jSonString + "}";
        //    context.Response.Write(jSonString);
        //}

        //public void Del(HttpContext context)
        //{

        //    String jSonString = "";
        //    //int IDCategoryLevel2 = Convert.ToInt32(context.Request.QueryString["IDCategoryLevel2"]);

        //    //CategoryLevel2BO aCategoryLevel2BO = new CategoryLevel2BO();
        //    int ret = 1; //aCategoryLevel2BO.Del(IDCategoryLevel2);

        //    if (ret != 0)
        //    { jSonString = "{\"status\": \"success\"}"; }

        //    if (ret == 0)
        //    {jSonString = "{\"status\":\"error|" + ret.ToString() + "\"}"; }


        //    context.Response.Write(jSonString);
        //}

        public void Del_ByCode(HttpContext context)
        {
            int ret;
            String jSonString = "";
            CategoryLevel2BO aCategoryLevel2BO = new CategoryLevel2BO();
            string Code = aCategoryLevel2BO.Sel_ByID(int.Parse(context.Request.QueryString["IDCategoryLevel2"])).Code;


            ret = aCategoryLevel2BO.Del_ByCode(Code);

            if (ret != 0)
            
            { jSonString = "{\"status\": \"success\"}"; }

            if (ret == 0)
            { jSonString = "{\"status\":\"error|" + ret.ToString() + "\"}"; }
            

            context.Response.Write(jSonString);
        }
    }
}
