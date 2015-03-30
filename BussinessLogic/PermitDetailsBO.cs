using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Data.Entity.Migrations;
using DataAccess;
using EntitiesExt;
namespace BussinessLogic
{
    public  class PermitDetailsBO
    {
        private DatabaseDA aDatabaseDA = new DatabaseDA();

 
        public PermitDetails Sel_ByID(int ID)
        {
            try
            {
                List<PermitDetails> aListPermitDetails = aDatabaseDA.PermitDetails.Where(p => p.ID == ID).ToList();
                if (aListPermitDetails.Count > 0)
                {
                    return aListPermitDetails[0];
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("PermitDetailsBO.Sel_ByID: {0}", ex.Message));
            }
        }
        public PermitDetails Sel_ByID(int ID, bool Disable)
        {
            try
            {
                List<PermitDetails> aListPermitDetails = aDatabaseDA.PermitDetails.Where(p => p.ID == ID).Where(p => p.Disable == Disable).ToList();
                if (aListPermitDetails.Count > 0)
                {
                    return aListPermitDetails[0];
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("PermitDetailsBO.Sel_ByID: {0}", ex.Message));
            }
        }

        public  List<PermitDetails> Sel_All()
        {
            try
            {
                return aDatabaseDA.PermitDetails.ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("PermitDetailsBO.Sel_All: {0}", ex.Message));
            }
        }
        public List<PermitDetails> Sel_All(bool Disable)
        {
            try
            {
                return aDatabaseDA.PermitDetails.Where(r => r.Disable == Disable).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("PermitDetailsBO.Sel_All: {0}", ex.Message));
            }
        }

        //tqtrung
        public List<PermitDetails> Sel_ByIDPermits(int IDPermits)
        {
            List<PermitDetails> aListPermitDetails= aDatabaseDA.PermitDetails.Where(c=>c.IDPermit==IDPermits).ToList();
            if (aListPermitDetails != null)
            {

                return aListPermitDetails;

            }
            else
            {
                return null;
            }
        }
        public List<PermitDetails> Sel_ByIDPermits(int IDPermits, bool Disable)
        {
            List<PermitDetails> aListPermitDetails = aDatabaseDA.PermitDetails.Where(c => c.IDPermit == IDPermits).Where(c => c.Disable == Disable).ToList();
            if (aListPermitDetails != null)
            {

                return aListPermitDetails;

            }
            else
            {
                return null;
            }
        }

        public  int Ins(PermitDetails aPermitDetails)
        {
            try
            {
                aDatabaseDA.PermitDetails.Add(aPermitDetails);
                return aDatabaseDA.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("PermitDetailsBO_Ins: {0}", ex.Message));
            }
        }


        public  int Upd(PermitDetails aPermitDetails)
        {
            try
            {
                aDatabaseDA.PermitDetails.AddOrUpdate(aPermitDetails);
                return aDatabaseDA.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("PermitDetailsBO_Upd: {0}", ex.Message));
            }
        }
        //tqtrung
        public int Upd_Status_ByID(int NewStatus, int ID)
        {
            try
            {
                List<PermitDetails> aListPermitDetails = aDatabaseDA.PermitDetails.Where(c => c.ID == ID).ToList();

                if (aListPermitDetails != null)
                {
                    aListPermitDetails[0].Status = NewStatus;
                    aDatabaseDA.PermitDetails.AddOrUpdate(aListPermitDetails[0]);
                }
                return aDatabaseDA.SaveChanges();

            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("PermitDetailsBO.Upd_Status_ByID: {0}", ex.Message));
            }
        }
        //tqtrung
        public int Upd_Type_ByID(int NewType, int ID)
        {
            try
            {
                List<PermitDetails> aListPermitDetails = aDatabaseDA.PermitDetails.Where(c => c.ID == ID).ToList();

                if (aListPermitDetails != null)
                {
                    aListPermitDetails[0].Type = NewType;
                    aDatabaseDA.PermitDetails.AddOrUpdate(aListPermitDetails[0]);
                }
                return aDatabaseDA.SaveChanges();

            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("PermitDetailsBO.Upd_Type_ByID: {0}", ex.Message));
            }
        }
        //tqtrung
        public int Upd_Disable_ByID(bool NewDisable, int ID)
        {
            try
            {
                List<PermitDetails> aListPermitDetails = aDatabaseDA.PermitDetails.Where(c => c.ID == ID).ToList();

                if (aListPermitDetails != null)
                {
                    aListPermitDetails[0].Disable = NewDisable;
                    aDatabaseDA.PermitDetails.AddOrUpdate(aListPermitDetails[0]);
                }
                return aDatabaseDA.SaveChanges();

            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("PermitDetailsBO.Upd_Disable_ByID: {0}", ex.Message));
            }
        }
       


        public  int Del_ByID(int ID)
        {
            try
            {
                List<PermitDetails> aListPermitDetails = aDatabaseDA.PermitDetails.Where(p => p.ID == ID).ToList();
                if (aListPermitDetails.Count > 0)
                {
                    aDatabaseDA.PermitDetails.Remove(aListPermitDetails[0]);
                    return aDatabaseDA.SaveChanges();
                }
                else
                {
                    return 0;
                }
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("PermitDetailsBO_Del: {0}", ex.Message));
            }
        }
        //tqtrung
        public int Del_All()
        {
            try
            {
                List<PermitDetails> aListPermitDetails = this.Sel_All();
                if (aListPermitDetails != null)
                {

                    aDatabaseDA.PermitDetails.RemoveRange(aListPermitDetails);
                    return aDatabaseDA.SaveChanges();
                }
                else
                {
                    throw new Exception(String.Format("PermitDetailsBO.Del_All: {0}", "Không tìm thấy PermitDetails"));
                }
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("PermitDetailsBO.Del_All: {0}", ex.Message));
            }
        }
        //tqtrung
        public int Del_ByListID(List<int> ListID)
        {
            try
            {
                List<PermitDetails> aListPermitDetails = aDatabaseDA.PermitDetails.Where(c => ListID.Contains(c.ID)).ToList();

                if (aListPermitDetails != null)
                {
                    aDatabaseDA.PermitDetails.RemoveRange(aListPermitDetails);
                    return aDatabaseDA.SaveChanges();
                }
                else
                {
                    throw new Exception(String.Format("PermitDetailsBO.Del_ByListID: {0}", "Không tìm thấy PermitDetails"));
                }
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("PermitDetailsBO.Del_ByListID: {0}", ex.Message));
            }
        }
        //tqtrung
        public int Del_ByIDPermits(int IDPermit)
        {
            try
            {
                List<PermitDetails> aListPermitDetails = aDatabaseDA.PermitDetails.Where(c => c.IDPermit==IDPermit).ToList();

                if (aListPermitDetails != null)
                {
                    aDatabaseDA.PermitDetails.RemoveRange(aListPermitDetails);
                    return aDatabaseDA.SaveChanges();
                }
                else
                {
                    throw new Exception(String.Format("PermitDetailsBO.Del_ByIDPermits: {0}", "Không tìm thấy PermitDetails"));
                }
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("PermitDetailsBO.Del_ByIDPermits: {0}", ex.Message));
            }
        }
     



    }
}
