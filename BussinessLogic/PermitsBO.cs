using System;
using System.Collections.Generic;
using System.Linq;
using System.Data.Entity.Migrations;
using DataAccess;
using System.Data.Entity.Core.Objects;
using EntitiesExt;


namespace BussinessLogic
{
    public  class PermitsBO
    {
        private DatabaseDA aDatabaseDA = new DatabaseDA();


        public List<vw_PermitViewAll> GetAllInfoLogin_Ext_ByUsername(string Username)
        {
            try
            {
                return aDatabaseDA.vw_PermitViewAll.Where(a => a.SystemUsers_Username == Username).ToList();
                
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("SystemUsersDA_GetPermitViewAll_ByUsername: {0}", ex.Message));
            }
        }

        public List<vw_PermitViewAll> GetAllInfoLogin_ByUsername(string UserName)
        {
            try
            {
                return aDatabaseDA.vw_PermitViewAll.Where(p=>p.SystemUsers_Username == UserName).Where(p=>p.SystemUsers_Disable == false).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("SystemUsersDA_GetAllInfoLogin_ByUsername: {0}", ex.Message));
            }
        }

        public Permits Sel(Int32 ID)
        {
            try
            {
                List<Permits> aListPermits = aDatabaseDA.Permits.Where(r => r.ID == ID).ToList();
                if (aListPermits.Count > 0)
                {
                    return aListPermits[0];
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("PermitsBO.Sel: {0}", ex.Message));
            }
        }
        public Permits Sel(Int32 ID, bool Disable)
        {
            try
            {
                List<Permits> aListPermits = aDatabaseDA.Permits.Where(r => r.ID == ID).Where(r => r.Disable == Disable).ToList();
                if (aListPermits.Count > 0)
                {
                    return aListPermits[0];
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("PermitsBO.Sel: {0}", ex.Message));
            }
        }

        //Hiennv
        public  List<Permits> Sel_All()
        {
            try
            {
                return aDatabaseDA.Permits.ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("PermitsBO.Sel_all: {0}", ex.Message));
            }
        }
        public List<Permits> Sel_All(bool Disable)
        {
            try
            {
                return aDatabaseDA.Permits.Where(r => r.Disable == Disable).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("PermitsBO.Sel_all: {0}", ex.Message));
            }
        }

        //hiennv
        public  int Ins(Permits aPermits)
        {
            try
            {
                aDatabaseDA.Permits.Add(aPermits);
                return aDatabaseDA.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("PermitsBO.Ins: {0}", ex.Message));
            }
        }


        //Hiennv
        public  int Upd(Permits aPermits)
        {
            try
            {
                aDatabaseDA.Permits.AddOrUpdate(aPermits);
                return aDatabaseDA.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("PermitsBO.Upd: {0}", ex.Message));
            }
        }
        //tqtrung
        public int Upd_Status_ByID(int NewStatus, int ID)
        {
            try
            {
                List<Permits> aListPermits = aDatabaseDA.Permits.Where(c => c.ID == ID).ToList();

                if (aListPermits != null)
                {
                    aListPermits[0].Status = NewStatus;
                    aDatabaseDA.Permits.AddOrUpdate(aListPermits[0]);
                }
                return aDatabaseDA.SaveChanges();

            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("PermitsBO.Upd_Status_ByID: {0}", ex.Message));
            }
        }
        //tqtrung
        public int Upd_Type_ByID(int NewType, int ID)
        {
            try
            {
                List<Permits> aListPermits = aDatabaseDA.Permits.Where(c => c.ID == ID).ToList();

                if (aListPermits != null)
                {
                    aListPermits[0].Type = NewType;
                    aDatabaseDA.Permits.AddOrUpdate(aListPermits[0]);
                }
                return aDatabaseDA.SaveChanges();

            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("PermitsBO.Upd_Type_ByID: {0}", ex.Message));
            }
        }
        //tqtrung
        public int Upd_Disable_ByID(bool NewDisable, int ID)
        {
            try
            {
                List<Permits> aListPermits = aDatabaseDA.Permits.Where(c => c.ID == ID).ToList();

                if (aListPermits != null)
                {
                    aListPermits[0].Disable = NewDisable;
                    aDatabaseDA.Permits.AddOrUpdate(aListPermits[0]);
                }
                return aDatabaseDA.SaveChanges();

            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("PermitsBO.Upd_Disable_ByID: {0}", ex.Message));
            }
        }
       
        //tqtrung
        public int Del_All()
        {
            try
            {
                List<Permits> aListPermits = this.Sel_All();
                if (aListPermits != null)
                {

                    aDatabaseDA.Permits.RemoveRange(aListPermits);
                    return aDatabaseDA.SaveChanges();
                }
                else
                {
                    throw new Exception(String.Format("PermitsBO.Del_All: {0}", "Không tìm thấy Permits"));
                }
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("PermitsBO.Del_All: {0}", ex.Message));
            }
        }
        //tqtrung
        public int Del_ByID(int ID)
        {
            try
            {
                List<Permits> aListPermits = aDatabaseDA.Permits.Where(c => c.ID == ID).ToList();
                if (aListPermits != null)
                {
                    aDatabaseDA.Permits.Remove(aListPermits[0]);
                    return aDatabaseDA.SaveChanges();
                }
                else
                {
                    throw new Exception(String.Format("PermitsBO.Del_ByID: {0}", "Không tìm thấy Permits"));
                }
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("PermitsBO.Del_ByID: {0}", ex.Message));
            }
        }
        //tqtrung
        public int Del_ByListID(List<int> ListID)
        {
            try
            {
                List<Permits> aListPermits = aDatabaseDA.Permits.Where(c => ListID.Contains(c.ID)).ToList();

                if (aListPermits != null)
                {
                    aDatabaseDA.Permits.RemoveRange(aListPermits);
                    return aDatabaseDA.SaveChanges();
                }
                else
                {
                    throw new Exception(String.Format("PermitsBO.Del_ByListID: {0}", "Không tìm thấy Permits"));
                }
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("PermitsBO.Del_ByListID: {0}", ex.Message));
            }
        }
        
    }
}
