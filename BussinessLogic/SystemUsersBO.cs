using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Linq;
using DataAccess;
using System.Data.Entity.Core.Objects;
using System.Net;
using System.Net.Mail;

namespace BussinessLogic
{
    public  class SystemUsersBO
    {

        private DatabaseDA aDatabaseDA = new DatabaseDA();

        //Hiennv
        public SystemUsers Sel_ByUsername_ByPassword(string Username, string Password, bool Disable)
        {
            try
            {
                List<SystemUsers> aListSystemUsers = aDatabaseDA.SystemUsers.Where(s => s.Username == Username).Where(s => s.Password == Password).Where(s => s.Disable == Disable).ToList();
                if(aListSystemUsers.Count > 0)
                {
                    return aListSystemUsers[0];
                }
                else
                {
                    return null;
                } 
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("SystemUsersDA_SelectByUsernameByPassword: {0}", ex.Message));
            }
        }

        //Hiennv
        public SystemUsers Sel_ByEmail_ByPassword(string Email, string Password)
        {
            try
            {
                List<SystemUsers> aListSystemUsers = aDatabaseDA.SystemUsers.Where(s => s.Email == Email && s.Password == Password).ToList();
                if (aListSystemUsers.Count > 0)
                {
                    return aListSystemUsers[0];
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("SystemUsersDA_SelectByEmailByPassword: {0}", ex.Message));
            }
        }
        public SystemUsers Sel_ByEmail_ByPassword(string Email, string Password, bool Disable)
        {
            try
            {
                List<SystemUsers> aListSystemUsers = aDatabaseDA.SystemUsers.Where(s => s.Email == Email && s.Password == Password && s.Disable == Disable).ToList();
                if (aListSystemUsers.Count > 0)
                {
                    return aListSystemUsers[0];
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("SystemUsersDA_SelectByEmailByPassword: {0}", ex.Message));
            }
        }

        //Hiennv
        public SystemUsers Sel_ByID(int ID)
        {
            try
            {
                List<SystemUsers> aListSystemUsers = aDatabaseDA.SystemUsers.Where(s => s.ID == ID).ToList();
                if (aListSystemUsers.Count > 0)
                {
                    return aListSystemUsers[0];
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("SystemUsersBO.Sel_ByID: {0}", ex.Message));
            }
        }
        public SystemUsers Sel_ByID(int ID, bool Disable)
        {
            try
            {
                List<SystemUsers> aListSystemUsers = aDatabaseDA.SystemUsers.Where(s => s.ID == ID).Where(s => s.Disable == Disable).ToList();
                if (aListSystemUsers.Count > 0)
                {
                    return aListSystemUsers[0];
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("SystemUsersBO.Sel_ByID: {0}", ex.Message));
            }
        }

        //hiennv
        public  List<SystemUsers> Sel()
        {
            try
            {
                return aDatabaseDA.SystemUsers.ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("SystemUsersBO.Sel: {0}", ex.Message));
            }
        }
        public List<SystemUsers> Sel(bool Disable)
        {
            try
            {
                return aDatabaseDA.SystemUsers.Where(r => r.Disable == Disable).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("SystemUsersBO.Sel: {0}", ex.Message));
            }
        }

        //Hiennv
        public int Ins(SystemUsers aSystemUsers)
        {
            try
            {
                aDatabaseDA.SystemUsers.Add(aSystemUsers);
                return aDatabaseDA.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("SystemUsersBO.Ins: {0}", ex.Message));
            }
        }

        //Hiennv
        public int Upd(SystemUsers aSystemUsers)
        {
            try
            {
                aDatabaseDA.SystemUsers.AddOrUpdate(aSystemUsers);
                return aDatabaseDA.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("SystemUsersBO.Upd: {0}", ex.Message));
            }
        }

        //Hiennv
        public  int Del_ByID(int ID)
        {
            try
            {
                List<SystemUsers> aListSystemUsers = aDatabaseDA.SystemUsers.Where(s => s.ID == ID).ToList();
                if (aListSystemUsers.Count > 0)
                {
                    aDatabaseDA.SystemUsers.Remove(aListSystemUsers[0]);
                    return aDatabaseDA.SaveChanges();
                }
                else
                {
                    return 0;
                }
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("SystemUsersBO.Del: {0}", ex.Message));
               
            }
        }
        //tqtrung
        public int Del()
        {
            try
            {
                List<SystemUsers> aListSystemUsers = this.Sel();
                if (aListSystemUsers != null)
                {

                    aDatabaseDA.SystemUsers.RemoveRange(aListSystemUsers);
                    return aDatabaseDA.SaveChanges();
                }
                else
                {
                    throw new Exception(String.Format("SystemUsersBO.Del_All: {0}", "Không tìm thấy SystemUsers"));
                }
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("SystemUsersBO.Del_All: {0}", ex.Message));
            }
        }

        //tqtrung
        public int Upd_Status_ByID(int NewStatus, int ID)
        {
            try
            {
                List<SystemUsers> aListSystemUsers = aDatabaseDA.SystemUsers.Where(c => c.ID == ID).ToList();

                if (aListSystemUsers != null)
                {
                    aListSystemUsers[0].Status = NewStatus;
                    aDatabaseDA.SystemUsers.AddOrUpdate(aListSystemUsers[0]);
                }
                return aDatabaseDA.SaveChanges();

            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("SystemUsersBO.Upd_Status_ByID: {0}", ex.Message));
            }
        }
        //tqtrung
        public int Upd_Type_ByID(int NewType, int ID)
        {
            try
            {
                List<SystemUsers> aListSystemUsers = aDatabaseDA.SystemUsers.Where(c => c.ID == ID).ToList();

                if (aListSystemUsers != null)
                {
                    aListSystemUsers[0].Type = NewType;
                    aDatabaseDA.SystemUsers.AddOrUpdate(aListSystemUsers[0]);
                }
                return aDatabaseDA.SaveChanges();

            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("SystemUsersBO.Upd_Type_ByID: {0}", ex.Message));
            }
        }
        //tqtrung
        public int Upd_Disable_ByID(bool NewDisable, int ID)
        {
            try
            {
                List<SystemUsers> aListSystemUsers = aDatabaseDA.SystemUsers.Where(c => c.ID == ID).ToList();

                if (aListSystemUsers != null)
                {
                    aListSystemUsers[0].Disable = NewDisable;
                    aDatabaseDA.SystemUsers.AddOrUpdate(aListSystemUsers[0]);
                }
                return aDatabaseDA.SaveChanges();

            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("SystemUsersBO.Upd_Disable_ByID: {0}", ex.Message));
            }
        }

        public bool SendMail(string To, string Title, string Content)
        {
                SmtpClient smtp = new SmtpClient("smtp.gmail.com", 587);
                smtp.UseDefaultCredentials = false;
                smtp.Credentials = new System.Net.NetworkCredential("englishcamp.dangky@gmail.com", "30f45510");
                smtp.EnableSsl = true;                                                      

            try
            {
                smtp.Send(To, "ngocbm1@picker.com.vn", Title, Content);
                return true;
            }
            catch (Exception E1)
            {
                return false;
            }
 
        }
    }
}
