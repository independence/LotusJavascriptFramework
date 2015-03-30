using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Net;

namespace ActionHandler
{
    public class SendMailAction : IAction
    {
        #region IAction Members

        public void Do(HttpContext context)
        {
            string action = context.Request["action"].ToString();
            if (!String.IsNullOrEmpty(action))
            {
                switch (action)
                {
                    case "send_mailcontact":
                        ContactFromWebsite(context);
                        break;
                    default:
                        context.Response.Write("Can't find action");
                        break;
                }
            }
        }
        public void ContactFromWebsite(HttpContext context)
        {
            String jSonString = "";
            try
            {
                string HoTen = !String.IsNullOrEmpty(context.Request.Form["txt_Name"]) ? Convert.ToString(context.Request.Form["txt_Name"]) : "[Noname]";
                string FromEmail = !String.IsNullOrEmpty(context.Request.Form["txt_Email"]) ? Convert.ToString(context.Request.Form["txt_Email"]) : "UnknowCustomer@nhakhachchinhphu.com.vn";
                string Phone = !String.IsNullOrEmpty(context.Request.Form["txt_Phone"]) ? Convert.ToString(context.Request.Form["txt_Phone"]) : "[Unknow phone]";
                string Content = !String.IsNullOrEmpty(context.Request.Form["txt_Content"]) ? Convert.ToString(context.Request.Form["txt_Content"]) : "[Unknow content]";
                string Subject = "[Khách hàng liên hệ từ website]" + " [" + DateTime.Now.ToString() + "]";
                string Body = "From: " + HoTen + "\n";
                Body += "Email: " + FromEmail + "\n";
                Body += "Phone: " + Phone + "\n";
                Body += "Subject: " + Subject + "\n";
                Body += "Question: \n" + Content + "\n";

                var smtp = new System.Net.Mail.SmtpClient();
                {
                    smtp.Host = "mail.nhakhachchinhphu.com.vn";
                    smtp.Port = 25;
                    smtp.EnableSsl = false;
                    smtp.DeliveryMethod = System.Net.Mail.SmtpDeliveryMethod.Network;
                    smtp.Credentials = new NetworkCredential("contact@nhakhachchinhphu.com.vn", "contact12345678");
                    smtp.Timeout = 20000;
                }
                // Passing values to smtp object
                smtp.Send(FromEmail, "contact@nhakhachchinhphu.com.vn", Subject, Body);
                jSonString = "{\"status\": \"success\"}";
            }
            catch (Exception e)
            {
                jSonString = "{\"status\":\"error|" + e.Message.ToString() + "\"}";
            }
            finally
            {

                context.Response.Write(jSonString);
            }
        }

        /// <summary>
        /// Author : HuyLh
        /// ngày : 30/8/2013 2:00 PM
        /// hàm gửi mail qua servermail hotmail
        /// </summary>
        public void ContactFromWebsite_Hotmail(HttpContext context)
        {
            String jSonString = "";
            try
            {
                string HoTen = !String.IsNullOrEmpty(context.Request.Form["txt_Name"]) ? Convert.ToString(context.Request.Form["txt_Name"]) : "[Noname]";
                string FromEmail = !String.IsNullOrEmpty(context.Request.Form["txt_Email"]) ? Convert.ToString(context.Request.Form["txt_Email"]) : "UnknowCustomer@pprvietnam.com";
                //string Phone = !String.IsNullOrEmpty(context.Request.Form["txt_Phone"]) ? Convert.ToString(context.Request.Form["txt_Phone"]) : "[Unknow phone]";
                string Content = !String.IsNullOrEmpty(context.Request.Form["txt_Content"]) ? Convert.ToString(context.Request.Form["txt_Content"]) : "[Unknow content]";
                string Subject = !String.IsNullOrEmpty(context.Request.Form["txt_Subject"]) ? Convert.ToString(context.Request.Form["txt_Subject"]) : "[Unknow subject]"; ;
                string Body = "From: " + HoTen + "\n";
                Body += "Email: " + FromEmail + "\n";
                //Body += "Phone: " + Phone + "\n";
                Body += "Subject: " + Subject + "\n";
                Body += "Question: \n" + Content + "\n";

                var smtp = new System.Net.Mail.SmtpClient();
                {
                    smtp.Host = "smtp.live.com";
                    smtp.Port = 25;
                    smtp.EnableSsl = true;
                    smtp.DeliveryMethod = System.Net.Mail.SmtpDeliveryMethod.Network;
                    smtp.Credentials = new NetworkCredential("info@pprvietnam.com", "pprvietnam");
                    smtp.Timeout = 20000;
                }
                // Passing values to smtp object
                smtp.Send(FromEmail, "info@pprvietnam.com", Subject, Body);
                jSonString = "{\"status\": \"success\"}";
            }
            catch (Exception e)
            {
                jSonString = "{\"status\":\"error|" + e.Message.ToString() + "\"}";
            }
            finally
            {

                context.Response.Write(jSonString);
            }
        }


        #endregion
    }
}
