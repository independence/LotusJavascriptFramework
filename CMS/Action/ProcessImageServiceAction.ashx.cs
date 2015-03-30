using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using ActionHandler;
using System.Web.SessionState;
using EntitiesExt;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.IO;


namespace CMS.Action
{
    /// <summary>
    /// Summary description for ProcessImageServiceAction
    /// </summary>
    public class ProcessImageServiceAction : IHttpHandler
    {
        static readonly IDictionary<string, IAction> Dicts = new Dictionary<string, IAction>();
        public void ProcessRequest(HttpContext context)
        {
            TimeSpan refresh = new TimeSpan(0, 15, 0);
            context.Response.Cache.SetExpires(DateTime.Now.Add(refresh));
            context.Response.Cache.SetMaxAge(refresh);
            context.Response.Cache.SetCacheability(HttpCacheability.Public);
            context.Response.CacheControl = HttpCacheability.Public.ToString();
            context.Response.Cache.SetValidUntilExpires(true);

            string CurrentPath = context.Server.MapPath(context.Request.Url.LocalPath.ToString());
            string CurrentDirectory = Directory.GetParent(CurrentPath).ToString();
            

            string Img = !string.IsNullOrEmpty(context.Request.QueryString["Img"]) ? Directory.GetParent(CurrentDirectory) + "\\Uploads\\" + context.Request.QueryString["Img"] : CurrentDirectory + "\\NoImage.png";
            string Scale = !string.IsNullOrEmpty(context.Request.QueryString["Scale"]) ? context.Request.QueryString["Scale"] : "normal"; //giữ tỉ lệ 
            int W = !string.IsNullOrEmpty(context.Request.QueryString["W"]) ? int.Parse(context.Request.QueryString["W"]) : 100;
            int H = !string.IsNullOrEmpty(context.Request.QueryString["H"]) ? int.Parse(context.Request.QueryString["H"]) : 100;

            Resolution aResolution = new Resolution();
            aResolution.Width = W ;
            aResolution.Height = H ;

            Image imgToResize ;
            if (File.Exists(Img) == true)
            {
                 imgToResize = Image.FromFile(Img);
            } 
            else 
            {
                imgToResize = Image.FromFile( CurrentDirectory + "\\NoImage.png");
            }

            switch (Scale.ToLower())
            {
                case "normal":
                    imgToResize = ProcessImageServiceAction.Resize(imgToResize, aResolution, ResizeMode.Normal);
                    break;
                case "crop":
                    imgToResize = ProcessImageServiceAction.Resize(imgToResize, aResolution, ResizeMode.Crop);
                    break;
                case "fill":
                    imgToResize = ProcessImageServiceAction.Resize(imgToResize, aResolution, ResizeMode.Fill);
                    break;
                case "stretch":
                    imgToResize = ProcessImageServiceAction.Resize(imgToResize, aResolution, ResizeMode.Stretch);
                    break;
            }

            context.Response.ContentType = "image/jpeg";
            imgToResize.Save(context.Response.OutputStream, System.Drawing.Imaging.ImageFormat.Png);
        }

        public static Image ResizeImageFromFile(String OriginalFileLocation, double heigth, double width, Boolean Scale)
        {
                if (File.Exists(OriginalFileLocation) == true)
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
                    else if (width <= 0)
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
                        if (Scale == false)
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
                else
                {
                    return null;
                }
            


        }
        public static Image Resize(System.Drawing.Image image, Resolution targetResolution, ResizeMode resizeMode)
        {
            int sourceWidth = image.Width;
            int sourceHeight = image.Height;

            int targetWidth = targetResolution.Width;
            int targetHeight = targetResolution.Height;

            // Supplied image is landscape, while the target resolution is portait OR
            // supplied image is in portait, while the target resolution is in landscape.
            // switch target resolution to match the image.
            if ((sourceWidth > sourceHeight && targetWidth < targetHeight) || (sourceWidth < sourceHeight && targetWidth > targetHeight))
            {
                targetWidth = targetResolution.Height;
                targetHeight = targetResolution.Width;
            }

            float ratio = 0;
            float ratioWidth = ((float)targetWidth / (float)sourceWidth);
            float ratioHeight = ((float)targetHeight / (float)sourceHeight);

            if (ratioHeight < ratioWidth)
                ratio = ratioHeight;
            else
                ratio = ratioWidth;

            Bitmap newImage = null;

            switch (resizeMode)
            {
                case ResizeMode.Normal:
                default:
                    {
                       


                        int destWidth = (int)(sourceWidth * ratio);
                        int destHeight = (int)(sourceHeight * ratio);

                        newImage = new Bitmap(destWidth, destHeight);
                        using (Graphics graphics = Graphics.FromImage(newImage))
                        {
                            graphics.Clear(Color.Transparent);
                            graphics.InterpolationMode = InterpolationMode.HighQualityBicubic;
                            graphics.DrawImage(image, 0, 0, destWidth, destHeight);
                        }

                        break;
                    }
                case ResizeMode.Crop:
                    {
                        if (ratioHeight > ratioWidth)
                            ratio = ratioHeight;
                        else
                            ratio = ratioWidth;

                        int destWidth = (int)(sourceWidth * ratio);
                        int destHeight = (int)(sourceHeight * ratio);

                        newImage = new Bitmap(targetWidth, targetHeight);

                        int startX = 0;
                        int startY = 0;

                        if (destWidth > targetWidth)
                            startX = 0 - ((destWidth - targetWidth) / 2);

                        if (destHeight > targetHeight)
                            startY = 0 - ((destHeight - targetHeight) / 2);

                        using (Graphics graphics = Graphics.FromImage((System.Drawing.Image)newImage))
                        {
                            graphics.Clear(Color.Transparent);
                            graphics.InterpolationMode = InterpolationMode.HighQualityBicubic;
                            graphics.DrawImage(image, startX, startY, destWidth, destHeight);
                        }

                        break;
                    }
                case ResizeMode.Stretch:
                    {
                        newImage = new Bitmap(targetWidth, targetHeight);
                        using (Graphics graphics = Graphics.FromImage((System.Drawing.Image)newImage))
                        {
                            graphics.Clear(Color.Transparent);
                            graphics.InterpolationMode = InterpolationMode.HighQualityBicubic;
                            graphics.DrawImage(image, 0, 0, targetWidth, targetHeight);
                        }
                        break;
                    }
                case ResizeMode.Fill:
                    {
                        newImage = new Bitmap(targetWidth, targetHeight);

                        int destWidth = (int)(sourceWidth * ratio);
                        int destHeight = (int)(sourceHeight * ratio);

                        int startX = 0;
                        int startY = 0;

                        if (destWidth < targetWidth)
                            startX = 0 + ((targetWidth - destWidth) / 2);

                        if (destHeight < targetHeight)
                            startY = 0 + ((targetHeight - destHeight) / 2);

                        newImage = new Bitmap(targetWidth, targetHeight);
                        using (Graphics graphics = Graphics.FromImage((System.Drawing.Image)newImage))
                        {
                            graphics.Clear(Color.Transparent);
                            graphics.InterpolationMode = InterpolationMode.HighQualityBicubic;
                            graphics.DrawImage(image, startX, startY, destWidth, destHeight);
                        }

                        break;
                    }
            }

            return (System.Drawing.Image)newImage;
        }
        public enum ResizeMode
        {
            ///
            /// This will resize images to the resolution nearest to the target resolution. Images can become smaller when using this option
            ///
            Normal = 1,
            ///
            /// This will stretch an image so it always is the exact dimensions of the target resolution
            ///
            Stretch = 2,
            ///
            /// This will size an image to the exact dimensions of the target resolution, keeping ratio in mind and cropping parts that can't
            /// fit in the picture.
            ///
            Crop = 3,
            ///
            /// This will size an image to the exact dimensions of the target resolution, keeping ratio in mind and filling up the image
            /// with black bars when some parts remain empty.
            ///
            Fill = 4
        }
        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
    public class Resolution
    {
        public int Width = 100;
        public int Height = 100;
    }
}