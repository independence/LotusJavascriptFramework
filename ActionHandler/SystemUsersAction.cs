using System;
using System.Collections.Generic;
using System.Linq;

using System.Web;
using Library;

using Newtonsoft.Json;
using EntitiesExt;
using Newtonsoft.Json.Converters;
using BussinessLogic;
using DataAccess;

namespace ActionHandler
{
    public class SystemUsersAction : IAction
    {
        #region IAction Members

        public void Do(HttpContext context)
        {
            string action = context.Request["action"].ToString();
            if (!String.IsNullOrEmpty(action))
            {
                switch (action)
                {
                    case "Ins":
                        Ins(context);
                        break;
                    case "Sel":
                        Sel_ByID(context);
                        break;
                    case "Upd":
                        Upd(context);
                        break;
                    case "Del":
                        Del(context);
                        break;
                    case "Sel_ByID":
                        Sel_ByID(context);
                        break;
                    case "SendMail":
                        SendMail(context);
                        break; 
                    default:
                        context.Response.Write("Can't find action");
                        break;
                }
            }
        }
        #endregion


		private IsoDateTimeConverter _converter = new IsoDateTimeConverter();
        
        public void Ins(HttpContext context)
        {
			String jSonString = "";
           try
           {
				SystemUsers aSystemUsers = new SystemUsers();

				aSystemUsers.Username = !String.IsNullOrEmpty(context.Request.Form["txtUsername"]) ? Convert.ToString(context.Request.Form["txtUsername"]) : "";
				
				aSystemUsers.UserGroup = !String.IsNullOrEmpty(context.Request.Form["txtUserGroup"]) ? Convert.ToInt32(context.Request.Form["txtUserGroup"]) : 0;
				
				aSystemUsers.Email = !String.IsNullOrEmpty(context.Request.Form["txtEmail"]) ? Convert.ToString(context.Request.Form["txtEmail"]) : "";

                aSystemUsers.Password = !String.IsNullOrEmpty(context.Request.Form["txtPassword"]) ? Library.StringUtility.md5(Convert.ToString(context.Request.Form["txtPassword"])) : Library.StringUtility.md5(aSystemUsers.Username + "12345678");


                aSystemUsers.IDRefMailSystem = !String.IsNullOrEmpty(context.Request.Form["txtIDRefMailSystem"]) ? Convert.ToInt32(context.Request.Form["txtIDRefMailSystem"]) : 0;

                aSystemUsers.IDRefAnotherSystem = !String.IsNullOrEmpty(context.Request.Form["txtIDRefAnotherSystem"]) ? Convert.ToInt32(context.Request.Form["txtIDRefAnotherSystem"]) : 0;

                aSystemUsers.Type = !String.IsNullOrEmpty(context.Request.Form["txtTypeSystemUsers"]) ? Convert.ToInt32(context.Request.Form["txtTypeSystemUsers"]) : 0;

                aSystemUsers.Status = !String.IsNullOrEmpty(context.Request.Form["txtStatusSystemUsers"]) ? Convert.ToInt32(context.Request.Form["txtStatusSystemUsers"]) : 0;
                aSystemUsers.Name = !String.IsNullOrEmpty(context.Request.Form["txtName"]) ? Convert.ToString(context.Request.Form["txtName"]) :"";

                SystemUsersBO aSystemUsersBO = new SystemUsersBO();
                int ret = aSystemUsersBO.Ins(aSystemUsers);


					if (ret == 0)
					{ jSonString = "{\"status\": \"success\"}"; }
					if (ret != 0)
					{ jSonString = "{\"status\":\"error|" + ret.ToString() + "\"}"; }
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

        public void Upd(HttpContext context)
        {
			String jSonString = "";
			try
			{
				SystemUsers aSystemUsers = new SystemUsers();
				int IDSystemUsers = Convert.ToInt32(context.Request.QueryString["IDSystemUsers"]);

				aSystemUsers.ID = IDSystemUsers;

                aSystemUsers.Username = !String.IsNullOrEmpty(context.Request.Form["txtUsername"]) ? Convert.ToString(context.Request.Form["txtUsername"]) : aSystemUsers.Username;

                aSystemUsers.UserGroup = !String.IsNullOrEmpty(context.Request.Form["txtUserGroup"]) ? Convert.ToInt32(context.Request.Form["txtUserGroup"]) : aSystemUsers.UserGroup;

                aSystemUsers.Email = !String.IsNullOrEmpty(context.Request.Form["txtEmail"]) ? Convert.ToString(context.Request.Form["txtEmail"]) : aSystemUsers.Email;

                aSystemUsers.Password = !String.IsNullOrEmpty(context.Request.Form["txtPassword"]) ? Library.StringUtility.md5(Convert.ToString(context.Request.Form["txtPassword"])) : aSystemUsers.Password;

                aSystemUsers.IDRefMailSystem = !String.IsNullOrEmpty(context.Request.Form["txtIDRefMailSystem"]) ? Convert.ToInt32(context.Request.Form["txtIDRefMailSystem"]) : aSystemUsers.IDRefMailSystem;

                aSystemUsers.IDRefAnotherSystem = !String.IsNullOrEmpty(context.Request.Form["txtIDRefAnotherSystem"]) ? Convert.ToInt32(context.Request.Form["txtIDRefAnotherSystem"]) : aSystemUsers.IDRefAnotherSystem;

                aSystemUsers.Type = !String.IsNullOrEmpty(context.Request.Form["txtType"]) ? Convert.ToInt32(context.Request.Form["txtType"]) : aSystemUsers.Type;

                aSystemUsers.Status = !String.IsNullOrEmpty(context.Request.Form["txtStatus"]) ? Convert.ToInt32(context.Request.Form["txtStatus"]) : aSystemUsers.Status;

                aSystemUsers.Name = !String.IsNullOrEmpty(context.Request.Form["txtName"]) ? Convert.ToString(context.Request.Form["txtName"]) : aSystemUsers.Name;
                SystemUsersBO aSystemUsersBO = new SystemUsersBO();
                int ret = aSystemUsersBO.Upd(aSystemUsers);

					if (ret == 0)
					{ jSonString = "{\"status\": \"success\"}"; }
					if (ret != 0)
					{ jSonString = "{\"status\":\"error|" + ret.ToString() + "\"}"; }
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


        public void Sel_ByID(HttpContext context)
        {

            String jSonString = "";
            int IDSystemUsers = Convert.ToInt32(context.Request.QueryString["ID"]);

            SystemUsersBO aSystemUsersBO = new SystemUsersBO();
            SystemUsers obj = aSystemUsersBO.Sel_ByID(IDSystemUsers);

            if (obj != null)
            {
                _converter.DateTimeFormat = "dd/MM/yyyy";
                jSonString = JsonConvert.SerializeObject(obj, _converter);
            }
            jSonString = "{\"data\":" + jSonString + "}";
            context.Response.Write(jSonString);
        }
		public void Sel(HttpContext context)
        {

            String jSonString = "";
            SystemUsersBO aSystemUsersBO = new SystemUsersBO();
            List<SystemUsers> obj = aSystemUsersBO.Sel();

            if (obj != null)
            {
                _converter.DateTimeFormat = "dd/MM/yyyy";
                jSonString = JsonConvert.SerializeObject(obj, _converter);
            }
            jSonString = "{" + jSonString + "}";
            context.Response.Write(jSonString);
        }

        public void Del(HttpContext context)
        {
			String jSonString = "";
			try
			{

				int IDSystemUsers = Convert.ToInt32(context.Request.QueryString["IDSystemUsers"]);

                SystemUsersBO aSystemUsersBO = new SystemUsersBO();
                int ret = aSystemUsersBO.Del_ByID(IDSystemUsers);


					if (ret == 0)
					{ jSonString = "{\"status\": \"success\"}"; }
					if (ret != 0)
					{ jSonString = "{\"status\":\"error|" + ret.ToString() + "\"}"; }
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

        public void SendMail(HttpContext context)
        {
            String jSonString = "";
            try
            {
                string HoTen = !String.IsNullOrEmpty(context.Request.Form["txtName"]) ? Convert.ToString(context.Request.Form["txtName"]) : "[Noname]";
                string FromEmail = !String.IsNullOrEmpty(context.Request.Form["txtEmail"]) ? Convert.ToString(context.Request.Form["txtEmail"]) : "englishcamp.dangky@gmail.com";
                //string Phone = !String.IsNullOrEmpty(context.Request.Form["txtPhone"]) ? Convert.ToString(context.Request.Form["txtPhone"]) : "[Unknow phone]";
                string Content = !String.IsNullOrEmpty(context.Request.Form["txtContent"]) ? Convert.ToString(context.Request.Form["txtContent"]) : "[Unknow content]";
                string Subject = !String.IsNullOrEmpty(context.Request.Form["txtSubject"]) ? Convert.ToString(context.Request.Form["txtSubject"]) : "[Unknow subject]"; ;
                string Body = "From: " + HoTen + "\n";
                Body += "Email: " + FromEmail + "\n";
                //Body += "Phone: " + Phone + "\n";
                Body += "Subject: " + Subject + "\n";
                Body += "Question: \n" + Content + "\n";

                SystemUsersBO aSystemUsersBO = new SystemUsersBO();
                bool ret = aSystemUsersBO.SendMail(FromEmail, Subject, Body);
                if (ret == true)
                {
                    jSonString = "{\"status\": \"success\"}";
                }
                else
                {
                    jSonString = "{\"status\": \"error\" ,\"message\": \"Có lỗi phát sinh khi gửi mail\"}";
                }
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

    }
}
