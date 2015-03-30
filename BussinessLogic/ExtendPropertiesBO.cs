using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using DataAccess;
using System.Linq;
using System.Data.SqlClient;
using System.Data.Entity.Core.Objects;

namespace BussinessLogic
{
    public  class ExtendPropertiesBO
    {
        DatabaseDA aDatabaseDA = new DatabaseDA();
       
        public List<ExtendProperties> Sel_All_ByIDLang(int IDLang)
        {
            try
            {
                return this.Sel().Where(c => c.IDLang == IDLang).ToList();
            }
            catch (Exception ex)
            {
                //return null;
                throw new Exception(String.Format("ExtendPropertiesBO.Sel_all_ByIDLang: {0}", ex.Message));
            }
        }
        public List<ExtendProperties> Sel_All_ByIDLang(int IDLang, bool Disable)
        {
            try
            {
                return this.Sel().Where(c => c.IDLang == IDLang).Where(c => c.Disable == Disable).ToList();
            }
            catch (Exception ex)
            {
                //return null;
                throw new Exception(String.Format("ExtendPropertiesBO.Sel_all_ByIDLang: {0}", ex.Message));
            }
        }

         public List<ExtendProperties> Sel()
        {
            try
            {
                return aDatabaseDA.ExtendProperties.ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("ExtendPropertiesBO.Sel: {0}", ex.Message));
            }
        }
         public List<ExtendProperties> Sel(bool Disable)
         {
             try
             {
                 return aDatabaseDA.ExtendProperties.Where(r => r.Disable == Disable).ToList();
             }
             catch (Exception ex)
             {
                 throw new Exception(String.Format("ExtendPropertiesBO.Sel: {0}", ex.Message));
             }
         }

         public List<ExtendProperties> Sel_ByCode(string Code)
         {
             try
             {
                 return this.Sel().Where(c => c.Code == Code).ToList();
             }
             catch (Exception ex)
             {
                 //return null;
                 throw new Exception(String.Format("ExtendPropertiesBO.Sel_all_ByCode: {0}", ex.Message));
             }
         }
         public List<ExtendProperties> Sel_ByCode(string Code, bool Disable)
         {
             try
             {
                 return this.Sel().Where(c => c.Code == Code).Where(c => c.Disable == Disable).ToList();
             }
             catch (Exception ex)
             {
                 //return null;
                 throw new Exception(String.Format("ExtendPropertiesBO.Sel_all_ByCode: {0}", ex.Message));
             }
         }

         // Sel_ByCode_ByIDLang(string Code,int IDLang)
         public ExtendProperties Sel_ByCode_ByIDLang(string Code, int IDLang)
         {
             try
             {
                 List<ExtendProperties> alisthalls = aDatabaseDA.ExtendProperties.Where(c => c.ID == IDLang).Where(b => b.Code == Code).ToList();

                 if (alisthalls.Count > 0)
                 {
                     return alisthalls[0];
                 }
                 else
                 {
                     return null;
                 }

             }
             catch (Exception ex)
             {
                 //return null;
                 throw new Exception(String.Format("ExtendPropertiesBO.Sel_ByCode_ByIDLang: {0}", ex.Message));
             }
         }
         public ExtendProperties Sel_ByCode_ByIDLang(string Code, int IDLang, bool Disable)
         {
             try
             {
                 List<ExtendProperties> alisthalls = aDatabaseDA.ExtendProperties.Where(c => c.ID == IDLang).Where(b => b.Code == Code).Where(b => b.Disable == Disable).ToList();

                 if (alisthalls.Count > 0)
                 {
                     return alisthalls[0];
                 }
                 else
                 {
                     return null;
                 }

             }
             catch (Exception ex)
             {
                 //return null;
                 throw new Exception(String.Format("ExtendPropertiesBO.Sel_ByCode_ByIDLang: {0}", ex.Message));
             }
         }

        // Sel_ByID(int ID)
        public List<ExtendProperties> Sel_ByID(int ID)
        {
            try
            {

                List<ExtendProperties> aListExtendProperties = aDatabaseDA.ExtendProperties.Where(c => c.ID == ID).ToList();
                if (aListExtendProperties.Count > 0)
                {
                    return aListExtendProperties;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                //return null;
                throw new Exception(String.Format("ExtendPropertiesBO.Sel: {0}", ex.Message));
            }
        }
        public List<ExtendProperties> Sel_ByID(int ID, bool Disable)
        {
            try
            {

                List<ExtendProperties> aListExtendProperties = aDatabaseDA.ExtendProperties.Where(c => c.ID == ID).Where(c => c.Disable == Disable).ToList();
                if (aListExtendProperties.Count > 0)
                {
                    return aListExtendProperties;
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                //return null;
                throw new Exception(String.Format("ExtendPropertiesBO.Sel: {0}", ex.Message));
            }
        }

        // Khoi 
        public List<ExtendProperties> Sel_ByCode_ByDisableMapping_ByStatusMapping_ByIDLang(string Code, bool Disable, int Status ,int IDLang)
        {
            try
            {
                List<ExtendProperties> aListExtendProperties = aDatabaseDA.ExtendProperties.Where(c => c.Code == Code).Where(c => c.Disable == Disable).Where(c => c.Status == Status).Where(c => c.IDLang == IDLang).ToList();
                if (aListExtendProperties != null)
                {
                    if (Status == -1)
                    {
                        return aListExtendProperties.ToList();
                    }
                    else
                    {

                        return aListExtendProperties.Where(c => c.Status == Status).ToList();
                    }
                }
                return aDatabaseDA.ExtendProperties.Where(c => c.Code == Code).Where(c => c.IDLang == IDLang).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("ExtendPropertiesBO.Sel_ByIDLang_ByID_ByDisable_ByStatus:{0}", ex.Message));
            }
        }

        // KhoiDT Del
        public int Del() 
        {
            try
            {
                List<ExtendProperties> aTemp = aDatabaseDA.ExtendProperties.ToList();
                if (aTemp.Count > 0)
                {
                    aDatabaseDA.ExtendProperties.RemoveRange(aTemp);
                    return aDatabaseDA.SaveChanges();
                }
                return 0;
            }
            catch (Exception ex) 
            {
                throw new Exception(String.Format("ExtendPropertiesBO.Del:{0}", ex.Message));
            }
        }

        public int Del_ByID(int ID)
        {
            try
            {
                List<ExtendProperties> aListExtendProperties = aDatabaseDA.ExtendProperties.Where(n => n.ID == ID).ToList();
                if (aListExtendProperties.Count > 0)
                {
                    aDatabaseDA.ExtendProperties.Remove(aListExtendProperties[0]);
                    return aDatabaseDA.SaveChanges();
                }
                else
                {
                    return 0;
                }
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("ExtendPropertiesBO.Del: {0}", ex.Message));
            }
        }
        // Del_ByCode_ByIDLang(string Code,int IDLang)

        public int Del_ByCode_ByIDLang(string Code, int IDLang)
        {
            try
            {
                List<ExtendProperties> aListExtendProperties = aDatabaseDA.ExtendProperties.Where(n => n.Code == Code && n.IDLang == IDLang).ToList();
                if (aListExtendProperties.Count > 0)
                {
                    aDatabaseDA.ExtendProperties.Remove(aListExtendProperties[0]);
                    return aDatabaseDA.SaveChanges();
                }
                else
                {
                    return 0;
                }
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("ExtendPropertiesBO.Del_ByCode_ByIDLang: {0}", ex.Message));
            }
        }
        // Del_ByCode(string Code)
        //Giữa By và điều kiện truyền vào ko cần _ VD:Del_By_ListCode == Del_ByListCode
        public int Del_ByCode(string Code)
        {
            try
            {
                List<ExtendProperties> aListExtendProperties = aDatabaseDA.ExtendProperties.Where(n => n.Code == Code).ToList();
                if (aListExtendProperties.Count > 0)
                {
                    aDatabaseDA.ExtendProperties.Remove(aListExtendProperties[0]);
                    return aDatabaseDA.SaveChanges();
                }
                else
                {
                    return 0;
                }
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("ExtendPropertiesBO.Del_ByCode: {0}", ex.Message));
            }
        }
        // Del_ByListCode
        public int Del_ByListCode(List<string> aListCode)
        {
            try
            {
                List<ExtendProperties> aTemp = aDatabaseDA.ExtendProperties.Where(p => aListCode.Contains(p.Code)).ToList();
                if (aTemp.Count > 0)
                {
                    aDatabaseDA.ExtendProperties.RemoveRange(aTemp);
                    return aDatabaseDA.SaveChanges();
                }
                return 0;
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("ExtendPropertiesBO.Del_ByCode: {0}", ex.Message));
            }
        }
        // Del_By_ListID

        public int Del_ByListID(List<int> aListID)
        {
            try
            {
                List<ExtendProperties> aTemp = aDatabaseDA.ExtendProperties.Where(p => aListID.Contains(p.ID)).ToList();
                if (aTemp.Count > 0)
                {
                    aDatabaseDA.ExtendProperties.RemoveRange(aTemp);
                    return aDatabaseDA.SaveChanges();
                }
                return 0;
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("ExtendPropertiesBO.Del_ByCode: {0}", ex.Message));
            }
        }
        //  Upd_Status_ByID(int ID,int NewStatus) 
        public int Upd_Status_ByID(int ID,int NewStatus) 
        {
            try
            {
                List<ExtendProperties> aListExtendProperties = aDatabaseDA.ExtendProperties.Where(b => b.ID == ID).ToList();
                if (aListExtendProperties.Count > 0)
                {

                    aListExtendProperties[0].Status = NewStatus;
                    aDatabaseDA.ExtendProperties.AddOrUpdate(aListExtendProperties[0]);
                    return aDatabaseDA.SaveChanges();

                }
                return 0;
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("Upd_Status_ByID:{0}", ex.Message));
            }
        }
        // Upd_Type_ByID (intID,int NewType)
        public int Upd_Type_ByID(int ID, int NewType) 
        {
            try
            {
                List<ExtendProperties> aListExtendProperties = aDatabaseDA.ExtendProperties.Where(b => b.ID == ID).ToList();
                if (aListExtendProperties.Count > 0)
                {

                    aListExtendProperties[0].Type = NewType;
                    aDatabaseDA.ExtendProperties.AddOrUpdate(aListExtendProperties[0]);
                    return aDatabaseDA.SaveChanges();

                }
                return 0;
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("Upd_Status_ByID:{0}", ex.Message));
            }
        }
        // Upd_Disable_ByID ( bool NewDisable)

        public int Upd_Disable_ByID(int ID, bool NewDisable) 
        {
            try
            {
                List<ExtendProperties> aListExtendProperties = aDatabaseDA.ExtendProperties.Where(b => b.ID == ID).ToList();
                if (aListExtendProperties.Count > 0)
                {

                    aListExtendProperties[0].Disable = NewDisable;
                    aDatabaseDA.ExtendProperties.AddOrUpdate(aListExtendProperties[0]);
                    return aDatabaseDA.SaveChanges();

                }
                return 0;
            }
            catch (Exception ex) 
            {
                throw new Exception(String.Format("Upd_Disable_ByID:{0}", ex.Message));
            }
        }
        // Upd_Status_ByCode (string Code,int NewStatus)

        public int Upd_Status_ByCode(string Code, int NewStatus) 
        {
            try
            {
                List<ExtendProperties> aListExtendProperties = aDatabaseDA.ExtendProperties.Where(b => b.Code == Code).ToList();
                if (aListExtendProperties.Count > 0)
                {

                    aListExtendProperties[0].Status = NewStatus;
                    aDatabaseDA.ExtendProperties.AddOrUpdate(aListExtendProperties[0]);
                    return aDatabaseDA.SaveChanges();

                }
                return 0;
            }
            catch (Exception ex) 
            {
                throw new Exception(String.Format("Upd_Status_ByCode:{0}", ex.Message));
            }
        }
        // Upd_Type_ ByCode (string Code,int NewType) 
        public int Upd_Type_ByCode(string Code, int NewType) 
        {
            try
            {
                List<ExtendProperties> aListExtendProperties = aDatabaseDA.ExtendProperties.Where(b => b.Code == Code).ToList();
                if (aListExtendProperties.Count > 0)
                {

                    aListExtendProperties[0].Type = NewType;
                    aDatabaseDA.ExtendProperties.AddOrUpdate(aListExtendProperties[0]);
                    return aDatabaseDA.SaveChanges();

                }
                return 0;
            }
            catch (Exception ex) 
            {
                throw new Exception(String.Format("Upd_Type_ByCode:{0}", ex.Message));
            }
        }
        // Upd_Disable_ByCode (string Code,bool NewDisable)

        public int Upd_Disable_ByCode(string Code, bool NewDisable)
        {
            try
            {
                List<ExtendProperties> aListExtendProperties = aDatabaseDA.ExtendProperties.Where(b => b.Code == Code).ToList();
                if (aListExtendProperties.Count > 0)
                {
                    aListExtendProperties[0].Disable = NewDisable;
                    aDatabaseDA.ExtendProperties.AddOrUpdate(aListExtendProperties[0]);
                    return aDatabaseDA.SaveChanges();

                }
                return 0;
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("Upd_Disable_ByCode:{0}", ex.Message));
            }
        }
        // Upd_Status_ByCode_ByLang (string  Code,  int NewStatus , int IDLang)
        public int Upd_Status_ByCode_ByLang(string Code, int NewStatus, int IDLang) 
        {
            try
            {
                List<ExtendProperties> aListExtendProperties = aDatabaseDA.ExtendProperties.Where(b => b.Code == Code).Where(z => z.IDLang == IDLang).ToList();
                if (aListExtendProperties.Count > 0)
                {
                    aListExtendProperties[0].Status = NewStatus;
                    aDatabaseDA.ExtendProperties.AddOrUpdate(aListExtendProperties[0]);
                    return aDatabaseDA.SaveChanges();

                }
                return 0;
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("Upd_Status_ByCode_ByLang:{0}", ex.Message));
            }
        }
        // 
        // KhoiDT

        public int Upd_Type_ByCode_ByLang(string Code, int NewType, int IDLang)
        {
            try
            {
                List<ExtendProperties> aListExtendProperties = aDatabaseDA.ExtendProperties.Where(b => b.Code == Code).Where(z => z.IDLang == IDLang).ToList();
                if (aListExtendProperties.Count > 0)
                {
                    aListExtendProperties[0].Type = NewType;
                    aDatabaseDA.ExtendProperties.AddOrUpdate(aListExtendProperties[0]);
                    return aDatabaseDA.SaveChanges();
                }
                return 0;
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("Upd_Type_ByCode_ByLang:{0}", ex.Message));
            }
        }
        // KhoiDT
        public int Upd_Disable_ByCode_ByLang(string Code, bool NewDisable, int IDLang)
        {
            try
            {
                List<ExtendProperties> aListExtendProperties = aDatabaseDA.ExtendProperties.Where(b => b.Code == Code).Where(z => z.IDLang == IDLang).ToList();
                if (aListExtendProperties.Count > 0)
                {
                    aListExtendProperties[0].Disable = NewDisable;
                    aDatabaseDA.ExtendProperties.AddOrUpdate(aListExtendProperties[0]);
                    return aDatabaseDA.SaveChanges();

                }
                return 0;
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("Upd_Disable_ByCode_ByLang:{0}", ex.Message));
            }
        }


        public int Ins(ExtendProperties aExtendProperties)
        {
            try
            {
                aDatabaseDA.ExtendProperties.Add(aExtendProperties);
                return aDatabaseDA.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("ExtendPropertiesBO.Ins: {0}", ex.Message));
            }
        }
        public int Upd(ExtendProperties aExtendProperties)
        {
            try
            {
                aDatabaseDA.ExtendProperties.AddOrUpdate(aExtendProperties);
                return aDatabaseDA.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("ExtendPropertiesBO.Upd: {0}", ex.Message));
            }
        }
        public int Upd_ByCode_ByIDLang(ExtendProperties aExtendProperties)
        {
            try
            {
                List<ExtendProperties> aListExtendProperties = aDatabaseDA.ExtendProperties.Where(n => n.Code == aExtendProperties.Code && n.IDLang == aExtendProperties.IDLang).ToList();
                if (aListExtendProperties.Count > 0)
                {
                    aDatabaseDA.ExtendProperties.AddOrUpdate(aListExtendProperties[0]);
                    return aDatabaseDA.SaveChanges();
                }
                else
                {
                    return 0;
                }
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("ExtendPropertiesBO.Upd_ByCode_ByIDLang: {0}", ex.Message));
            }
        }

       
       
       


    
    }
}
