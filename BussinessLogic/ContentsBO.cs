using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Data.Entity.Core.Objects;
using System.Configuration;
using System.Linq;
using DataAccess;
using EntitiesExt;

namespace BussinessLogic
{
    public  class ContentsBO
    {

        DatabaseDA aDatabaseDA = new DatabaseDA();


        public List<vw_ContentViewAll> Sel_Ext_ByIDLang(int IDLang) 
        {
            try
            {
                return aDatabaseDA.vw_ContentViewAll.Where(p => p.Contents_CategoryLevel1_IDLang == IDLang).ToList();
            }
            catch (Exception ex)  
            {
                throw new Exception(String.Format("ContentsBO.Sel_Ext_ByIDLang: {0}", ex.Message));
            }
        }
        public List<vw_ContentViewAll> Sel_Ext_ByIDLang(int IDLang, bool Disable)
        {
            try
            {
                return aDatabaseDA.vw_ContentViewAll.Where(p => p.Contents_CategoryLevel1_IDLang == IDLang).Where(p => p.CategoryLevel1_Disable == Disable).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("ContentsBO.Sel_all_ByIDLang: {0}", ex.Message));
            }
        }

        public List<vw_ContentViewAll> Sel_Ext_ByCodeCategoryLevel1(string Code)
        {
            try
            {
                return aDatabaseDA.vw_ContentViewAll.Where(b => b.CategoryLevel1_Code == Code).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("Sel_Ext_ByCodeCategoryLevel1:{0}", ex.Message));
            }
        }
        public List<vw_ContentViewAll> Sel_Ext_ByCodeCategoryLevel1(string Code, bool Disable)
        {
            try
            {
                return aDatabaseDA.vw_ContentViewAll.Where(b => b.CategoryLevel1_Code == Code).Where(p=>p.Contents_CategoryLevel1_Disable == Disable).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("Sel_Ext_ByCodeCategoryLevel1:{0}", ex.Message));
            }
        }

        public List<vw_ContentViewAll> Sel_Ext_ByCodeCategoryLevel1_ByIDLang(string Code, int IDLang)
        {
            try
            {
                return aDatabaseDA.vw_ContentViewAll.Where(b => b.CategoryLevel1_Code == Code).Where(b => b.Contents_CategoryLevel1_IDLang == IDLang).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("Sel_Ext_ByCodeCategoryLevel1_ByIDLang:{0}", ex.Message));
            }
        }
        public List<vw_ContentViewAll> Sel_Ext_ByCodeCategoryLevel1_ByIDLang(string Code, bool Disable, int IDLang)
        {
            try
            {
                return aDatabaseDA.vw_ContentViewAll.Where(b => b.CategoryLevel1_Code == Code).Where(p => p.Contents_CategoryLevel1_Disable == Disable).Where(p => p.Contents_CategoryLevel1_IDLang == IDLang).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("Sel_Ext_ByCodeCategoryLevel1_ByIDLang:{0}", ex.Message));
            }
        }



        // Khoi DT
        // Sel_ByType
        public List<Contents> Sel_ByType_ByIDLang(int Type, int IDLang)
        {
            try
            {
                return aDatabaseDA.Contents.Where(p => p.Type == Type).Where(z => z.IDLang == IDLang).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("ContentsBO.Sel_ByType:{0}", ex.Message));
            }
        }
        public List<Contents> Sel_ByType_ByIDLang(int Type, int IDLang, bool Disable)
        {
            try
            {
                return aDatabaseDA.Contents.Where(p => p.Type == Type).Where(z => z.IDLang == IDLang).Where(z => z.Disable == Disable).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("ContentsBO.Sel_ByType:{0}", ex.Message));
            }
        }

        // KhoiDT
        // Sel_ByStatus
        public List<Contents> Sel_ByStatus_ByIDLang(int Status, int IDLang)
        {
            try
            {
                return aDatabaseDA.Contents.Where(p => p.Status == Status).Where(z => z.IDLang == IDLang).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("ContentsBO.Sel_ByStatus:{0}", ex.Message));
            }
        }
        public List<Contents> Sel_ByStatus_ByIDLang(int Status, int IDLang, bool Disable)
        {
            try
            {
                return aDatabaseDA.Contents.Where(p => p.Status == Status).Where(z => z.IDLang == IDLang).Where(z => z.Disable == Disable).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("ContentsBO.Sel_ByStatus:{0}", ex.Message));
            }
        }

        // KhoiDT ByType_ByStatus_ByIDLang
        public List<Contents> Sel_ByType_ByStatus_ByIDLang(int Type, int Status, int IDLang)
        {
            try
            {
                return aDatabaseDA.Contents.Where(c => c.Type == Type).Where(p => p.Status == Status).Where(z => z.IDLang == IDLang).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("ContentsBO.Sel_ByType_ByStatus_ByIDLang:{0}", ex.Message));
            }
        }
        public List<Contents> Sel_ByType_ByStatus_ByIDLang_ByDisable(int Type, int Status, int IDLang, bool Disable)
        {
            try
            {
                return aDatabaseDA.Contents.Where(c => c.Type == Type).Where(p => p.Status == Status).Where(z => z.IDLang == IDLang).Where(z => z.Disable == Disable).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("ContentsBO.Sel_ByType_ByStatus_ByIDLang:{0}", ex.Message));
            }
        }

        public List<Contents> Sel_ByCode(string Code)
        {
            try
            {
                return aDatabaseDA.Contents.Where(p => p.Code == Code).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("ContentsBO.Sel_ByCode: {0}", ex.Message));
            }
        }
        public List<Contents> Sel_ByCode(string Code, bool Disable)
        {
            try
            {
                return aDatabaseDA.Contents.Where(p => p.Code == Code).Where(p => p.Disable == Disable).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("ContentsBO.Sel_ByCode: {0}", ex.Message));
            }
        }

        // KhoiDT
        public int Del()
        {
            try
            {
                List<Contents> aTemp = aDatabaseDA.Contents.ToList();
                if (aTemp.Count > 0)
                {
                    aDatabaseDA.Contents.RemoveRange(aTemp);
                    return aDatabaseDA.SaveChanges();
                }
                return 0;
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("ContentsBO.Del_ByCode: {0}", ex.Message));
            }
        }
        //KhoiDT
        public int Upd_Status_ByID(int ID, int NewStatus) 
        {
            try
            {
                List<Contents> aListContent = aDatabaseDA.Contents.Where(b => b.ID == ID).ToList();
                if (aListContent.Count > 0) 
                {
                   
                        aListContent[0].Status = NewStatus;
                        aDatabaseDA.Contents.AddOrUpdate(aListContent[0]);
                        return aDatabaseDA.SaveChanges();
                    
                }
                return 0;
            }
            catch (Exception ex) 
            {
                throw new Exception(String.Format("Upd_Status_ByID:{0}", ex.Message));
            }
        }
        // KhoiDT
        public int Upd_Type_ByID(int ID, int NewType) 
        {
            try
            {
                List<Contents> aListContent = aDatabaseDA.Contents.Where(b => b.ID == ID).ToList();
                if (aListContent.Count > 0) 
                {
                   
                        aListContent[0].Type = NewType;
                        aDatabaseDA.Contents.AddOrUpdate(aListContent[0]);
                        return aDatabaseDA.SaveChanges();
                    
                }
                return 0;
               
            }
            catch (Exception ex) 
            {
                throw new Exception(String.Format("Upd_Type_ByID:{0}", ex.Message));
            }
        }

        // KhoiDT
        public int Upd_Disable_ByID(int ID,bool NewDisable) 
        {
            try
            {
                List<Contents> aListContent = aDatabaseDA.Contents.Where(b => b.ID == ID).ToList();
                if (aListContent.Count > 0) 
                {
                   
                        aListContent[0].Disable = NewDisable;
                        aDatabaseDA.Contents.AddOrUpdate(aListContent[0]);
                        return aDatabaseDA.SaveChanges();
                    
                }
                return 0;
            }
            catch (Exception ex) 
            {
                throw new Exception(String.Format("Upd_Disable_ByID:{0}", ex.Message));
            }
        }
        // KhoiDT
        public int Upd_Status_ByCode(string Code, int NewStatus) 
        {
            try
            {
                List<Contents> aListContent = aDatabaseDA.Contents.Where(b => b.Code==Code).ToList();
                if (aListContent.Count > 0)
                {
                   
                        aListContent[0].Status = NewStatus;
                        aDatabaseDA.Contents.AddOrUpdate(aListContent[0]);
                        return aDatabaseDA.SaveChanges();
                   
                }
                return 0;
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("Upd_Status_ByCode:{0}", ex.Message));
            }
        }
        // KhoiDT
        public int Upd_Type_ByCode(string Code, int NewType) 
        {
            try
            {
                List<Contents> aListContent = aDatabaseDA.Contents.Where(b => b.Code==Code).ToList();
                if (aListContent.Count > 0)
                {
                   
                        aListContent[0].Type = NewType;
                        aDatabaseDA.Contents.AddOrUpdate(aListContent[0]);
                        return aDatabaseDA.SaveChanges();
                   
                }
                return 0;
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("Upd_Type_ByCode:{0}", ex.Message));
            }
        }
        // KhoiDT
        public int Upd_Disable_ByCode(string Code,bool NewDisable) 
        {
            try
            {
                 List<Contents> aListContent = aDatabaseDA.Contents.Where(b => b.Code==Code).ToList();
                 if (aListContent.Count > 0)
                  {
                        aListContent[0].Disable = NewDisable;
                        aDatabaseDA.Contents.AddOrUpdate(aListContent[0]);
                        return aDatabaseDA.SaveChanges();
                   
                  }
                 return 0;
            }
            catch (Exception ex) 
            {
                throw new Exception(String.Format("Upd_Type_ByCode:{0}", ex.Message));
            }
        }
        // KhoiDT
        public int Upd_Status_ByCode_ByLang(string Code, int NewStatus, int IDLang) 
        {
            try
            {
                List<Contents> aListContent = aDatabaseDA.Contents.Where(b => b.Code == Code).Where(z=>z.IDLang==IDLang).ToList();
                if (aListContent.Count > 0)
                {
                    aListContent[0].Status = NewStatus;
                    aDatabaseDA.Contents.AddOrUpdate(aListContent[0]);
                    return aDatabaseDA.SaveChanges();

                }
                return 0;
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("Upd_Status_ByCode_ByLang:{0}", ex.Message));
            }
        }
        // KhoiDT

        public int Upd_Type_ByCode_ByLang(string Code,int NewType,int IDLang) 
        {
            try
            {
                List<Contents> aListContent = aDatabaseDA.Contents.Where(b => b.Code == Code).Where(z => z.IDLang == IDLang).ToList();
                if (aListContent.Count > 0)
                {
                    aListContent[0].Type = NewType;
                    aDatabaseDA.Contents.AddOrUpdate(aListContent[0]);
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
                List<Contents> aListContent = aDatabaseDA.Contents.Where(b => b.Code == Code).Where(z => z.IDLang == IDLang).ToList();
                if (aListContent.Count > 0)
                {
                    aListContent[0].Disable = NewDisable;
                    aDatabaseDA.Contents.AddOrUpdate(aListContent[0]);
                    return aDatabaseDA.SaveChanges();

                }
                return 0;
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("Upd_Disable_ByCode_ByLang:{0}", ex.Message));
            }
        }


        //#######################################################
        //NgocBM

        public int Ins(Contents aContents)
        {
            try
            {
                aDatabaseDA.Contents.AddOrUpdate(aContents);
                return aDatabaseDA.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("ContentsBO.Ins: {0}", ex.Message));
            }
        }
        public int Ins(ref List<Contents> aListContents)
        {
            try
            {
                aListContents = aDatabaseDA.Contents.AddRange(aListContents).ToList();
                return aDatabaseDA.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("ContentsBO.Ins: {0}", ex.Message));
            }
        }
        public int Upd(List<Contents> aListContents)
        {
            try
            {
                aDatabaseDA.Contents.AddOrUpdate(aListContents.ToArray());
                return aDatabaseDA.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("ContentsBO.Ins: {0}", ex.Message));
            }
        }
        public int Upd(Contents aContents)
        {
            try
            {
                aDatabaseDA.Contents.AddOrUpdate(aContents);
                return aDatabaseDA.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("ContentsBO.Upd: {0}", ex.Message));
            }
        }

        public int Del(List<Contents> aListContents)
        {
            try
            {
                aDatabaseDA.Contents.RemoveRange(aListContents);
                return aDatabaseDA.SaveChanges();
                

            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("ContentsBO.Del: {0}", ex.Message));
            }
        }
        public int Del_ByID(Int32 ID)
        {
            try
            {
                List<Contents> aTemp = aDatabaseDA.Contents.Where(p=>p.ID == ID).ToList();
           
                if (aTemp.Count > 0)
                {
                    aDatabaseDA.Contents.Remove(aTemp[0]);
                    return aDatabaseDA.SaveChanges();
                }
                else
                {
                    throw new Exception(String.Format("ContentsBO.Del: {0}", "Không tìm thấy Contents có ID = " + ID));
                }

            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("ContentsBO.Del: {0}", ex.Message));
            }
        }
        public int Del_ByCode(string Code)
        {
            try
            {
                List<Contents> aTemp = aDatabaseDA.Contents.Where(p => p.Code == Code).ToList();
                if (aTemp.Count > 0)
                {
                    aDatabaseDA.Contents.RemoveRange(aTemp);
                    return aDatabaseDA.SaveChanges();
                }
                return 0;
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("ContentsBO.Del_ByCode: {0}", ex.Message));
            }
        }
        public int Del_ByCode_ByIDLang(string Code, int IDLang)
        {
            try
            {
                List<Contents> aTemp = aDatabaseDA.Contents.Where(p => p.Code == Code).Where(p => p.IDLang == IDLang).ToList();
                if (aTemp.Count >0)
                {
                    aDatabaseDA.Contents.Remove(aTemp[0]);
                    return aDatabaseDA.SaveChanges();
                }
                return 0;
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("ContentsBO.Del_ByCode_ByIDLang: {0}", ex.Message));
            }
        }
        public int Del_By_ListCode(List<string> aListCode)
        {
            try
            {
                List<Contents> aTemp = aDatabaseDA.Contents.Where(p => aListCode.Contains(p.Code)).ToList();
                if (aTemp.Count > 0)
                {
                    aDatabaseDA.Contents.RemoveRange(aTemp);
                    return aDatabaseDA.SaveChanges();
                }
                return 0;
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("ContentsBO.Del_ByCode: {0}", ex.Message));
            }
        }
        public int Del_By_ListID(List<int> aListID)
        {
            try
            {
                List<Contents> aTemp = aDatabaseDA.Contents.Where(p => aListID.Contains(p.ID)).ToList();
                if (aTemp.Count > 0)
                {
                    aDatabaseDA.Contents.RemoveRange(aTemp);
                    return aDatabaseDA.SaveChanges();
                }
                return 0;
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("ContentsBO.Del_ByCode: {0}", ex.Message));
            }
        }

        public  Contents Sel_ByID(Int32 ID)
        {
            try
            {
                Contents aContents = aDatabaseDA.Contents.Where(b => b.ID == ID).ToList()[0];
              
                    return aContents;
               
                
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("ContentsBO.Sel: {0}", ex.Message));
            }
        }




        public int RemoveContentFormCategoryLevel1(string CodeContent, string CodeCategoryLevel1)
        {
            try
            {
                DatabaseDA aDatabaseDA = new DatabaseDA();

                List<Contents_CategoryLevel1> aList = aDatabaseDA.Contents_CategoryLevel1.Where(p => p.CodeContents == CodeContent).Where(p => p.CodeCategoryLevel1 == CodeCategoryLevel1).ToList();
                return aDatabaseDA.Contents_CategoryLevel1.RemoveRange(aList).Count();
            }
            catch (Exception ex)
            {
                //return null;
                throw new Exception(String.Format("ContentsBO.RemoveContentFormCategoryLevel1: {0}", ex.Message));
            }

            
        }
        
        public void DisableContentInCategoryLevel1(string CodeContent, string CodeCategoryLevel1)
        {
 
        }
        //NgocBM
        public Contents Sel_ByCode_ByIDLang(string Code, int IDLang)
        {
            try
            {
                CategoryLevel1BO aCategoryLevel1BO = new CategoryLevel1BO();
                List<Contents> aListContents = new List<Contents>();


                aListContents = aDatabaseDA.Contents.Where(a => a.Code == Code).Where(a => a.IDLang == IDLang).ToList();
                if (aListContents.Count > 0)
                {
                    return aListContents[0];
                }
                else
                    return null;
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("ContentsBO.SelectListContents_ByCode_ByCategoryL1: {0}", ex.Message));
            }
        }
        public Contents Sel_ByCode_ByIDLang(string Code, int IDLang, bool Disable)
        {
            try
            {
                CategoryLevel1BO aCategoryLevel1BO = new CategoryLevel1BO();
                List<Contents> aListContents = new List<Contents>();


                aListContents = aDatabaseDA.Contents.Where(a => a.Code == Code).Where(a => a.IDLang == IDLang).Where(a => a.Disable == Disable).ToList();
                if (aListContents.Count > 0)
                {
                    return aListContents[0];
                }
                else
                    return null;
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("ContentsBO.SelectListContents_ByCode_ByCategoryL1: {0}", ex.Message));
            }
        }
        //==========================================================================================================================

        //############################################################################
       
        public List<vw_ContentViewAll> Sel_Ext_ByCode(string Code)
        {
            try
            {
                return aDatabaseDA.vw_ContentViewAll.Where(b => b.Contents_Code == Code).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("Sel_Ext_ByCodeCategoryLevel1:{0}", ex.Message));
            }
        }
        public List<vw_ContentViewAll> Sel_Ext_ByCode(string Code, bool Disable)
        {
            try
            {
                return aDatabaseDA.vw_ContentViewAll.Where(b => b.Contents_Code == Code).Where(p => p.Contents_Disable == Disable).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("Sel_Ext_ByCodeCategoryLevel1:{0}", ex.Message));
            }
        }

        public List<vw_ContentViewAll> Sel_Ext_ByKeyCodeContent_ByIDLang(string Key,  int IDLang)
        {
            try
            {
                ConfigsBO aConfigsBO = new ConfigsBO();
                CategoryLevel1BO aCategoryLevel1BO = new CategoryLevel1BO();

                string Code = aConfigsBO.Sel_ByAccessKey(Key).Value;

                return this.aDatabaseDA.vw_ContentViewAll.Where(p=>p.Contents_Code==Code).Where(p=>p.Contents_CategoryLevel1_IDLang == IDLang).ToList();
             

            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("ContentsBO.SelectContents_ByCode_002: {0}", ex.Message));
            }
        }
        public List<vw_ContentViewAll> Sel_Ext_ByKeyCodeContent_ByIDLang(string Key, int IDLang, bool Disable)
        {
            try
            {
                ConfigsBO aConfigsBO = new ConfigsBO();
                CategoryLevel1BO aCategoryLevel1BO = new CategoryLevel1BO();

                string Code = aConfigsBO.Sel_ByAccessKey(Key).Value;

                return this.aDatabaseDA.vw_ContentViewAll.Where(p => p.Contents_Code == Code).Where(p => p.Contents_CategoryLevel1_IDLang == IDLang).Where(p => p.Contents_Disable == Disable).ToList();


            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("ContentsBO.SelectContents_ByCode_002: {0}", ex.Message));
            }
        }
        public List<vw_ContentViewAll> Sel_Ext_ByKeyCodeCategoryLevel1_ByIDLang(string Key, int IDLang)
        {
            try
            {
                ConfigsBO aConfigsBO = new ConfigsBO();
                CategoryLevel1BO aCategoryLevel1BO = new CategoryLevel1BO();

                string Code = aConfigsBO.Sel_ByAccessKey(Key).Value;

                return this.aDatabaseDA.vw_ContentViewAll.Where(p => p.CategoryLevel1_Code == Code).Where(p => p.Contents_CategoryLevel1_IDLang == IDLang).ToList();


            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("ContentsBO.Sel_ByKeyCodeCategoryLevel1_ByIDLang: {0}", ex.Message));
            }
        }
        public List<vw_ContentViewAll> Sel_Ext_ByKeyCodeCategoryLevel1_ByIDLang(string Key, int IDLang, bool Disable)
        {
            try
            {
                ConfigsBO aConfigsBO = new ConfigsBO();
                CategoryLevel1BO aCategoryLevel1BO = new CategoryLevel1BO();

                string Code = aConfigsBO.Sel_ByAccessKey(Key).Value;

                return this.aDatabaseDA.vw_ContentViewAll.Where(p => p.CategoryLevel1_Code == Code).Where(p => p.Contents_CategoryLevel1_IDLang == IDLang).Where(p => p.Contents_Disable == Disable).ToList();


            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("ContentsBO.Sel_ByKeyCodeCategoryLevel1_ByIDLang: {0}", ex.Message));
            }
        }

        public List<vw_ContentViewAll> Sel_Ext_ByKeyCodeContent(string Key)
        {
            try
            {
                ConfigsBO aConfigsBO = new ConfigsBO();
                CategoryLevel1BO aCategoryLevel1BO = new CategoryLevel1BO();

                string Code = aConfigsBO.Sel_ByAccessKey(Key).Value;

                return this.aDatabaseDA.vw_ContentViewAll.Where(p => p.Contents_Code == Code).ToList();


            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("ContentsBO.SelectContents_ByCode_002: {0}", ex.Message));
            }
        }
        public List<vw_ContentViewAll> Sel_Ext_ByKeyCodeContent(string Key, bool Disable)
        {
            try
            {
                ConfigsBO aConfigsBO = new ConfigsBO();
                CategoryLevel1BO aCategoryLevel1BO = new CategoryLevel1BO();

                string Code = aConfigsBO.Sel_ByAccessKey(Key).Value;

                return this.aDatabaseDA.vw_ContentViewAll.Where(p => p.Contents_Code == Code).Where(p => p.Contents_Disable == Disable).ToList();


            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("ContentsBO.SelectContents_ByCode_002: {0}", ex.Message));
            }
        }
        public List<vw_ContentViewAll> Sel_Ext_ByKeyCodeCategoryLevel1(string Key)
        {
            try
            {
                ConfigsBO aConfigsBO = new ConfigsBO();
                CategoryLevel1BO aCategoryLevel1BO = new CategoryLevel1BO();

                string Code = aConfigsBO.Sel_ByAccessKey(Key).Value;

                return this.aDatabaseDA.vw_ContentViewAll.Where(p => p.CategoryLevel1_Code == Code).ToList();


            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("ContentsBO.Sel_ByKeyCodeCategoryLevel1_ByIDLang: {0}", ex.Message));
            }
        }
        public List<vw_ContentViewAll> Sel_Ext_ByKeyCodeCategoryLevel1(string Key, bool Disable)
        {
            try
            {
                ConfigsBO aConfigsBO = new ConfigsBO();
                CategoryLevel1BO aCategoryLevel1BO = new CategoryLevel1BO();

                string Code = aConfigsBO.Sel_ByAccessKey(Key).Value;

                return this.aDatabaseDA.vw_ContentViewAll.Where(p => p.CategoryLevel1_Code == Code).Where(p => p.Contents_Disable == Disable).ToList();


            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("ContentsBO.Sel_ByKeyCodeCategoryLevel1_ByIDLang: {0}", ex.Message));
            }
        }

    }
}
