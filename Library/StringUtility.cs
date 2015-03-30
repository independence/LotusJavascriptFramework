using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Globalization;

namespace Library
{
    public class StringUtility
    {
        private static string[,] sArray = new string[14, 18];

        public static string RemoveToneMarks(string sSource)
        {
            InitArrayToneMarks();
            if (sSource == "") return "";
            byte i, j;
            for (j = 0; j < 14; j++)
            {
                for (i = 1; i < 18; i++)
                {
                    sSource = sSource.Replace(sArray[j, i], sArray[j, 0]);
                }
            }
            return sSource;
        }
        public static string ConvertToTypeLink(string str)
        {
            str = RemoveToneMarks(str);
            //string[] chars = new string[] { ".", "/", "#", "%", "&", "*", "\"", ":", "|","“" };
            string[] chars = new string[] { "'",@"\","#","%","&","+","/",":",";","<",">","?","“","”",",",".","-","*","\"" };
            for (int i = 0; i < chars.Length; i++)
            {
                if (str.Contains(chars[i]))
                {
                    str = str.Replace(chars[i], " ");
                }
            }
            while (str.IndexOf("  ") != -1)
            {
                str = str.Replace("  ", " ");
            }
            str = str.Trim().ToLower().Replace(" ", "-");
            return str;
        }

        public static string GetNameOnly(string str)
        {
            str = RemoveToneMarks(str);
            //string[] chars = new string[] { ".", "/", "#", "%", "&", "*", "\"", ":", "|","“" };
            string[] chars = new string[] { "'", @"\", "#", "%", "&", "+", "/", ":", ";", "<", ">", "?", "“", "”", ",", ".", "-", "*", "\"" };
            for (int i = 0; i < chars.Length; i++)
            {
                if (str.Contains(chars[i]))
                {
                    str = str.Replace(chars[i], "");
                }
            }
            str = str.Trim().ToLower().Replace(" ", "");
            return str;
        }

        private static void InitArrayToneMarks()
        {
            byte i, j;
            string sString = "aAeEoOuUiIdDyY";
            string LC_a = "áàạảãâấầậẩẫăắằặẳẵ";
            string UC_A = "ÁÀẠẢÃÂẤẦẬẨẪĂẮẰẶẲẴ";
            string LC_e = "éèẹẻẽêếềệểễeeeeee";
            string UC_E = "ÉÈẸẺẼÊẾỀỆỂỄEEEEEE";
            string LC_o = "óòọỏõôốồộổỗơớờợởỡ";
            string UC_O = "ÓÒỌỎÕÔỐỒỘỔỖƠỚỜỢỞỠ";
            string LC_u = "úùụủũưứừựửữuuuuuu";
            string UC_U = "ÚÙỤỦŨƯỨỪỰỬỮUUUUUU";
            string LC_i = "íìịỉĩiiiiiiiiiiii";
            string UC_I = "ÍÌỊỈĨIIIIIIIIIIII";
            string LC_d = "đdddddddddddddddd";
            string UC_D = "ĐDDDDDDDDDDDDDDDD";
            string LC_y = "ýỳỵỷỹyyyyyyyyyyyy";
            string UC_Y = "ÝỲỴỶỸYYYYYYYYYYYY";
            for (i = 0; i < 14; i++)
                sArray[i, 0] = sString.Substring(i, 1);
            for (j = 1; j < 18; j++)
                for (i = 1; i < 18; i++)
                {
                    sArray[0, i] = LC_a.Substring(i - 1, 1);
                    sArray[1, i] = UC_A.Substring(i - 1, 1);
                    sArray[2, i] = LC_e.Substring(i - 1, 1);
                    sArray[3, i] = UC_E.Substring(i - 1, 1);
                    sArray[4, i] = LC_o.Substring(i - 1, 1);
                    sArray[5, i] = UC_O.Substring(i - 1, 1);
                    sArray[6, i] = LC_u.Substring(i - 1, 1);
                    sArray[7, i] = UC_U.Substring(i - 1, 1);
                    sArray[8, i] = LC_i.Substring(i - 1, 1);
                    sArray[9, i] = UC_I.Substring(i - 1, 1);
                    sArray[10, i] = LC_d.Substring(i - 1, 1);
                    sArray[11, i] = UC_D.Substring(i - 1, 1);
                    sArray[12, i] = LC_y.Substring(i - 1, 1);
                    sArray[13, i] = UC_Y.Substring(i - 1, 1);
                }
        }
        
        public static string GetStringByLength(string SongName, int length)
        {
            string strName = SongName.ToString();
            try
            {
                return strName.ToString().Length <= length ? strName : strName.ToString().Substring(0, length).Substring(0, strName.ToString().Substring(0, length).LastIndexOf(' ')) + "...";
            }
            catch
            {
                return strName.Substring(0, length) + "...";

            }
        }
        public static string GetCurrentPageName(string URL)
        {
            //string sPath = System.Web.HttpContext.Current.Request.Url.AbsolutePath;
            System.IO.FileInfo oInfo = new System.IO.FileInfo(URL);
            string sRet = oInfo.Name;
            return sRet;
        }

        public static string GetCurrentPageName()
        {
            string sPath = System.Web.HttpContext.Current.Request.Url.AbsolutePath;
            System.IO.FileInfo oInfo = new System.IO.FileInfo(sPath);
            string sRet = oInfo.Name;
            return sRet;
        }
        public static string HtmlEncode(string text)
        {
            if (text == null)
                return null;

            StringBuilder sb = new StringBuilder(text.Length);

            int len = text.Length;
            for (int i = 0; i < len; i++)
            {
                switch (text[i])
                {

                    case '<':
                        sb.Append("&lt;");
                        break;
                    case '>':
                        sb.Append("&gt;");
                        break;
                    case '"':
                        sb.Append("&quot;");
                        break;
                    case '&':
                        sb.Append("&amp;");
                        break;
                    default:
                        if (text[i] > 159)
                        {
                            // decimal numeric entity
                            sb.Append("&#");
                            sb.Append(((int)text[i]).ToString(CultureInfo.InvariantCulture));
                            sb.Append(";");
                        }
                        else
                            sb.Append(text[i]);
                        break;
                }
            }
            return sb.ToString();
        }
        public static string HtmlDecode(string text)
        {
            if (text == null)
                return null;
            text = text.Replace("&lt;", "<").Replace("&gt;", ">").Replace("&quot;", "\"").Replace("&amp;", "&").Replace("&nbsp;", " ");

            return text;
        }

        public static string ChangeFormatDateTime(int InputFormatType, int OutputFormatType, string Datetime)
        {
            //1: dd/MM/yyyy hh:mm:ss t
            //2: MM/dd/yyyy hh:mm:ss t

            //3: yyyy/MM/dd hh:mm:ss t
            //4: yyyy/dd/MM hh:mm:ss t
            



            string[] Key = { "/","/"," ",":",":"," " };
            string[] data = new string[7];
            data = Datetime.Split(Key, StringSplitOptions.None);
            string ret;
            try
            {
                 ret = data[1] + "/" + data[0] + "/" + data[2] + " " + data[3] + ":" + data[4];
            }
            catch
            {
                 ret = data[1] + "/" + data[0] + "/" + data[2];
            }
            return ret;
        }
        public static byte[] encryptData(string data)
        {
            System.Security.Cryptography.MD5CryptoServiceProvider md5Hasher = new System.Security.Cryptography.MD5CryptoServiceProvider();
            byte[] hashedBytes;
            System.Text.UTF8Encoding encoder = new System.Text.UTF8Encoding();
            hashedBytes = md5Hasher.ComputeHash(encoder.GetBytes(data));
            return hashedBytes;
        }
        public static string md5(string data)
        {
            return BitConverter.ToString(encryptData(data)).Replace("-", "").ToLower();
        }

    }
}
