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
    public  class CategoryLevel1BO
    {
 
        DatabaseDA aDatabaseDA = new DatabaseDA();

        //-----------------------------------------------------------------------------
        public List<CategoryLevel1> Sel()
        {
            try
            {
                return aDatabaseDA.CategoryLevel1.ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel1BO.Sel: {0}", ex.Message));
            }
        }
        public List<CategoryLevel1> Sel(bool Disable)
        {
            try
            {
                return aDatabaseDA.CategoryLevel1.Where(r => r.Disable == Disable).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel1BO.Sel: {0}", ex.Message));
            }
        }
        //tqtrung
        public List<CategoryLevel1> Sel_ByCode(string Code)
        {
            try
            {
                return aDatabaseDA.CategoryLevel1.Where(c=>c.Code==Code).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel1BO.Sel_ByCode: {0}", ex.Message));
            }
        }
        public List<CategoryLevel1> Sel_ByCode(string Code, bool Disable)
        {
            try
            {
                return aDatabaseDA.CategoryLevel1.Where(c => c.Code == Code).Where(c => c.Disable == Disable).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel1BO.Sel_ByCode: {0}", ex.Message));
            }
        }

        public CategoryLevel1 Sel_ByCode_ByIDLang(string Code, int IDLang)
        {
            try
            {
                List<CategoryLevel1> aListCategoryLevel1 = aDatabaseDA.CategoryLevel1.Where(b => b.Code == Code && b.IDLang == IDLang).ToList();
                if (aListCategoryLevel1.Count > 0)
                {
                    return aListCategoryLevel1[0];
                }
                else
                {
                    return null;
                }
            }

            catch (Exception ex)
            {
                //return null;
                throw new Exception(String.Format("CategoryLevel1BO.Sel_ByCode_ByIDLang: {0}", ex.Message));
            }
        }
        public CategoryLevel1 Sel_ByCode_ByIDLang(string Code, int IDLang, bool Disable)
        {
            try
            {
                List<CategoryLevel1> aListCategoryLevel1 = aDatabaseDA.CategoryLevel1.Where(b => b.Code == Code).Where(b => b.IDLang == IDLang).Where(b => b.Disable == Disable).ToList();
                if (aListCategoryLevel1.Count > 0)
                {
                    return aListCategoryLevel1[0];
                }
                else
                {
                    return null;
                }
            }

            catch (Exception ex)
            {
                //return null;
                throw new Exception(String.Format("CategoryLevel1BO.Sel_ByCode_ByIDLang: {0}", ex.Message));
            }
        }

        public CategoryLevel1 Sel_ByID(Int32 ID)
        {
            try
            {
                List<CategoryLevel1> aListCategoryLevel1 = aDatabaseDA.CategoryLevel1.Where(b => b.ID == ID).ToList();
                if (aListCategoryLevel1.Count > 0)
                {
                    return aListCategoryLevel1[0];
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel1BO.Sel: {0}", ex.Message));
            }
        }
        public CategoryLevel1 Sel_ByID(Int32 ID, bool Disable)
        {
            try
            {
                List<CategoryLevel1> aListCategoryLevel1 = aDatabaseDA.CategoryLevel1.Where(b => b.ID == ID).Where(b => b.Disable == Disable).ToList();
                if (aListCategoryLevel1.Count > 0)
                {
                    return aListCategoryLevel1[0];
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel1BO.Sel: {0}", ex.Message));
            }
        }
        // tqtrung
        public List<vw_CategoryLevel1ViewAll> Sel_Ext_ByCodeCategoryLevel2(string CodeCategoryLevel2)
        {
            try
            {
                return aDatabaseDA.vw_CategoryLevel1ViewAll.Where(p => p.CategoryLevel2_Code == CodeCategoryLevel2).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel1BO.Sel_ByCodeCategoryLevel2: {0}", ex.Message));
            }
        }
        //tqtrung
        public int InsCategoryLevel1_CategoryLevel2(CategoryLevel1_CategoryLevel2 aCategoryLevel1_CategoryLevel2)
        {
            try
            {
                aDatabaseDA.CategoryLevel1_CategoryLevel2.Add(aCategoryLevel1_CategoryLevel2);
                return aDatabaseDA.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel1BO.InsCategoryLevel1_CategoryLevel2: {0}", ex.Message));
            }
        }
        public List<vw_CategoryLevel1ViewAll> Sel_Ext_ByCodeCategoryLevel2(string CodeCategoryLevel2, int IDLang, bool Disable)
        {
            try
            {
                return aDatabaseDA.vw_CategoryLevel1ViewAll.Where(p => p.CategoryLevel2_Code == CodeCategoryLevel2).Where(z => z.CategoryLevel1_CategoryLevel2_IDLang == IDLang).Where(p => p.CategoryLevel1_CategoryLevel2_Disable == Disable).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel1BO.Sel_ByCodeCategoryLevel2: {0}", ex.Message));
            }
        }

        public List<vw_CategoryLevel1ViewAll> Sel_Ext_ByCodeCategoryLevel2_ByIDLang(string CodeCategoryLevel2, int IDLang)
        {
            try
            {
                return aDatabaseDA.vw_CategoryLevel1ViewAll.Where(p => p.CategoryLevel2_Code == CodeCategoryLevel2).Where(h => h.CategoryLevel1_CategoryLevel2_IDLang == IDLang).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel1BO.Sel_ByCodeCategoryLevel2_ByIDLang: {0}", ex.Message));
            }
        }
        public List<vw_CategoryLevel1ViewAll> Sel_Ext_ByCodeCategoryLevel2_ByIDLang(string CodeCategoryLevel2, int IDLang, bool Disable)
        {
            try
            {
                return aDatabaseDA.vw_CategoryLevel1ViewAll.Where(p => p.CategoryLevel2_Code == CodeCategoryLevel2).Where(h => h.CategoryLevel1_CategoryLevel2_IDLang == IDLang).Where(h => h.CategoryLevel1_CategoryLevel2_Disable == Disable).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel1BO.Sel_ByCodeCategoryLevel2_ByIDLang: {0}", ex.Message));
            }
        }

        // Khoi DT
        // Sel_ByType
        public List<CategoryLevel1> Sel_ByType_ByIDLang(int Type,int IDLang) 
        {
            try
            {
                return aDatabaseDA.CategoryLevel1.Where(p => p.Type == Type).Where(z=>z.IDLang==IDLang).ToList();
            }
            catch (Exception ex) 
            {
                throw new Exception(String.Format("CategoryLevel1BO.Sel_ByType:{0}", ex.Message));
            }
        }
        public List<CategoryLevel1> Sel_ByType_ByIDLang(int Type, int IDLang, bool Disable)
        {
            try
            {
                return aDatabaseDA.CategoryLevel1.Where(p => p.Type == Type).Where(z => z.IDLang == IDLang).Where(z => z.Disable == Disable).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel1BO.Sel_ByType:{0}", ex.Message));
            }
        }

        // KhoiDT
        // Sel_ByStatus
        public List<CategoryLevel1> Sel_ByStatus_ByIDLang(int Status,int IDLang) 
        {
            try
            {
                return aDatabaseDA.CategoryLevel1.Where(p => p.Status == Status).Where(z=>z.IDLang==IDLang).ToList();
            }
            catch (Exception ex) 
            {
                throw new Exception(String.Format("CategoryLevel1BO.Sel_ByStatus:{0}", ex.Message));
            }
        }
        public List<CategoryLevel1> Sel_ByStatus_ByIDLang(int Status, int IDLang, bool Disable)
        {
            try
            {
                return aDatabaseDA.CategoryLevel1.Where(p => p.Status == Status).Where(z => z.IDLang == IDLang).Where(z => z.Disable == Disable).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel1BO.Sel_ByStatus:{0}", ex.Message));
            }
        }

        // KhoiDT ByType_ByStatus_ByIDLang
        public List<CategoryLevel1> Sel_ByType_ByStatus_ByIDLang(int Type, int Status, int IDLang) 
        {
            try
            {
                return aDatabaseDA.CategoryLevel1.Where(c => c.Type == Type).Where(p => p.Status == Status).Where(z => z.IDLang == IDLang).ToList();
            }
            catch (Exception ex) 
            {
                throw new Exception(String.Format("CategoryLevel1BO.Sel_ByType_ByStatus_ByIDLang:{0}", ex.Message));
            }
        }
        public List<CategoryLevel1> Sel_ByType_ByStatus_ByIDLang(int Type, int Status, int IDLang, bool Disable)
        {
            try
            {
                return aDatabaseDA.CategoryLevel1.Where(c => c.Type == Type).Where(p => p.Status == Status).Where(z => z.IDLang == IDLang).Where(z => z.Disable == Disable).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel1BO.Sel_ByType_ByStatus_ByIDLang:{0}", ex.Message));
            }
        }

        //tqtrung
        public List<CategoryLevel1> Sel_ByIDAlbum(int IDAlbum)
        {
            try
            {
                return aDatabaseDA.CategoryLevel1.Where(c => c.IDAlbum == IDAlbum).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel1BO.Sel_ByIDAlbum: {0}", ex.Message));
            }
        }
        public List<CategoryLevel1> Sel_ByIDAlbum(int IDAlbum, bool Disable)
        {
            try
            {
                return aDatabaseDA.CategoryLevel1.Where(c => c.IDAlbum == IDAlbum).Where(c => c.Disable == Disable).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel1BO.Sel_ByIDAlbum: {0}", ex.Message));
            }
        }

        //tqtrung
        public List<CategoryLevel1> Sel_ByIDAlbum_ByIDLang(int IDAlbum,int IDLang)
        {
            try
            {
                return aDatabaseDA.CategoryLevel1.Where(c => c.IDAlbum == IDAlbum).Where(d=>d.IDLang==IDLang).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel1BO.Sel_ByIDAlbum_ByIDLang: {0}", ex.Message));
            }
        }
        public List<CategoryLevel1> Sel_ByIDAlbum_ByIDLang(int IDAlbum, int IDLang, bool Disable)
        {
            try
            {
                return aDatabaseDA.CategoryLevel1.Where(c => c.IDAlbum == IDAlbum).Where(d => d.IDLang == IDLang).Where(d => d.Disable == Disable).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel1BO.Sel_ByIDAlbum_ByIDLang: {0}", ex.Message));
            }
        }
        // 
        // NgocBM thieu IDAlbum tren cua view CategoryLevel1Album 

        //public List<vw_CategoryLevel1ViewAll> Sel_All_ByIDLang(int IDLang)
        //{
        //    try
        //    {
        //        return aDatabaseDA.vw_CategoryLevel1ViewAll.Where(p => p.CategoryLevel1_CategoryLevel2_IDLang == IDLang).ToList();
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new Exception(String.Format("CategoryLevel1BO.Sel_all_ByIDLang: {0}", ex.Message));
        //    }
        //}

        public List<CategoryLevel1> Sel_ByIDLang(int IDLang)
        {
            try
            {
                return aDatabaseDA.CategoryLevel1.Where(p => p.IDLang == IDLang).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel1BO.Sel_All_ByIDLang: {0}", ex.Message));
            }
        }
        public List<CategoryLevel1> Sel_ByIDLang(int IDLang, bool Disable)
        {
            try
            {
                return aDatabaseDA.CategoryLevel1.Where(p => p.IDLang == IDLang).Where(p => p.Disable == Disable).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel1BO.Sel_All_ByIDLang: {0}", ex.Message));
            }
        }     

        //public List<vw_CategoryLevel1ViewAll> Sel_All_ByStatus_ByIDLang(int Status, int IDLang)
        //{
        //    try
        //    {
        //        return aDatabaseDA.vw_CategoryLevel1ViewAll.Where(p => p.CategoryLevel1_Status == Status).Where(p => p.CategoryLevel1_CategoryLevel2_IDLang == IDLang).ToList();
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new Exception(String.Format("CategoryLevel1BO.Sel_All_ByStatus_ByIDLang: {0}", ex.Message));
        //    }
        //}

        //public List<vw_CategoryLevel1ViewAll> Sel_All_ByDisable_ByIDLang(bool Disable, int IDLang)
        //{
        //    try
        //    {
        //        return aDatabaseDA.vw_CategoryLevel1ViewAll.Where(p => p.CategoryLevel1_Disable == Disable).Where(p => p.CategoryLevel1_CategoryLevel2_IDLang == IDLang).ToList();
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new Exception(String.Format("CategoryLevel1BO.Sel_All_ByDisable_ByIDLang: {0}", ex.Message));
        //    }
        //}

        //tqtrung
      
    
       

        public  int Ins(CategoryLevel1 aCategoryLevel1)
        {
            try
            {
				aDatabaseDA.CategoryLevel1.Add(aCategoryLevel1);
                return aDatabaseDA.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel1BO.Ins: {0}", ex.Message));
            }
        }
        public int Ins(ref List<CategoryLevel1> aListCategoryLevel1)
        {
            try
            {
                aListCategoryLevel1 = aDatabaseDA.CategoryLevel1.AddRange(aListCategoryLevel1).ToList();
                return aDatabaseDA.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel1BO.Ins: {0}", ex.Message));
            }
        }

        public  int Upd(CategoryLevel1 aCategoryLevel1)
        {
            try
            {
				aDatabaseDA.CategoryLevel1.AddOrUpdate(aCategoryLevel1);
                return aDatabaseDA.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel1BO.Upd: {0}", ex.Message));
            }
        }
        
        //tqtrung
        public int Upd_Status_ByID(int NewStatus,int ID)
        {
            try
            {
                List<CategoryLevel1> aListCategoryLevel1 = aDatabaseDA.CategoryLevel1.Where(c => c.ID == ID).ToList();
           
                if (aListCategoryLevel1 != null)
                {
                    aListCategoryLevel1[0].Status = NewStatus;
                    aDatabaseDA.CategoryLevel1.AddOrUpdate(aListCategoryLevel1[0]);
                }
                    return aDatabaseDA.SaveChanges();
              
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel1BO.Upd_Status_ByID: {0}", ex.Message));
            }
        }
        //tqtrung
        public int Upd_Type_ByID(int NewType, int ID)
        {
            try
            {
                List<CategoryLevel1> aListCategoryLevel1 = aDatabaseDA.CategoryLevel1.Where(c => c.ID == ID).ToList();

                if (aListCategoryLevel1 != null)
                {
                    aListCategoryLevel1[0].Type = NewType;
                    aDatabaseDA.CategoryLevel1.AddOrUpdate(aListCategoryLevel1[0]);
                }
                return aDatabaseDA.SaveChanges();

            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel1BO.Upd_Type_ByID: {0}", ex.Message));
            }
        }
        //tqtrung
        public int Upd_Disable_ByID(bool NewDisable, int ID)
        {
            try
            {
                List<CategoryLevel1> aListCategoryLevel1 = aDatabaseDA.CategoryLevel1.Where(c => c.ID == ID).ToList();

                if (aListCategoryLevel1 != null)
                {
                    aListCategoryLevel1[0].Disable = NewDisable;
                    aDatabaseDA.CategoryLevel1.AddOrUpdate(aListCategoryLevel1[0]);
                }
                return aDatabaseDA.SaveChanges();

            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel1BO.Upd_Disable_ByID: {0}", ex.Message));
            }
        }
        //tqtrung
        public int Upd_Status_ByCode(int NewStatus,string Code)
        {
            try
            {
                List<CategoryLevel1> aListCategoryLevel1 = aDatabaseDA.CategoryLevel1.Where(c => c.Code == Code).ToList();
                if (aListCategoryLevel1 != null)
                {
                    for (int i = 0; i < aListCategoryLevel1.Count; i++)
                    {
                        aListCategoryLevel1[i].Status = NewStatus;
                        aDatabaseDA.CategoryLevel1.AddOrUpdate(aListCategoryLevel1[i]);
                    }
                  
                  
                }
                return aDatabaseDA.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel1BO.Upd_ByCode: {0}", ex.Message));
            }
        }
        //tqtrung
        public int Upd_Type_ByCode(int NewType, string Code)
        {
            try
            {
                List<CategoryLevel1> aListCategoryLevel1 = aDatabaseDA.CategoryLevel1.Where(c => c.Code == Code).ToList();
                if (aListCategoryLevel1 != null)
                {
                    for (int i = 0; i < aListCategoryLevel1.Count; i++)
                    {
                        aListCategoryLevel1[i].Type = NewType;
                        aDatabaseDA.CategoryLevel1.AddOrUpdate(aListCategoryLevel1[i]);
                    }


                }
                return aDatabaseDA.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel1BO.Upd_Type_ByCode: {0}", ex.Message));
            }
        }
        //tqtrung
        public int Upd_Disable_ByCode(bool NewDisable, string Code)
        {
            try
            {
                List<CategoryLevel1> aListCategoryLevel1 = aDatabaseDA.CategoryLevel1.Where(c => c.Code == Code).ToList();
                if (aListCategoryLevel1 != null)
                {
                    for (int i = 0; i < aListCategoryLevel1.Count; i++)
                    {
                        aListCategoryLevel1[i].Disable = NewDisable;
                        aDatabaseDA.CategoryLevel1.AddOrUpdate(aListCategoryLevel1[i]);
                    }


                }
                return aDatabaseDA.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel1BO.Upd_Disable_ByCode: {0}", ex.Message));
            }
        }
        //tqtrung
        public int Upd_Status_ByCode_ByIDLang(int NewStatus,string Code,int IDLang)
        {
            try
            {
                List<CategoryLevel1> aListCategoryLevel1 = aDatabaseDA.CategoryLevel1.Where(c => c.Code == Code).Where(b=>b.IDLang==IDLang).ToList();
                if (aListCategoryLevel1 != null)
                {
                    aListCategoryLevel1[0].Status=NewStatus;
                aDatabaseDA.CategoryLevel1.AddOrUpdate(aListCategoryLevel1[0]);
                  
                }
                return aDatabaseDA.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel1BO.Upd_ByCode_ByIDLang: {0}", ex.Message));
            }
        }
        //tqtrung
        public int Upd_Type_ByCode_ByIDLang(int NewType, string Code, int IDLang)
        {
            try
            {
                List<CategoryLevel1> aListCategoryLevel1 = aDatabaseDA.CategoryLevel1.Where(c => c.Code == Code).Where(b => b.IDLang == IDLang).ToList();
                if (aListCategoryLevel1 != null)
                {
                    aListCategoryLevel1[0].Type = NewType;
                    aDatabaseDA.CategoryLevel1.AddOrUpdate(aListCategoryLevel1[0]);

                }
                return aDatabaseDA.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel1BO.Upd_Type_ByCode_ByIDLang: {0}", ex.Message));
            }
        }
        //tqtrung
        public int Upd_Disable_ByCode_ByIDLang(bool NewDisable, string Code, int IDLang)
        {
            try
            {
                List<CategoryLevel1> aListCategoryLevel1 = aDatabaseDA.CategoryLevel1.Where(c => c.Code == Code).Where(b => b.IDLang == IDLang).ToList();
                if (aListCategoryLevel1 != null)
                {
                    aListCategoryLevel1[0].Disable = NewDisable;
                    aDatabaseDA.CategoryLevel1.AddOrUpdate(aListCategoryLevel1[0]);

                }
                return aDatabaseDA.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel1BO.Upd_Disable_ByCode_ByIDLang: {0}", ex.Message));
            }
        }
        
        public int Del()
        {
            try
            {
                List<CategoryLevel1> aListCategoryLevel1 = this.Sel();
                if (aListCategoryLevel1 != null)
                {

                    aDatabaseDA.CategoryLevel1.RemoveRange(aListCategoryLevel1);
                    return aDatabaseDA.SaveChanges();
                }
                else
                {
                      throw new Exception(String.Format("CategoryLevel1BO.Del: {0}", "Không tìm thấy CategoryLevel1"));
                }
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel1BO.Del: {0}", ex.Message));
            }
        }
        
        //tqtrung
        public int Del_ByCode(string Code)
        {
            try
            {
               List<CategoryLevel1> aListCategoryLevel1 =aDatabaseDA.CategoryLevel1.Where(c=>c.Code==Code).ToList();
                if (aListCategoryLevel1 != null)
                {
                    aDatabaseDA.CategoryLevel1.RemoveRange(aListCategoryLevel1);
                    return aDatabaseDA.SaveChanges();
                }
                else
                {
                    throw new Exception(String.Format("CategoryLevel1BO.Del_All: {0}", "Không tìm thấy CategoryLevel1"));
                }
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel1BO.Del_All: {0}", ex.Message));
            }
        }
        //tqtrung
        public int Del_ByListCode(List<string> ListCode)
        {
            try
            {
                List<CategoryLevel1> aListCategoryLevel1 = aDatabaseDA.CategoryLevel1.Where(c => ListCode.Contains(c.Code)).ToList();
              
                if (aListCategoryLevel1 != null)
                {
                    aDatabaseDA.CategoryLevel1.RemoveRange(aListCategoryLevel1);
                    return aDatabaseDA.SaveChanges();
                }
                else
                {
                    throw new Exception(String.Format("CategoryLevel1BO.Del_ByListCode: {0}", "Không tìm thấy CategoryLevel1"));
                }
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel1BO.Del_ByListCode: {0}", ex.Message));
            }
        }
        //tqtrung
        public int Del_ByCode_ByIDLang(string Code,int IDLang)
        {
            try
            {
                List<CategoryLevel1> aListCategoryLevel1 = aDatabaseDA.CategoryLevel1.Where(c => c.Code == Code).Where(b=>b.IDLang==IDLang).ToList();
                if (aListCategoryLevel1 != null)
                {
                    aDatabaseDA.CategoryLevel1.Remove(aListCategoryLevel1[0]);
                    return aDatabaseDA.SaveChanges();
                }
                else
                {
                    throw new Exception(String.Format("CategoryLevel1BO.Del_ByCode_ByIDLang: {0}", "Không tìm thấy CategoryLevel1"));
                }
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel1BO.Del_ByCode_ByIDLang: {0}", ex.Message));
            }
        }
        //tqtrung
        public int Del_ByID(int ID)
        {
            try
            {
              List<CategoryLevel1> aListCategoryLevel1 = aDatabaseDA.CategoryLevel1.Where(c => c.ID == ID).ToList();
                if (aListCategoryLevel1 != null)
                {
                    aDatabaseDA.CategoryLevel1.Remove(aListCategoryLevel1[0]);
                    return aDatabaseDA.SaveChanges();
                }
                else
                {
                    throw new Exception(String.Format("CategoryLevel1BO.Del_ByID: {0}", "Không tìm thấy CategoryLevel1"));
                }
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel1BO.Del_ByID: {0}", ex.Message));
            }
        }
        //tqtrung
        public int Del_ByListID(List<int> ListID)
        {
            try
            {
                List<CategoryLevel1> aListCategoryLevel1 = aDatabaseDA.CategoryLevel1.Where(c => ListID.Contains(c.ID)).ToList();

                if (aListCategoryLevel1 != null)
                {
                    aDatabaseDA.CategoryLevel1.RemoveRange(aListCategoryLevel1);
                    return aDatabaseDA.SaveChanges();
                }
                else
                {
                    throw new Exception(String.Format("CategoryLevel1BO.Del_ByListID: {0}", "Không tìm thấy CategoryLevel1"));
                }
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel1BO.Del_ByListID: {0}", ex.Message));
            }
        }
        //================================================================================================================================

        //############################################################################
        //NgocBM

        public List<vw_CategoryLevel1ViewAll> Sel_Ext_ByCode(string Code)
        {
            try
            {
                return aDatabaseDA.vw_CategoryLevel1ViewAll.Where(b => b.CategoryLevel1_Code == Code).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("Sel_Ext_ByCodeCategoryLevel1:{0}", ex.Message));
            }
        }
        public List<vw_CategoryLevel1ViewAll> Sel_Ext_ByCode(string Code, bool Disable)
        {
            try
            {
                return aDatabaseDA.vw_CategoryLevel1ViewAll.Where(b => b.CategoryLevel1_Code == Code).Where(p => p.CategoryLevel1_Disable == Disable).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("Sel_Ext_ByCodeCategoryLevel1:{0}", ex.Message));
            }
        }

        public List<vw_CategoryLevel1ViewAll> Sel_ByKeyCodeCategoryLevel1_ByIDLang(string Key, int IDLang)
        {
            try
            {
                ConfigsBO aConfigsBO = new ConfigsBO();
                CategoryLevel1BO aCategoryLevel1BO = new CategoryLevel1BO();

                string Code = aConfigsBO.Sel_ByAccessKey(Key).Value;

                return this.aDatabaseDA.vw_CategoryLevel1ViewAll.Where(p => p.CategoryLevel1_Code == Code).Where(p => p.CategoryLevel1_CategoryLevel2_IDLang == IDLang).ToList();


            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel1BO.SelectCategoryLevel1_ByCode_002: {0}", ex.Message));
            }
        }
        public List<vw_CategoryLevel1ViewAll> Sel_ByKeyCodeCategoryLevel1_ByIDLang(string Key, int IDLang, bool Disable)
        {
            try
            {
                ConfigsBO aConfigsBO = new ConfigsBO();
                CategoryLevel1BO aCategoryLevel1BO = new CategoryLevel1BO();

                string Code = aConfigsBO.Sel_ByAccessKey(Key).Value;

                return this.aDatabaseDA.vw_CategoryLevel1ViewAll.Where(p => p.CategoryLevel1_Code == Code).Where(p => p.CategoryLevel1_CategoryLevel2_IDLang == IDLang).Where(p => p.CategoryLevel1_Disable == Disable).ToList();


            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel1BO.SelectCategoryLevel1_ByCode_002: {0}", ex.Message));
            }
        }


        public List<vw_CategoryLevel1ViewAll> Sel_ByKeyCodeCategoryLevel2_ByIDLang(string Key, int IDLang)
        {
            try
            {
                ConfigsBO aConfigsBO = new ConfigsBO();
                CategoryLevel1BO aCategoryLevel1BO = new CategoryLevel1BO();

                string Code = aConfigsBO.Sel_ByAccessKey(Key).Value;

                return this.aDatabaseDA.vw_CategoryLevel1ViewAll.Where(p => p.CategoryLevel1_Code == Code).Where(p => p.CategoryLevel1_CategoryLevel2_IDLang == IDLang).ToList();


            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel1BO.Sel_ByKeyCodeCategoryLevel2_ByIDLang: {0}", ex.Message));
            }
        }
        public List<vw_CategoryLevel1ViewAll> Sel_ByKeyCodeCategoryLevel2_ByIDLang(string Key, int IDLang, bool Disable)
        {
            try
            {
                ConfigsBO aConfigsBO = new ConfigsBO();
                CategoryLevel1BO aCategoryLevel1BO = new CategoryLevel1BO();

                string Code = aConfigsBO.Sel_ByAccessKey(Key).Value;

                return this.aDatabaseDA.vw_CategoryLevel1ViewAll.Where(p => p.CategoryLevel1_Code == Code).Where(p => p.CategoryLevel1_CategoryLevel2_IDLang == IDLang).Where(p => p.CategoryLevel1_Disable == Disable).ToList();


            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel1BO.Sel_ByKeyCodeCategoryLevel2_ByIDLang: {0}", ex.Message));
            }
        }



    }
}
