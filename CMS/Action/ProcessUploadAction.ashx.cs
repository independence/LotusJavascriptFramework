using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using System.Configuration;

using Newtonsoft.Json;

using Newtonsoft.Json.Converters;
using System.Drawing;
using System.Drawing.Drawing2D;

namespace CMS.Action
{
    /// <summary>
    /// Summary description for ProcessUploadAction
    /// </summary>
    /// 
    public class ReturnInfo
    {
        //private string _status;
        //private string _mess;
        //private string _filename;
        //private string _filepath;
        //private int _originWidth;
        //private int _originHeight;
        //private string _originName;
        //private int _newWidth;
        //private int _newHeight;

        public string Status;
        public string Mess;
        public string Filename;
        public string Filepath;
        public int OriginWidth;
        public int OriginHeight;
        public int OriginName;
        public int NewWidth;
        public int NewHeight;



        public ReturnInfo()
        {

        }

    }


    public class ProcessUploadAction : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            string savedFileName = "";
            string TypeUpload = "";


            string UploadPath = "";

            //ReturnInfo aRet = new ReturnInfo();
            //IsoDateTimeConverter _converter = new IsoDateTimeConverter();
            string Json = "";

            try
            {
                /* Xoa het file cu trong thu muc temp*/
                string UploadPathTemp = ConfigurationManager.AppSettings["UPLOAD_PATH_TEMPT"].ToString();
                UploadPathTemp = context.Server.MapPath(UploadPathTemp);
                if (Directory.Exists(UploadPathTemp) == false)
                {
                    Directory.CreateDirectory(UploadPathTemp);
                }
                string[] ListFiles = Directory.GetFiles(UploadPathTemp);
                foreach (string i in ListFiles)
                {
                    try
                    {
                        File.Delete(i);
                    }
                    catch(Exception e)
                    {
                        continue;
                    }
                }

                TypeUpload = !String.IsNullOrEmpty(context.Request.QueryString["TypeUpload"]) ? context.Request.QueryString["TypeUpload"] : "";
                UploadPath = GetPathSave(TypeUpload, context);

                if (TypeUpload.ToLower() == "contents_image")
                {
                  Json =  UploadImage(context, UploadPathTemp, UploadPath);
                }
                else if (TypeUpload.ToLower() == "files_file")
                {
                    Json = UploadFile(context, UploadPathTemp, UploadPath);
                }


            }
            catch (Exception e)
            {
                Json = "{\"Status\":\"Error\",\"File\":\"" + (UploadPath + savedFileName).Replace("\\", "\\\\") + "\",\"Messenger\":\"" + e.Message.ToString() + "\"}";
            }
            finally
            {

                //if (aRet != null)
                //{
                //    _converter.DateTimeFormat = "dd/MM/yyyy";
                //    Json = JsonConvert.SerializeObject(aRet, _converter);
                //}
                context.Response.Write(Json);
            }
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }

        //####################################################################################################


        //TypeUpload : define in webconfig
        //You can upload Image, Music,... for each type of file, we need store in deffirent folder
        //TypeUpload tell to us what kind of file and function GetPathSave return path store matching with file of type

        public string GetPathSave(string TypeUpload, HttpContext context)
        {
            string Ret_UploadPath = "";
            TypeUpload = TypeUpload.ToUpper();
            if (TypeUpload == ConfigurationManager.AppSettings["TYPE_UPLOAD_BACKGROUND_IMAGE"].ToString())
            {
                Ret_UploadPath = ConfigurationManager.AppSettings["UPLOAD_PATH_BACKGROUND"].ToString();
            }
            else if (TypeUpload == ConfigurationManager.AppSettings["TYPE_UPLOAD_HALLS_IMAGE"].ToString())
            {
                Ret_UploadPath = ConfigurationManager.AppSettings["UPLOAD_PATH_HALLS"].ToString();
            }
            else if (TypeUpload == ConfigurationManager.AppSettings["TYPE_UPLOAD_ROOMS_IMAGE"].ToString())
            {
                Ret_UploadPath = ConfigurationManager.AppSettings["UPLOAD_PATH_ROOMS"].ToString();
            }
            else if (TypeUpload == ConfigurationManager.AppSettings["TYPE_UPLOAD_SERVICES_IMAGE"].ToString())
            {
                Ret_UploadPath = ConfigurationManager.AppSettings["UPLOAD_PATH_SERVICES"].ToString();
            }
            else if (TypeUpload == ConfigurationManager.AppSettings["TYPE_UPLOAD_Contents_IMAGE"].ToString())
            {
                Ret_UploadPath = ConfigurationManager.AppSettings["UPLOAD_PATH_Contents"].ToString();
            }
            else
            {
                Ret_UploadPath = ConfigurationManager.AppSettings["UPLOAD_PATH_DEFAULT"].ToString();
            }

            Ret_UploadPath = context.Server.MapPath(Ret_UploadPath);
            if (!Directory.Exists(Ret_UploadPath))
            {
                Directory.CreateDirectory(Ret_UploadPath);
            }
            return Ret_UploadPath;

        }

        //####################################################################################################

        public string GetFileName(bool IsEncodeFileName, string OriginFileName)
        {
            if (IsEncodeFileName == false)
            {
                return OriginFileName;
            }
            else
            {
                return DateTime.Now.ToString("yyyy-MM-dd_hh-mm-ss_tt") + Path.GetExtension(OriginFileName);
            }
        }

        //####################################################################################################

        public Image ResizeImageFromFile(String OriginalFileLocation, float heigth, float width, Boolean keepAspectRatio, Boolean getCenter)
        {
            Image imgToResize = Image.FromFile(OriginalFileLocation);

            
            float nPercent = 0;
            float nPercentW = 0;
            float nPercentH = 0;

            if (width > 0 && heigth > 0)
            {
                nPercentW = ((float)width / (float)imgToResize.Width);
                nPercentH = ((float)heigth / (float)imgToResize.Height);


                if (nPercentH < nPercentW)
                    nPercent = nPercentH;
                else
                    nPercent = nPercentW;
            }
            else if (width <=0) 
            {
                nPercent = ((float)heigth / (float)imgToResize.Height);
            }
            else if (heigth <= 0)
            {
                nPercent = ((float)width / (float)imgToResize.Width);
            }
            int destWidth = 0;
            int destHeight = 0;
            if ((heigth == -1) & (width == -1))
            {
                return imgToResize;
            }
            else
            {
                if (keepAspectRatio == false)
                {
                    destWidth = (int)width;
                    destHeight = (int)heigth;
                }
                else
                {
                        destWidth = (int)(imgToResize.Width * nPercent);
                        destHeight = (int)(imgToResize.Height * nPercent);
                }

                Bitmap b = new Bitmap(destWidth, destHeight);
                Graphics g = Graphics.FromImage((Image)b);
                g.InterpolationMode = InterpolationMode.HighQualityBicubic;
                
                g.DrawImage(imgToResize, 0, 0, destWidth, destHeight);

                g.Dispose();
                //b.Dispose();
                imgToResize.Dispose();
                return (Image)b;
            }

        }

        public string UploadImage(HttpContext context, string UploadPathTemp, string UploadPath)
        {
            string savedFileName = "";
      
            bool IsEncodeFileName = false;
            int Width = -1;
            int Height = -1;
            bool isCreateThumb = false;
            string json = "";
           foreach (string file in context.Request.Files)
                    {
                        HttpPostedFile hpf = context.Request.Files[file] as HttpPostedFile;
                        if (hpf.ContentLength == 0)
                            continue;
                        else
                        {

                            IsEncodeFileName = !String.IsNullOrEmpty(context.Request.QueryString["IsEncodeFileName"]) ? Convert.ToBoolean(context.Request.QueryString["IsEncodeFileName"]) : false;
                            savedFileName = GetFileName(IsEncodeFileName, hpf.FileName);

                            isCreateThumb = !String.IsNullOrEmpty(context.Request.QueryString["isCreateThumb"]) ? Convert.ToBoolean(context.Request.QueryString["isCreateThumb"]) : false;
                            //Upload len thu muc temp
                            hpf.SaveAs(UploadPathTemp + savedFileName);
                            //Upload file



                            //Resize neu can
                            Height = !String.IsNullOrEmpty(context.Request.QueryString["Height"]) ? Convert.ToInt32(context.Request.QueryString["Height"]) : -1;
                            Width = !String.IsNullOrEmpty(context.Request.QueryString["Width"]) ? Convert.ToInt32(context.Request.QueryString["Width"]) : -1;
                            Image NewImage;
                            if ((Height != -1) && (Width != -1))
                            {
                                NewImage = ResizeImageFromFile(UploadPathTemp + savedFileName, Height, Width, false, false);
                                //save sang thu muc thuc su
                                NewImage.Save(UploadPath + savedFileName);
                            }
                            else if ((Height != -1) || (Width != -1))
                            {
                                NewImage = ResizeImageFromFile(UploadPathTemp + savedFileName, Height, Width, true, true);
                                //save sang thu muc thuc su
                                NewImage.Save(UploadPath + savedFileName);
                            }
                            else
                            {
                                NewImage = Image.FromFile(UploadPathTemp + savedFileName);
                                //save sang thu muc thuc su
                                NewImage.Save(UploadPath + savedFileName);
                            }

                            //=======================================
                            // Tao thumb
                            if (isCreateThumb == true)
                            {
                                NewImage = ResizeImageFromFile(UploadPathTemp + savedFileName, 200, 200, false, true);
                                NewImage.Save(UploadPath + "thumb_" + savedFileName);
                            }

                            NewImage.Dispose();

                            json = json + "{\"Status\":\"Success\",\"File\":\"" + (UploadPath + savedFileName).Replace("\\", "\\\\") + "\",\"Messenger\":\"" + "messsssss" + "\"}";

                        }
                    }
           return json;
        }

        public string UploadFile(HttpContext context, string UploadPathTemp, string UploadPath)
        {
            string savedFileName = "";

            bool IsEncodeFileName = false;


            string json = "";
            foreach (string file in context.Request.Files)
            {
                HttpPostedFile hpf = context.Request.Files[file] as HttpPostedFile;
                if (hpf.ContentLength == 0)
                    continue;
                else
                {
                    
                    IsEncodeFileName = !String.IsNullOrEmpty(context.Request.QueryString["IsEncodeFileName"]) ? Convert.ToBoolean(context.Request.QueryString["IsEncodeFileName"]) : false;
                    savedFileName = hpf.FileName.Substring(0,hpf.FileName.IndexOf(".")) + GetFileName(IsEncodeFileName, hpf.FileName);

                
                    //Upload len thu muc temp
                    hpf.SaveAs(UploadPathTemp + savedFileName);
                    //Upload file
                    hpf.SaveAs(UploadPath + savedFileName);

                    json = json + "{\"Status\":\"Success\",\"File\":\"" + (UploadPath + savedFileName).Replace("\\", "\\\\") + "\",\"Messenger\":\"" + "messsssss" + "\"}";

                }
            }
            return json;
        }
    }
}