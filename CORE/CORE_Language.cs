using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Newtonsoft.Json.Converters;
using System.Globalization;
using Newtonsoft.Json;
using System.Configuration;
using System.Web;
using System.Web.UI;
using BussinessLogic;
using System.Xml;
using EntitiesExt;
using DataAccess;
using Library;

namespace CORE
{
    public class InfoLang
    {
        public int sys_NUM_LANG;
        public int sys_DEF_LANG;
        public int sys_CUR_LANG;
        public List<LanguagesItem> DATA_LANG;

        public InfoLang()
        {

            sys_NUM_LANG = 0;
            sys_DEF_LANG = 0;
            sys_CUR_LANG = 0;
            DATA_LANG = new List<LanguagesItem>();

        }
    }

    public static class CORE_Language
    {
        #region Private Var
        private static IsoDateTimeConverter _converter = new IsoDateTimeConverter();
        private static IFormatProvider culture = new CultureInfo("es-ES", true);


        private static string key_DATA_LANG = "DATA_LANG";
        private static string key_DATA_LANG_MASTER = "DATA_LANG_MASTER";

        private static string key_DEF_LANG_CMS = "DEF_LANG_CMS";
        private static string key_CUR_LANG_CMS = "CUR_LANG_CMS";

        private static string key_DEF_LANG_WEB = "DEF_LANG_WEB";
        private static string key_CUR_LANG_WEB = "CUR_LANG_WEB";

        private static string key_CUR_LANG = "CUR_LANG";
        private static string key_DEF_LANG = "DEF_LANG";

        private static InfoLang aInfoLang = new InfoLang();

        #endregion Private Var

        public static int sys_NUM_LANG;

        public static int sys_DEF_LANG_CMS;
        public static int sys_DEF_LANG_WEB;

        public static int sys_CUR_LANG_CMS;
        public static int sys_CUR_LANG_WEB;

        public static int sys_DEF_LANG;
        public static int sys_CUR_LANG;


        //


        //-------- Danh cho phuong phap lay ngon ngu moi -------------
        public static string Load_DynamicDataLanguage_Page(HttpContext Context, string SYSTEM)
        {
            string PageHTML = Context.Request["filename"].ToString();
            LanguagesBO aLanguagesBO = new LanguagesBO();

            ConfigsBO aConfigsBO = new ConfigsBO();
            sys_NUM_LANG = aLanguagesBO.Sel().ToList().Count;

            if (SYSTEM == "CMS")
            {
                sys_DEF_LANG = int.Parse(aConfigsBO.Sel_ByAccessKey(key_DEF_LANG_CMS).Value);
            }
            else if (SYSTEM == "WEB")
            {
                sys_DEF_LANG = int.Parse(aConfigsBO.Sel_ByAccessKey(key_DEF_LANG_WEB).Value);
            }

            if (!string.IsNullOrEmpty(Context.Request.QueryString["IDLang"]))
            {
                sys_CUR_LANG = Convert.ToInt32(Context.Request.QueryString["IDLang"]);
            }
            else
            {
                if (Context.GetSection(key_CUR_LANG) != null)
                {
                    sys_CUR_LANG = Convert.ToInt32(Context.GetSection(key_CUR_LANG).ToString());
                }
                // Cuoi cung moi lay den ngon ngu mac dinh
                else
                {
                    sys_CUR_LANG = int.Parse(aConfigsBO.Sel_ByAccessKey(key_DEF_LANG_CMS).Value);
                }

            }


            string PhysicalPath = Context.Server.MapPath(@"\\Languages\\" + aLanguagesBO.Sel(sys_CUR_LANG).NameLang + "\\" + PageHTML + ".xml");
            XmlDocument doc = new XmlDocument();
            doc.Load(PhysicalPath);

            XmlElement element = doc.DocumentElement;
            XmlNodeList attr_coll = doc.SelectNodes("//item");

            List<LanguagesItem> List_ItemLang = new List<LanguagesItem>();

            LanguagesItem Item;
            foreach (XmlNode node in attr_coll)
            {
                Item = new LanguagesItem();
                Item.Text = node.InnerText;
                Item.Key = node.Attributes["Index"].Value;

                List_ItemLang.Add(Item);
            }

            String jSonString = "";

            InfoLang aInfoLang = new InfoLang();
            aInfoLang.DATA_LANG = List_ItemLang;
            aInfoLang.sys_CUR_LANG = sys_CUR_LANG;
            aInfoLang.sys_DEF_LANG = sys_DEF_LANG;
            aInfoLang.sys_NUM_LANG = sys_NUM_LANG;

            _converter.DateTimeFormat = "dd/MM/yyyy";

            jSonString = JsonConvert.SerializeObject(aInfoLang, _converter);


            CORE_Language.aInfoLang.DATA_LANG = List_ItemLang;  // Chỗ chứa dữ liệu cho cách thức truy cập từ trang aspx
            return jSonString;
        }
        public static string Load_StaticDataLanguage_Page(HttpContext Context, string SYSTEM)
        {

            LanguagesBO aLanguagesBO = new LanguagesBO();

            ConfigsBO aConfigsBO = new ConfigsBO();
            sys_NUM_LANG = aLanguagesBO.Sel().ToList().Count;
            if (SYSTEM == "CMS")
            {
                sys_DEF_LANG = int.Parse(aConfigsBO.Sel_ByAccessKey(key_DEF_LANG_CMS).Value);
            }
            else if (SYSTEM == "WEB")
            {
                sys_DEF_LANG = int.Parse(aConfigsBO.Sel_ByAccessKey(key_DEF_LANG_WEB).Value);
            }

            if (!string.IsNullOrEmpty(Context.Request.QueryString["IDLang"]))
            {
                sys_CUR_LANG = Convert.ToInt32(Context.Request.QueryString["IDLang"]);
            }
            else
            {
                if (Context.GetSection(key_CUR_LANG) != null)
                {
                    sys_CUR_LANG = Convert.ToInt32(Context.GetSection(key_CUR_LANG).ToString());
                }
                // Cuoi cung moi lay den ngon ngu mac dinh
                else
                {
                    sys_CUR_LANG = int.Parse(aConfigsBO.Sel_ByAccessKey(key_DEF_LANG_CMS).Value);
                }

            }


            string PhysicalPath = Context.Server.MapPath(@"\\Languages\\" + aLanguagesBO.Sel(sys_CUR_LANG).NameLang + "\\FRAMEWORK\\StaticLanguage.xml");
            XmlDocument doc = new XmlDocument();
            doc.Load(PhysicalPath);

            XmlElement element = doc.DocumentElement;
            XmlNodeList attr_coll = doc.SelectNodes("//item");

            List<LanguagesItem> List_ItemLang = new List<LanguagesItem>();

            LanguagesItem Item;
            foreach (XmlNode node in attr_coll)
            {
                Item = new LanguagesItem();
                Item.Text = node.InnerText;
                Item.Key = node.Attributes["Index"].Value;

                List_ItemLang.Add(Item);
            }

            String jSonString = "";

            InfoLang aInfoLang = new InfoLang();
            aInfoLang.DATA_LANG = List_ItemLang;
            aInfoLang.sys_CUR_LANG = sys_CUR_LANG;
            aInfoLang.sys_DEF_LANG = sys_DEF_LANG;
            aInfoLang.sys_NUM_LANG = sys_NUM_LANG;

            _converter.DateTimeFormat = "dd/MM/yyyy";

            jSonString = JsonConvert.SerializeObject(aInfoLang, _converter);

            //  CORE_Language.CurrentPage.Session[key_LANG_DATA] = List_ItemLang;  // Ngôn ngữ dành cho trang ASPX
            return jSonString;
        }

        public static string GetText_Page(int Index)
        {
            try
            {

                return CORE_Language.aInfoLang.DATA_LANG[Index].Text;
            }
            catch (Exception e)
            {
                return "[" + e.Message.ToString() + Index + "]";
            }

        }
    }

}
