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
    public class FilesAction : IAction
    {

        public void Do(HttpContext context)
        {
            string action = context.Request["action"].ToString();
            if (!String.IsNullOrEmpty(action))
            {
                switch (action)
                {



                    case "Sel_ByCodeAlbum_ByIDLang":
                        Sel_ByCodeAlbum_ByIDLang(context, CORE_Language.sys_CUR_LANG);
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
                    
                    case "Sel_Files_ByCodeAlbums":

                        Sel_Files_ByCodeAlbums(context, CORE_Language.sys_CUR_LANG);
                        break;
                   
                    case "Sel_File_ByCodeContents":

                        Sel_File_ByCodeContents(context, CORE_Language.sys_CUR_LANG);
                        break;

                   
                    default:
                        context.Response.Write("Can't find action");
                        break;
                }
            }
        }

        private IsoDateTimeConverter _converter = new IsoDateTimeConverter();
        IFormatProvider culture = new CultureInfo("es-ES", true);
        private void Sel_File_ByCodeContents(HttpContext context, int IDLang)
        {

            String jSonString = "";

            string CodeContents = context.Request.QueryString["CodeContents"];

            ContentsBO aContentsBO = new ContentsBO();
            //List<Contents> aListContents = aContentsBO.Sel_all_ByIDLang(IDLang).Where(p => p.Code == CodeContents).ToList();
            //string[] arrImageName = new string[0];
            //List<Files> obj = new List<Files>();

            //if (aListContents.Count > 0)
            //{
            //    int? IDAlbum = aListContents[0].IDAlbum;
            //    AlbumsBO aAlbumBO = new AlbumsBO();
            //    Albums aAlbums = new Albums();
            //    aAlbums = aAlbumBO.Sel(IDAlbum.GetValueOrDefault(0));
            //    if (aAlbums != null)
            //    {
            //        string CodeAlbums = aAlbumBO.Sel(IDAlbum.GetValueOrDefault(0)).Code;
            //        FilesBO aFilesBO = new FilesBO();
            //        obj = aFilesBO.Sel_all_ByIDLang(IDLang).Where(p => p.CodeAlbums == CodeAlbums).ToList();
            //        arrImageName = new string[obj.Count];

            //        for (int ii = 0; ii < obj.Count; ii++)
            //        {
            //            arrImageName[ii] = obj[ii].Image;
            //        }
            //    }
            //    if (obj != null)
            //    {
            //        _converter.DateTimeFormat = "dd/MM/yyyy";

            //        jSonString = JsonConvert.SerializeObject(arrImageName, _converter);
            //    }
            //    jSonString = "{\"Files\":" + jSonString + "}";
            //    context.Response.Write(jSonString);

            //}
            //else
            //{
            //    jSonString = "{\"Files\":" + jSonString + "}";
            //    context.Response.Write(jSonString);
            //}


            context.Response.Write(jSonString);
        }
       
        //tqtrung
      //  private IsoDateTimeConverter _converter = new IsoDateTimeConverter();
        public void Sel_ByCodeAlbum_ByIDLang(HttpContext context, int IDLang)
        {
            try
            {
                List<FilesExt> aListFiles = new List<FilesExt>();
                FilesBO aFilesBO = new FilesBO();
                List<vw_FilesViewAll> aListvw_FilesViewAll = new List<vw_FilesViewAll>();

                String jSonString = "";
                string CodeAlbum = context.Request.QueryString["CodeAlbum"];
                IDLang = int.Parse(context.Request.QueryString["IDLang"]);
                int IntroLenght = context.Request.QueryString["IntroLenght"] != null && context.Request.QueryString["IntroLenght"] != "undefined" ? int.Parse(context.Request.QueryString["IntroLenght"]) : -1;
                int TitleLenght = context.Request.QueryString["TitleLenght"] != null && context.Request.QueryString["TitleLenght"] != "undefined" ? int.Parse(context.Request.QueryString["TitleLenght"]) : -1;


                aListvw_FilesViewAll = aFilesBO.Sel_Ext_ByCodeAlbum_ByIDLang(CodeAlbum,IDLang);

                //if (aListFiles != null)
                //{
                //    for (int i = 0; i < aListFiles.Count; i++)
                //    {
                //        if ((TitleLenght > -1) & (aListFiles[i].Title.Length > TitleLenght))
                //        {
                //            aListFiles[i].Title = aListFiles[i].Title.Substring(0, TitleLenght - 1);
                //        }
                //        if ((IntroLenght > -1) & (aListFiles[i].Intro.Length > IntroLenght))
                //        {
                //            aListFiles[i].Intro = aListFiles[i].Intro.Substring(0, IntroLenght - 1);
                //        }
                //    }
                //}
                _converter.DateTimeFormat = "dd/MM/yyyy";
                jSonString = JsonConvert.SerializeObject(aListvw_FilesViewAll, _converter);
                jSonString = "{\"Files\":" + jSonString + "}";
                context.Response.Write(jSonString);

            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("FilesAction.Sel_ByCodeAlbum: {0}", ex.Message));
            }
        }
           
            private void Sel_Files_ByCodeAlbums(HttpContext context, int IDLang)
            {

                String jSonString = "";

                string CodeAlbums = context.Request.QueryString["CodeAlbums"];

                FilesBO aFilesBO = new FilesBO();
                List<Files> aListFiles = aFilesBO.Sel_ByIDLang(IDLang).Where(p => p.CodeAlbums == CodeAlbums).ToList();
                if (aListFiles.Count > 0)
                {
                    List<Files> obj = aFilesBO.Sel_ByIDLang(IDLang).Where(p => p.CodeAlbums == CodeAlbums).ToList();

                    if (obj != null)
                    {
                        _converter.DateTimeFormat = "dd/MM/yyyy";

                        jSonString = JsonConvert.SerializeObject(obj, _converter);
                    }
                    jSonString = "{\"total\":" + obj.Count + ",\"file\":" + jSonString + "}";

                }
                else
                {
                    jSonString = "{\"total\":0,\"file\":" + jSonString + "}";
                }


                context.Response.Write(jSonString);
            }


            

            public void Ins(HttpContext context, int NUM_LANG)
            {
                int ret = -1;
                String jSonString = "";
                try
                {
                    Files aFiles = new Files();


                    aFiles.CodeAlbums = !String.IsNullOrEmpty(context.Request.Form["txt_CodeAlbums"]) ? Convert.ToString(context.Request.Form["txt_CodeAlbums"]) : "";

                    aFiles.Image = !String.IsNullOrEmpty(context.Request.Form["txt_Image_1"]) ? Convert.ToString(context.Request.Form["txt_Image_1"]) : "";

                    aFiles.UploadDate = !String.IsNullOrEmpty(context.Request.Form["txt_UploadDate"]) ? DateTime.ParseExact(context.Request.Form["txt_UploadDate"], "dd/MM/yyyy", culture) : DateTime.Now;

                    aFiles.CreateByIDUser = !String.IsNullOrEmpty(context.Request.Form["txt_CreateByIDUser"]) ? Convert.ToInt64(context.Request.Form["txt_CreateByIDUser"]) : 1;

                    aFiles.Status = !String.IsNullOrEmpty(context.Request.Form["txt_Status"]) ? Convert.ToInt32(context.Request.Form["txt_Status"]) :0;

                    aFiles.Type = !String.IsNullOrEmpty(context.Request.Form["txt_Type"]) ? Convert.ToInt32(context.Request.Form["txt_Type"]) : 0;

                    aFiles.Disable = !String.IsNullOrEmpty(context.Request.Form["txt_Disable"]) ? Convert.ToBoolean(context.Request.Form["txt_Disable"]) :false;

                    aFiles.Width = !String.IsNullOrEmpty(context.Request.Form["txt_Width"]) ? Convert.ToInt32(context.Request.Form["txt_Width"]) : 0;

                    aFiles.Height = !String.IsNullOrEmpty(context.Request.Form["txt_Height"]) ? Convert.ToInt32(context.Request.Form["txt_Height"]) : 0;

                    long a = DateTime.Now.Ticks;
                    TimeSpan Codespan = new TimeSpan(a);
                    aFiles.Code = Math.Floor(Codespan.TotalSeconds).ToString();

                    for (int i = 1; i <= NUM_LANG; i++)
                    {
                        aFiles.IDLang = !String.IsNullOrEmpty(context.Request.Form["IDLang_" + i]) ? Convert.ToInt32(context.Request.Form["IDLang_" + i]) : 0;
                      //aFiles.Intro = !String.IsNullOrEmpty(context.Request.Form["txt_Intro_Lang" + i]) ? Convert.ToString(HttpUtility.HtmlEncode(context.Request.Form["txt_Intro_Lang" + i])) : "";

                      aFiles.Info = !String.IsNullOrEmpty(context.Request.Form["txt_Info_Lang" + i]) ? Convert.ToString(HttpUtility.HtmlEncode(context.Request.Form["txt_Info_Lang" + i])) : "";
                      FilesBO aFilesBO = new FilesBO();
                      ret = aFilesBO.Ins(aFiles);
                        if (ret == 0)
                        {
                            jSonString = "{\"status\":\"error|" + ret.ToString() + "\"}";
                            break;
                        }

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
                    List<Files> aFiles = new List<Files>();
                    FilesBO aFilesBO = new FilesBO();
                    String Code = aFilesBO.Sel_ByID(int.Parse(context.Request.QueryString["IDFiles"])).Code;

                    aFiles = aFilesBO.Sel_ByCode(Code);

                    int LoopUpdate = 0;

                    if (aFiles.Count <= NUM_LANG)
                    {
                        LoopUpdate = aFiles.Count;
                        for (int i = 0; i < LoopUpdate; i++)
                        {

                            aFiles[i].ID = aFiles[i].ID;

                            aFiles[i].Code = aFiles[i].Code;
                            aFiles[i].IDLang = aFiles[i].IDLang;


                            aFiles[i].CodeAlbums = !String.IsNullOrEmpty(context.Request.Form["txt_CodeAlbums"]) ? Convert.ToString(context.Request.Form["txt_CodeAlbums"]) : aFiles[i].CodeAlbums;

                            aFiles[i].Image = !String.IsNullOrEmpty(context.Request.Form["txt_Image"]) ? Convert.ToString(context.Request.Form["txt_Image"]) : aFiles[i].Image;

                            aFiles[i].Info = !String.IsNullOrEmpty(context.Request.Form["txt_Info_Lang" + (i + 1)]) ? Convert.ToString(context.Request.Form["txt_Info_Lang" + (i + 1)]) : aFiles[i].Info;

                            aFiles[i].Intro = !String.IsNullOrEmpty(context.Request.Form["txt_Intro_Lang" + (i + 1)]) ? Convert.ToString(context.Request.Form["txt_Intro_Lang" + (i + 1)]) : aFiles[i].Intro;

                            aFiles[i].Title = !String.IsNullOrEmpty(context.Request.Form["txt_Title_Lang" + (i + 1)]) ? Convert.ToString(context.Request.Form["txt_Title_Lang" + (i + 1)]) : aFiles[i].Title;


                            aFiles[i].UploadDate = !String.IsNullOrEmpty(context.Request.Form["txt_UploadDate"]) ? DateTime.ParseExact(context.Request.Form["txt_UploadDate"], "dd/MM/yyyy", culture) : aFiles[i].UploadDate;

                            aFiles[i].CreateByIDUser = !String.IsNullOrEmpty(context.Request.Form["txt_CreateByIDUser"]) ? Convert.ToInt64(context.Request.Form["txt_CreateByIDUser"]) : aFiles[i].CreateByIDUser;

                            aFiles[i].Status = !String.IsNullOrEmpty(context.Request.Form["txt_Status"]) ? Convert.ToInt32(context.Request.Form["txt_Status"]) : aFiles[i].Status;

                            aFiles[i].Type = !String.IsNullOrEmpty(context.Request.Form["txt_Type"]) ? Convert.ToInt32(context.Request.Form["txt_Type"]) : aFiles[i].Type;

                            aFiles[i].Disable = !String.IsNullOrEmpty(context.Request.Form["txt_Disable"]) ? Convert.ToBoolean(context.Request.Form["txt_Disable"]) : aFiles[i].Disable;

                            aFiles[i].Width = !String.IsNullOrEmpty(context.Request.Form["txt_Width"]) ? Convert.ToInt32(context.Request.Form["txt_Width"]) : aFiles[i].Width;

                            aFiles[i].Height = !String.IsNullOrEmpty(context.Request.Form["txt_Height"]) ? Convert.ToInt32(context.Request.Form["txt_Height"]) : aFiles[i].Height;

                            aFiles[i].Code = !String.IsNullOrEmpty(context.Request.Form["txt_Code"]) ? Convert.ToString(context.Request.Form["txt_Code"]) : aFiles[i].Code;

                            aFiles[i].IDLang = !String.IsNullOrEmpty(context.Request.Form["txt_IDLang"]) ? Convert.ToInt32(context.Request.Form["txt_IDLang"]) : aFiles[i].IDLang;



                            ret = aFilesBO.Upd(aFiles[i]);
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
                    FilesBO aFilesBO = new FilesBO();
                    Files aFiles = new Files();
                    int IDFiles = Convert.ToInt32(context.Request.QueryString["IDFiles"]);
                    aFiles = aFilesBO.Sel_ByID(IDFiles);

                    aFiles.Disable = true;

                    ret = aFilesBO.Upd(aFiles);
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

            //public void Sel_ByCode_ByIDLang(HttpContext context)
            //{

            //    String jSonString = "";
            //    string Code = context.Request.QueryString["Code"];
            //    int IDLang = int.Parse(context.Request.QueryString["IDLang"]);
            //    FilesBO aFilesBO = new FilesBO();
            //    Files obj = aFilesBO.Sel_ByCode_ByIDLang(Code, IDLang);
            //    //obj.Info = HttpUtility.HtmlDecode(obj.Info);
            //    //obj.Intro = HttpUtility.HtmlDecode(obj.Intro);

            //    if (obj != null)
            //    {
            //        _converter.DateTimeFormat = "dd/MM/yyyy";

            //        jSonString = JsonConvert.SerializeObject(obj, _converter);
            //    }
            //    jSonString = "{\"Files\":" + jSonString + "}";
            //    context.Response.Write(jSonString);
            //}

            //public void Sel(HttpContext context)
            //{

            //    String jSonString = "";
            //    int IDFiles = Convert.ToInt32(context.Request.QueryString["IDFiles"]);

            //    FilesBO aFilesBO = new FilesBO();
            //    Files obj = aFilesBO.Sel(IDFiles);
            //    //obj.Info = HttpUtility.HtmlDecode(obj.Info);
            //    //obj.Intro = HttpUtility.HtmlDecode(obj.Intro);

            //    if (obj != null)
            //    {
            //        _converter.DateTimeFormat = "dd/MM/yyyy";

            //        jSonString = JsonConvert.SerializeObject(obj, _converter);
            //    }
            //    jSonString = "{\"Files\":" + jSonString + "}";
            //    context.Response.Write(jSonString);
            //}

            //public void Del_ByCode(HttpContext context)
            //{

            //    String jSonString = "";
            //    int IDFiles = Convert.ToInt32(context.Request.QueryString["IDFiles"]);

            //    string Code = context.Request.QueryString["Code"];
            //    FilesBO aFilesBO = new FilesBO();
            //    int ret = aFilesBO.Del_ByCode(Code);


            //    if (ret > 0)
            //    { jSonString = "{\"status\": \"success\"}"; }

            //    if (ret == 0)
            //    {jSonString = "{\"status\":\"error|" + ret.ToString() + "\"}"; }


            //    context.Response.Write(jSonString);
            //}

            public void Del_ByCode(HttpContext context)
            {
                FilesBO aFilesBO = new FilesBO();
                String jSonString = "";
                String Code = aFilesBO.Sel_ByID(int.Parse(context.Request.QueryString["IDFiles"])).Code;
                int ret = aFilesBO.Del_ByCode(Code);


                if (ret >0)
                { jSonString = "{\"status\": \"success\"}"; }

                if (ret == 0)
                { jSonString = "{\"status\":\"error|" + ret.ToString() + "\"}"; }


                context.Response.Write(jSonString);
            }

            ////=================================================================================================
            ////=================================================================================================
            ////=================================================================================================

            //public void SelectListFiles_ByCodeAlbums_001(HttpContext context, int IDLang)
            //{

            //    String jSonString = "";


            //    int IntroLenght = context.Request.QueryString["IntroLenght"] != null && context.Request.QueryString["IntroLenght"] != "undefined" ? int.Parse(context.Request.QueryString["IntroLenght"]) : -1;
            //    int TitleLenght = context.Request.QueryString["TitleLenght"] != null && context.Request.QueryString["TitleLenght"] != "undefined" ? int.Parse(context.Request.QueryString["TitleLenght"]) : -1;

            //    FilesBO aFilesBO = new FilesBO();
            //    List<FilesExt> ListFiles = aFilesBO.SelectListFiles_ByCodeAlbums_001 (IDLang);

            //    if (ListFiles != null)
            //    {
            //        for (int i = 0; i < ListFiles.Count; i++)
            //        {
            //            if ((TitleLenght > -1) & (ListFiles[i].Title.Length > TitleLenght))
            //            {
            //                ListFiles[i].Title = ListFiles[i].Title.Substring(0, TitleLenght - 1);
            //            }
            //            if ((IntroLenght > -1) & (ListFiles[i].Intro.Length > IntroLenght))
            //            {
            //                ListFiles[i].Intro = ListFiles[i].Intro.Substring(0, IntroLenght - 1);
            //            }
            //        }
            //    }
            //    _converter.DateTimeFormat = "dd/MM/yyyy";
            //    jSonString = JsonConvert.SerializeObject(ListFiles, _converter);
            //    jSonString = "{\"Files\":" + jSonString + "}";
            //    context.Response.Write(jSonString);
            //}
            //public void SelectListFiles_ByCodeAlbums_002(HttpContext context, int IDLang)
            //{


            //    String jSonString = "";


            //    int IntroLenght = context.Request.QueryString["IntroLenght"] != null && context.Request.QueryString["IntroLenght"] != "undefined" ? int.Parse(context.Request.QueryString["IntroLenght"]) : -1;
            //    int TitleLenght = context.Request.QueryString["TitleLenght"] != null && context.Request.QueryString["TitleLenght"] != "undefined" ? int.Parse(context.Request.QueryString["TitleLenght"]) : -1;

            //    FilesBO aFilesBO = new FilesBO();
            //    List<FilesExt> ListFiles = aFilesBO.SelectListFiles_ByCodeAlbums_002(IDLang);

            //    if (ListFiles != null)
            //    {
            //        for (int i = 0; i < ListFiles.Count; i++)
            //        {
            //            if ((TitleLenght > -1) & (ListFiles[i].Title.Length > TitleLenght))
            //            {
            //                ListFiles[i].Title = ListFiles[i].Title.Substring(0, TitleLenght - 1);
            //            }
            //            if ((IntroLenght > -1) & (ListFiles[i].Intro.Length > IntroLenght))
            //            {
            //                ListFiles[i].Intro = ListFiles[i].Intro.Substring(0, IntroLenght - 1);
            //            }
            //        }
            //    }
            //    _converter.DateTimeFormat = "dd/MM/yyyy";
            //    jSonString = JsonConvert.SerializeObject(ListFiles, _converter);
            //    jSonString = "{\"Files\":" + jSonString + "}";
            //    context.Response.Write(jSonString);
            //}
            //public void SelectListFiles_ByCodeAlbums_003(HttpContext context, int IDLang)
            //{

            //    String jSonString = "";


            //    int IntroLenght = context.Request.QueryString["IntroLenght"] != null && context.Request.QueryString["IntroLenght"] != "undefined" ? int.Parse(context.Request.QueryString["IntroLenght"]) : -1;
            //    int TitleLenght = context.Request.QueryString["TitleLenght"] != null && context.Request.QueryString["TitleLenght"] != "undefined" ? int.Parse(context.Request.QueryString["TitleLenght"]) : -1;

            //    FilesBO aFilesBO = new FilesBO();
            //    List<FilesExt> ListFiles = aFilesBO.SelectListFiles_ByCodeAlbums_003(IDLang);

            //    if (ListFiles != null)
            //    {
            //        for (int i = 0; i < ListFiles.Count; i++)
            //        {
            //            if ((TitleLenght > -1) & (ListFiles[i].Title.Length > TitleLenght))
            //            {
            //                ListFiles[i].Title = ListFiles[i].Title.Substring(0, TitleLenght - 1);
            //            }
            //            if ((IntroLenght > -1) & (ListFiles[i].Intro.Length > IntroLenght))
            //            {
            //                ListFiles[i].Intro = ListFiles[i].Intro.Substring(0, IntroLenght - 1);
            //            }
            //        }
            //    }
            //    _converter.DateTimeFormat = "dd/MM/yyyy";
            //    jSonString = JsonConvert.SerializeObject(ListFiles, _converter);
            //    jSonString = "{\"Files\":" + jSonString + "}";
            //    context.Response.Write(jSonString);
            //}
            //public void SelectListFiles_ByCodeAlbums_004(HttpContext context, int IDLang)
            //{


            //    String jSonString = "";


            //    int IntroLenght = context.Request.QueryString["IntroLenght"] != null && context.Request.QueryString["IntroLenght"] != "undefined" ? int.Parse(context.Request.QueryString["IntroLenght"]) : -1;
            //    int TitleLenght = context.Request.QueryString["TitleLenght"] != null && context.Request.QueryString["TitleLenght"] != "undefined" ? int.Parse(context.Request.QueryString["TitleLenght"]) : -1;

            //    FilesBO aFilesBO = new FilesBO();
            //    List<FilesExt> ListFiles = aFilesBO.SelectListFiles_ByCodeAlbums_004(IDLang);

            //    if (ListFiles != null)
            //    {
            //        for (int i = 0; i < ListFiles.Count; i++)
            //        {
            //            if ((TitleLenght > -1) & (ListFiles[i].Title.Length > TitleLenght))
            //            {
            //                ListFiles[i].Title = ListFiles[i].Title.Substring(0, TitleLenght - 1);
            //            }
            //            if ((IntroLenght > -1) & (ListFiles[i].Intro.Length > IntroLenght))
            //            {
            //                ListFiles[i].Intro = ListFiles[i].Intro.Substring(0, IntroLenght - 1);
            //            }
            //        }
            //    }
            //    _converter.DateTimeFormat = "dd/MM/yyyy";
            //    jSonString = JsonConvert.SerializeObject(ListFiles, _converter);
            //    jSonString = "{\"Files\":" + jSonString + "}";
            //    context.Response.Write(jSonString);
            //}
            //public void SelectListFiles_ByCodeAlbums_005(HttpContext context, int IDLang)
            //{


            //    String jSonString = "";


            //    int IntroLenght = context.Request.QueryString["IntroLenght"] != null && context.Request.QueryString["IntroLenght"] != "undefined" ? int.Parse(context.Request.QueryString["IntroLenght"]) : -1;
            //    int TitleLenght = context.Request.QueryString["TitleLenght"] != null && context.Request.QueryString["TitleLenght"] != "undefined" ? int.Parse(context.Request.QueryString["TitleLenght"]) : -1;

            //    FilesBO aFilesBO = new FilesBO();
            //    List<FilesExt> ListFiles = aFilesBO.SelectListFiles_ByCodeAlbums_005(IDLang);

            //    if (ListFiles != null)
            //    {
            //        for (int i = 0; i < ListFiles.Count; i++)
            //        {
            //            if ((TitleLenght > -1) & (ListFiles[i].Title.Length > TitleLenght))
            //            {
            //                ListFiles[i].Title = ListFiles[i].Title.Substring(0, TitleLenght - 1);
            //            }
            //            if ((IntroLenght > -1) & (ListFiles[i].Intro.Length > IntroLenght))
            //            {
            //                ListFiles[i].Intro = ListFiles[i].Intro.Substring(0, IntroLenght - 1);
            //            }
            //        }
            //    }
            //    _converter.DateTimeFormat = "dd/MM/yyyy";
            //    jSonString = JsonConvert.SerializeObject(ListFiles, _converter);
            //    jSonString = "{\"Files\":" + jSonString + "}";
            //    context.Response.Write(jSonString);
            //}
            //public void SelectListFiles_ByCodeAlbums_006(HttpContext context, int IDLang)
            //{


            //    String jSonString = "";


            //    int IntroLenght = context.Request.QueryString["IntroLenght"] != null && context.Request.QueryString["IntroLenght"] != "undefined" ? int.Parse(context.Request.QueryString["IntroLenght"]) : -1;
            //    int TitleLenght = context.Request.QueryString["TitleLenght"] != null && context.Request.QueryString["TitleLenght"] != "undefined" ? int.Parse(context.Request.QueryString["TitleLenght"]) : -1;

            //    FilesBO aFilesBO = new FilesBO();
            //    List<FilesExt> ListFiles = aFilesBO.SelectListFiles_ByCodeAlbums_006(IDLang);

            //    if (ListFiles != null)
            //    {
            //        for (int i = 0; i < ListFiles.Count; i++)
            //        {
            //            if ((TitleLenght > -1) & (ListFiles[i].Title.Length > TitleLenght))
            //            {
            //                ListFiles[i].Title = ListFiles[i].Title.Substring(0, TitleLenght - 1);
            //            }
            //            if ((IntroLenght > -1) & (ListFiles[i].Intro.Length > IntroLenght))
            //            {
            //                ListFiles[i].Intro = ListFiles[i].Intro.Substring(0, IntroLenght - 1);
            //            }
            //        }
            //    }
            //    _converter.DateTimeFormat = "dd/MM/yyyy";
            //    jSonString = JsonConvert.SerializeObject(ListFiles, _converter);
            //    jSonString = "{\"Files\":" + jSonString + "}";
            //    context.Response.Write(jSonString);
            //}
            //public void SelectListFiles_ByCodeAlbums_007(HttpContext context, int IDLang)
            //{

            //    String jSonString = "";


            //    int IntroLenght = context.Request.QueryString["IntroLenght"] != null && context.Request.QueryString["IntroLenght"] != "undefined" ? int.Parse(context.Request.QueryString["IntroLenght"]) : -1;
            //    int TitleLenght = context.Request.QueryString["TitleLenght"] != null && context.Request.QueryString["TitleLenght"] != "undefined" ? int.Parse(context.Request.QueryString["TitleLenght"]) : -1;

            //    FilesBO aFilesBO = new FilesBO();
            //    List<FilesExt> ListFiles = aFilesBO.SelectListFiles_ByCodeAlbums_007(IDLang);

            //    if (ListFiles != null)
            //    {
            //        for (int i = 0; i < ListFiles.Count; i++)
            //        {
            //            if ((TitleLenght > -1) & (ListFiles[i].Title.Length > TitleLenght))
            //            {
            //                ListFiles[i].Title = ListFiles[i].Title.Substring(0, TitleLenght - 1);
            //            }
            //            if ((IntroLenght > -1) & (ListFiles[i].Intro.Length > IntroLenght))
            //            {
            //                ListFiles[i].Intro = ListFiles[i].Intro.Substring(0, IntroLenght - 1);
            //            }
            //        }
            //    }
            //    _converter.DateTimeFormat = "dd/MM/yyyy";
            //    jSonString = JsonConvert.SerializeObject(ListFiles, _converter);
            //    jSonString = "{\"Files\":" + jSonString + "}";
            //    context.Response.Write(jSonString);
            //}
            //public void SelectListFiles_ByCodeAlbums_008(HttpContext context, int IDLang)
            //{

            //    String jSonString = "";


            //    int IntroLenght = context.Request.QueryString["IntroLenght"] != null && context.Request.QueryString["IntroLenght"] != "undefined" ? int.Parse(context.Request.QueryString["IntroLenght"]) : -1;
            //    int TitleLenght = context.Request.QueryString["TitleLenght"] != null && context.Request.QueryString["TitleLenght"] != "undefined" ? int.Parse(context.Request.QueryString["TitleLenght"]) : -1;

            //    FilesBO aFilesBO = new FilesBO();
            //    List<FilesExt> ListFiles = aFilesBO.SelectListFiles_ByCodeAlbums_001(IDLang);

            //    if (ListFiles != null)
            //    {
            //        for (int i = 0; i < ListFiles.Count; i++)
            //        {
            //            if ((TitleLenght > -1) & (ListFiles[i].Title.Length > TitleLenght))
            //            {
            //                ListFiles[i].Title = ListFiles[i].Title.Substring(0, TitleLenght - 1);
            //            }
            //            if ((IntroLenght > -1) & (ListFiles[i].Intro.Length > IntroLenght))
            //            {
            //                ListFiles[i].Intro = ListFiles[i].Intro.Substring(0, IntroLenght - 1);
            //            }
            //        }
            //    }
            //    _converter.DateTimeFormat = "dd/MM/yyyy";
            //    jSonString = JsonConvert.SerializeObject(ListFiles, _converter);
            //    jSonString = "{\"Files\":" + jSonString + "}";
            //    context.Response.Write(jSonString);
            //}
            //public void SelectListFiles_ByCodeAlbums_009(HttpContext context, int IDLang)
            //{


            //    String jSonString = "";


            //    int IntroLenght = context.Request.QueryString["IntroLenght"] != null && context.Request.QueryString["IntroLenght"] != "undefined" ? int.Parse(context.Request.QueryString["IntroLenght"]) : -1;
            //    int TitleLenght = context.Request.QueryString["TitleLenght"] != null && context.Request.QueryString["TitleLenght"] != "undefined" ? int.Parse(context.Request.QueryString["TitleLenght"]) : -1;

            //    FilesBO aFilesBO = new FilesBO();
            //    List<FilesExt> ListFiles = aFilesBO.SelectListFiles_ByCodeAlbums_009(IDLang);

            //    if (ListFiles != null)
            //    {
            //        for (int i = 0; i < ListFiles.Count; i++)
            //        {
            //            if ((TitleLenght > -1) & (ListFiles[i].Title.Length > TitleLenght))
            //            {
            //                ListFiles[i].Title = ListFiles[i].Title.Substring(0, TitleLenght - 1);
            //            }
            //            if ((IntroLenght > -1) & (ListFiles[i].Intro.Length > IntroLenght))
            //            {
            //                ListFiles[i].Intro = ListFiles[i].Intro.Substring(0, IntroLenght - 1);
            //            }
            //        }
            //    }
            //    _converter.DateTimeFormat = "dd/MM/yyyy";
            //    jSonString = JsonConvert.SerializeObject(ListFiles, _converter);
            //    jSonString = "{\"Files\":" + jSonString + "}";
            //    context.Response.Write(jSonString);
            //}
            //public void SelectListFiles_ByCodeAlbums_010(HttpContext context, int IDLang)
            //{


            //    String jSonString = "";


            //    int IntroLenght = context.Request.QueryString["IntroLenght"] != null && context.Request.QueryString["IntroLenght"] != "undefined" ? int.Parse(context.Request.QueryString["IntroLenght"]) : -1;
            //    int TitleLenght = context.Request.QueryString["TitleLenght"] != null && context.Request.QueryString["TitleLenght"] != "undefined" ? int.Parse(context.Request.QueryString["TitleLenght"]) : -1;

            //    FilesBO aFilesBO = new FilesBO();
            //    List<FilesExt> ListFiles = aFilesBO.SelectListFiles_ByCodeAlbums_010(IDLang);

            //    if (ListFiles != null)
            //    {
            //        for (int i = 0; i < ListFiles.Count; i++)
            //        {
            //            if ((TitleLenght > -1) & (ListFiles[i].Title.Length > TitleLenght))
            //            {
            //                ListFiles[i].Title = ListFiles[i].Title.Substring(0, TitleLenght - 1);
            //            }
            //            if ((IntroLenght > -1) & (ListFiles[i].Intro.Length > IntroLenght))
            //            {
            //                ListFiles[i].Intro = ListFiles[i].Intro.Substring(0, IntroLenght - 1);
            //            }
            //        }
            //    }
            //    _converter.DateTimeFormat = "dd/MM/yyyy";
            //    jSonString = JsonConvert.SerializeObject(ListFiles, _converter);
            //    jSonString = "{\"Files\":" + jSonString + "}";
            //    context.Response.Write(jSonString);
            //}


            //public void SelectListFiles_ByListCodeAlbums(HttpContext context, List<string> CodeAlbums, int IDLang)
            //{
            //    try
            //    {
            //        List<FilesExt> aListFiles = new List<FilesExt>();
            //        List<FilesExt> aListTemp = null;
            //        FilesBO aFilesBO = new FilesBO();
            //        FilesExt aFiles;

            //        String jSonString = "";

            //        int IntroLenght = context.Request.QueryString["IntroLenght"] != null && context.Request.QueryString["IntroLenght"] != "undefined" ? int.Parse(context.Request.QueryString["IntroLenght"]) : -1;
            //        int TitleLenght = context.Request.QueryString["TitleLenght"] != null && context.Request.QueryString["TitleLenght"] != "undefined" ? int.Parse(context.Request.QueryString["TitleLenght"]) : -1;

            //        for (int i = 1; i < CodeAlbums.Count; i++)
            //        {
            //            aListTemp = new List<FilesExt>();
            //            aListTemp = aFilesBO.SelectListFiles_ByCodeAlbums(CodeAlbums[i], IDLang);
            //            for (int y = 1; y < aListTemp.Count; y++)
            //            {
            //                aFiles = new FilesExt();
            //                aFiles = aListTemp[y];
            //                aListFiles.Add(aFiles);
            //            }
            //        }

            //        if (aListFiles != null)
            //        {
            //            for (int i = 0; i < aListFiles.Count; i++)
            //            {
            //                if ((TitleLenght > -1) & (aListFiles[i].Title.Length > TitleLenght))
            //                {
            //                    aListFiles[i].Title = aListFiles[i].Title.Substring(0, TitleLenght - 1);
            //                }
            //                if ((IntroLenght > -1) & (aListFiles[i].Intro.Length > IntroLenght))
            //                {
            //                    aListFiles[i].Intro = aListFiles[i].Intro.Substring(0, IntroLenght - 1);
            //                }
            //            }
            //        }
            //        _converter.DateTimeFormat = "dd/MM/yyyy";
            //        jSonString = JsonConvert.SerializeObject(aListFiles, _converter);
            //        jSonString = "{\"Files\":" + jSonString + "}";
            //        context.Response.Write(jSonString);


            //    }
            //    catch (Exception ex)
            //    {
            //        throw new Exception(String.Format("FilesAction.SelectListFiles_ByListCodeAlbums: {0}", ex.Message));
            //    }
            //}

           
            //public void SelectListFiles_ByListCodeAlbums_010(HttpContext context, int IDLang)
            //{
            //    try
            //    {
            //        List<FilesExt> aListFiles = new List<FilesExt>();
            //        FilesBO aFilesBO = new FilesBO();


            //        String jSonString = "";

            //        int IntroLenght = context.Request.QueryString["IntroLenght"] != null && context.Request.QueryString["IntroLenght"] != "undefined" ? int.Parse(context.Request.QueryString["IntroLenght"]) : -1;
            //        int TitleLenght = context.Request.QueryString["TitleLenght"] != null && context.Request.QueryString["TitleLenght"] != "undefined" ? int.Parse(context.Request.QueryString["TitleLenght"]) : -1;


            //        aListFiles = aFilesBO.SelectListFiles_ByListCodeAlbums_010(IDLang);

            //        if (aListFiles != null)
            //        {
            //            for (int i = 0; i < aListFiles.Count; i++)
            //            {
            //                if ((TitleLenght > -1) & (aListFiles[i].Title.Length > TitleLenght))
            //                {
            //                    aListFiles[i].Title = aListFiles[i].Title.Substring(0, TitleLenght - 1);
            //                }
            //                if ((IntroLenght > -1) & (aListFiles[i].Intro.Length > IntroLenght))
            //                {
            //                    aListFiles[i].Intro = aListFiles[i].Intro.Substring(0, IntroLenght - 1);
            //                }
            //            }
            //        }
            //        _converter.DateTimeFormat = "dd/MM/yyyy";
            //        jSonString = JsonConvert.SerializeObject(aListFiles, _converter);
            //        jSonString = "{\"Files\":" + jSonString + "}";
            //        context.Response.Write(jSonString);

            //    }
            //    catch (Exception ex)
            //    {
            //        throw new Exception(String.Format("FilesAction.SelectListFiles_ByListCodeAlbums_010: {0}", ex.Message));
            //    }
            // }

        }


}
