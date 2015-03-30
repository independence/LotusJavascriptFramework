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
    public  class CategoryLevel2BO
    {
 
        DatabaseDA aDatabaseDA = new DatabaseDA();
        public int Ins(CategoryLevel2 aCategoryLevel2)
        {
            try
            {
                aDatabaseDA.CategoryLevel2.Add(aCategoryLevel2);
                return aDatabaseDA.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel2BO.Ins: {0}", ex.Message));
            }
        }
        public int Upd(CategoryLevel2 aCategoryLevel2)
        {
            try
            {
                aDatabaseDA.CategoryLevel2.AddOrUpdate(aCategoryLevel2);
                return aDatabaseDA.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel2BO.Upd: {0}", ex.Message));
            }
        }

        //tqtrung
        public int Upd_Status_ByID(int NewStatus, int ID)
        {
            try
            {
                List<CategoryLevel2> aListCategoryLevel2 = aDatabaseDA.CategoryLevel2.Where(c => c.ID == ID).ToList();

                if (aListCategoryLevel2 != null)
                {
                    aListCategoryLevel2[0].Status = NewStatus;
                    aDatabaseDA.CategoryLevel2.AddOrUpdate(aListCategoryLevel2[0]);
                }
                return aDatabaseDA.SaveChanges();

            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel2BO.Upd_Status_ByID: {0}", ex.Message));
            }
        }
        //tqtrung
        public int Upd_Type_ByID(int NewType, int ID)
        {
            try
            {
                List<CategoryLevel2> aListCategoryLevel2 = aDatabaseDA.CategoryLevel2.Where(c => c.ID == ID).ToList();

                if (aListCategoryLevel2 != null)
                {
                    aListCategoryLevel2[0].Type = NewType;
                    aDatabaseDA.CategoryLevel2.AddOrUpdate(aListCategoryLevel2[0]);
                }
                return aDatabaseDA.SaveChanges();

            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel2BO.Upd_Type_ByID: {0}", ex.Message));
            }
        }
        //tqtrung
        public int Upd_Disable_ByID(bool NewDisable, int ID)
        {
            try
            {
                List<CategoryLevel2> aListCategoryLevel2 = aDatabaseDA.CategoryLevel2.Where(c => c.ID == ID).ToList();

                if (aListCategoryLevel2 != null)
                {
                    aListCategoryLevel2[0].Disable = NewDisable;
                    aDatabaseDA.CategoryLevel2.AddOrUpdate(aListCategoryLevel2[0]);
                }
                return aDatabaseDA.SaveChanges();

            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel2BO.Upd_Disable_ByID: {0}", ex.Message));
            }
        }
        //tqtrung
        public int Upd_Status_ByCode(int NewStatus, string Code)
        {
            try
            {
                List<CategoryLevel2> aListCategoryLevel2 = aDatabaseDA.CategoryLevel2.Where(c => c.Code == Code).ToList();
                if (aListCategoryLevel2 != null)
                {
                    for (int i = 0; i < aListCategoryLevel2.Count; i++)
                    {
                        aListCategoryLevel2[i].Status = NewStatus;
                        aDatabaseDA.CategoryLevel2.AddOrUpdate(aListCategoryLevel2[i]);
                    }


                }
                return aDatabaseDA.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel2BO.Upd_ByCode: {0}", ex.Message));
            }
        }
        //tqtrung
        public int Upd_Type_ByCode(int NewType, string Code)
        {
            try
            {
                List<CategoryLevel2> aListCategoryLevel2 = aDatabaseDA.CategoryLevel2.Where(c => c.Code == Code).ToList();
                if (aListCategoryLevel2 != null)
                {
                    for (int i = 0; i < aListCategoryLevel2.Count; i++)
                    {
                        aListCategoryLevel2[i].Type = NewType;
                        aDatabaseDA.CategoryLevel2.AddOrUpdate(aListCategoryLevel2[i]);
                    }


                }
                return aDatabaseDA.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel2BO.Upd_Type_ByCode: {0}", ex.Message));
            }
        }
        //tqtrung
        public int Upd_Disable_ByCode(bool NewDisable, string Code)
        {
            try
            {
                List<CategoryLevel2> aListCategoryLevel2 = aDatabaseDA.CategoryLevel2.Where(c => c.Code == Code).ToList();
                if (aListCategoryLevel2 != null)
                {
                    for (int i = 0; i < aListCategoryLevel2.Count; i++)
                    {
                        aListCategoryLevel2[i].Disable = NewDisable;
                        aDatabaseDA.CategoryLevel2.AddOrUpdate(aListCategoryLevel2[i]);
                    }


                }
                return aDatabaseDA.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel2BO.Upd_Disable_ByCode: {0}", ex.Message));
            }
        }
        //tqtrung
        public int Upd_Status_ByCode_ByIDLang(int NewStatus, string Code, int IDLang)
        {
            try
            {
                List<CategoryLevel2> aListCategoryLevel2 = aDatabaseDA.CategoryLevel2.Where(c => c.Code == Code).Where(b => b.IDLang == IDLang).ToList();
                if (aListCategoryLevel2 != null)
                {
                    aListCategoryLevel2[0].Status = NewStatus;
                    aDatabaseDA.CategoryLevel2.AddOrUpdate(aListCategoryLevel2[0]);

                }
                return aDatabaseDA.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel2BO.Upd_ByCode_ByIDLang: {0}", ex.Message));
            }
        }
        //tqtrung
        public int Upd_Type_ByCode_ByIDLang(int NewType, string Code, int IDLang)
        {
            try
            {
                List<CategoryLevel2> aListCategoryLevel2 = aDatabaseDA.CategoryLevel2.Where(c => c.Code == Code).Where(b => b.IDLang == IDLang).ToList();
                if (aListCategoryLevel2 != null)
                {
                    aListCategoryLevel2[0].Type = NewType;
                    aDatabaseDA.CategoryLevel2.AddOrUpdate(aListCategoryLevel2[0]);

                }
                return aDatabaseDA.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel2BO.Upd_Type_ByCode_ByIDLang: {0}", ex.Message));
            }
        }
        //tqtrung
        public int Upd_Disable_ByCode_ByIDLang(bool NewDisable, string Code, int IDLang)
        {
            try
            {
                List<CategoryLevel2> aListCategoryLevel2 = aDatabaseDA.CategoryLevel2.Where(c => c.Code == Code).Where(b => b.IDLang == IDLang).ToList();
                if (aListCategoryLevel2 != null)
                {
                    aListCategoryLevel2[0].Disable = NewDisable;
                    aDatabaseDA.CategoryLevel2.AddOrUpdate(aListCategoryLevel2[0]);

                }
                return aDatabaseDA.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel2BO.Upd_Disable_ByCode_ByIDLang: {0}", ex.Message));
            }
        }

        public int Del()
        {
            try
            {
                List<CategoryLevel2> aListCategoryLevel2 = this.Sel();
                if (aListCategoryLevel2 != null)
                {

                    aDatabaseDA.CategoryLevel2.RemoveRange(aListCategoryLevel2);
                    return aDatabaseDA.SaveChanges();
                }
                else
                {
                    throw new Exception(String.Format("CategoryLevel2BO.Del: {0}", "Không tìm thấy CategoryLevel2"));
                }
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel2BO.Del: {0}", ex.Message));
            }
        }
        //tqtrung
        public int Del_ByCode(string Code)
        {
            try
            {
                List<CategoryLevel2> aListCategoryLevel2 = aDatabaseDA.CategoryLevel2.Where(c => c.Code == Code).ToList();
                if (aListCategoryLevel2 != null)
                {
                    aDatabaseDA.CategoryLevel2.RemoveRange(aListCategoryLevel2);
                    return aDatabaseDA.SaveChanges();
                    
                }
                else
                {
                    throw new Exception(String.Format("CategoryLevel2BO.Del_All: {0}", "Không tìm thấy CategoryLevel2"));
                }
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel2BO.Del_All: {0}", ex.Message));
            }
        }
        //tqtrung
        public int Del_ByListCode(List<string> ListCode)
        {
            try
            {
                List<CategoryLevel2> aListCategoryLevel2 = aDatabaseDA.CategoryLevel2.Where(c => ListCode.Contains(c.Code)).ToList();

                if (aListCategoryLevel2 != null)
                {
                    aDatabaseDA.CategoryLevel2.RemoveRange(aListCategoryLevel2);
                    return aDatabaseDA.SaveChanges();
                }
                else
                {
                    throw new Exception(String.Format("CategoryLevel2BO.Del_ByListCode: {0}", "Không tìm thấy CategoryLevel2"));
                }
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel2BO.Del_ByListCode: {0}", ex.Message));
            }
        }
        //tqtrung
        public int Del_ByCode_ByIDLang(string Code, int IDLang)
        {
            try
            {
                List<CategoryLevel2> aListCategoryLevel2 = aDatabaseDA.CategoryLevel2.Where(c => c.Code == Code).Where(b => b.IDLang == IDLang).ToList();
                if (aListCategoryLevel2 != null)
                {
                    aDatabaseDA.CategoryLevel2.Remove(aListCategoryLevel2[0]);
                    return aDatabaseDA.SaveChanges();
                }
                else
                {
                    throw new Exception(String.Format("CategoryLevel2BO.Del_ByCode_ByIDLang: {0}", "Không tìm thấy CategoryLevel2"));
                }
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel2BO.Del_ByCode_ByIDLang: {0}", ex.Message));
            }
        }
        //tqtrung
        public int Del_ByID(int ID)
        {
            try
            {
                List<CategoryLevel2> aListCategoryLevel2 = aDatabaseDA.CategoryLevel2.Where(c => c.ID == ID).ToList();
                if (aListCategoryLevel2 != null)
                {
                    aDatabaseDA.CategoryLevel2.Remove(aListCategoryLevel2[0]);
                    return aDatabaseDA.SaveChanges();
                }
                else
                {
                    throw new Exception(String.Format("CategoryLevel2BO.Del_ByID: {0}", "Không tìm thấy CategoryLevel2"));
                }
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel2BO.Del_ByID: {0}", ex.Message));
            }
        }
        //tqtrung
        public int Del_ByListID(List<int> ListID)
        {
            try
            {
                List<CategoryLevel2> aListCategoryLevel2 = aDatabaseDA.CategoryLevel2.Where(c => ListID.Contains(c.ID)).ToList();

                if (aListCategoryLevel2 != null)
                {
                    aDatabaseDA.CategoryLevel2.RemoveRange(aListCategoryLevel2);
                    return aDatabaseDA.SaveChanges();
                }
                else
                {
                    throw new Exception(String.Format("CategoryLevel2BO.Del_ByListID: {0}", "Không tìm thấy CategoryLevel2"));
                }
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel2BO.Del_ByListID: {0}", ex.Message));
            }
        }

        public List<CategoryLevel2> Sel()
        {
            try
            {
                return aDatabaseDA.CategoryLevel2.ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel2BO.Sel_All: {0}", ex.Message));
            }
        }
        public List<CategoryLevel2> Sel_ByDisable(bool Disable)
        {
            try
            {
                return aDatabaseDA.CategoryLevel2.Where(r => r.Disable == Disable).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel2BO.Sel_All: {0}", ex.Message));
            }
        }

        public List<vw_CategoryLevel2ViewAll> Sel_Ext() 
        {
            try
            {
                return aDatabaseDA.vw_CategoryLevel2ViewAll.ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel2BO.Sel_All: {0}", ex.Message));
            }
        }
        public List<vw_CategoryLevel2ViewAll> Sel_Ext_ByDisable(bool Disable) 
        {
            try
            {
                return aDatabaseDA.vw_CategoryLevel2ViewAll.Where(r => r.Disable == Disable).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel2BO.Sel_All: {0}", ex.Message));
            }
        }
        //tqtrung


        public List<CategoryLevel2> Sel_ByIDLang(int IDLang)
        {
            try
            {
                return aDatabaseDA.CategoryLevel2.Where(p=>p.IDLang==IDLang).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel2BO.Sel_All_ByIDLang: {0}", ex.Message));
            }
        }
        public List<CategoryLevel2> Sel_ByIDLang(int IDLang, bool Disable)
        {
            try
            {
                return aDatabaseDA.CategoryLevel2.Where(p => p.IDLang == IDLang).Where(p => p.Disable == Disable).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel2BO.Sel_All_ByIDLang: {0}", ex.Message));
            }
        }

        // KhoiDT
        public List<vw_CategoryLevel2ViewAll> Sel_Ext_ByIDLang(int IDLang) 
        {
            try
            {
                return aDatabaseDA.vw_CategoryLevel2ViewAll.Where(p => p.IDLang == IDLang).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel2BO.Sel_All_ByIDLang: {0}", ex.Message));
            }
        }

        public List<vw_CategoryLevel2ViewAll> Sel_Ext_ByIDLang(int IDLang, bool Disable) 
        {
            try
            {
                return aDatabaseDA.vw_CategoryLevel2ViewAll.Where(p => p.IDLang == IDLang).Where(p => p.Disable == Disable).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel2BO.Sel_All_ByIDLang: {0}", ex.Message));
            }
        }

        public List<CategoryLevel2> Sel_ByCode(string Code)
        {
            try
            {
                return aDatabaseDA.CategoryLevel2.Where(a => a.Code == Code).ToList();
            }
            catch (Exception ex)
            {
                //return null;
                throw new Exception(String.Format("CategoryLevel2BO.Sel_all_ByCode: {0}", ex.Message));
            }
        }
        public List<CategoryLevel2> Sel_ByCode(string Code, bool Disable)
        {
            try
            {
                return aDatabaseDA.CategoryLevel2.Where(a => a.Code == Code).Where(a => a.Disable == Disable).ToList();
            }
            catch (Exception ex)
            {
                //return null;
                throw new Exception(String.Format("CategoryLevel2BO.Sel_all_ByCode: {0}", ex.Message));
            }
        }

       
        public List<vw_CategoryLevel2ViewAll> Sel_Ext_ByCode(string Code) 
        {
            try
            {
                return aDatabaseDA.vw_CategoryLevel2ViewAll.Where(a => a.Code == Code).ToList();
            }
            catch (Exception ex)
            {
                //return null;
                throw new Exception(String.Format("CategoryLevel2BO.Sel_all_ByCode: {0}", ex.Message));
            }
        }

        public List<vw_CategoryLevel2ViewAll> Sel_Ext_ByCode(string Code, bool Disable) 
        {
            try
            {
                return aDatabaseDA.vw_CategoryLevel2ViewAll.Where(a => a.Code == Code).Where(a => a.Disable == Disable).ToList();
            }
            catch (Exception ex)
            {
                //return null;
                throw new Exception(String.Format("CategoryLevel2BO.Sel_all_ByCode: {0}", ex.Message));
            }
        }

       
        public List<CategoryLevel2> Sel_ByType_ByIDLang(int Type, int IDLang) 
        {
            try
            {
                return aDatabaseDA.CategoryLevel2.Where(p => p.Type == Type).Where(z => z.IDLang == IDLang).ToList();
            }
            catch (Exception ex) 
            {
                throw new Exception(String.Format("CategoryLevel2BO.Sel_ByType_ByIDLang:{0}",ex.Message));
            }
        }
        public List<CategoryLevel2> Sel_ByType_ByIDLang(int Type, int IDLang, bool Disable)
        {
            try
            {
                return aDatabaseDA.CategoryLevel2.Where(p => p.Type == Type).Where(z => z.IDLang == IDLang).Where(z => z.Disable == Disable).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel2BO.Sel_ByType_ByIDLang:{0}", ex.Message));
            }
        }

        public List<vw_CategoryLevel2ViewAll> Sel_Ext_ByType_ByIDLang(int Type, int IDLang) 
        {
            try
            {
                return aDatabaseDA.vw_CategoryLevel2ViewAll.Where(p => p.Type == Type).Where(z => z.IDLang == IDLang).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel2BO.Sel_ByType_ByIDLang:{0}", ex.Message));
            }
        }

        public List<vw_CategoryLevel2ViewAll> Sel_Ext_ByType_ByIDLang(int Type, int IDLang, bool Disable) 
        {
            try
            {
                return aDatabaseDA.vw_CategoryLevel2ViewAll.Where(p => p.Type == Type).Where(z => z.IDLang == IDLang).Where(z => z.Disable == Disable).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel2BO.Sel_ByType_ByIDLang:{0}", ex.Message));
            }
        }
        
        public List<CategoryLevel2> Sel_ByStatus_ByIDLang(int Status, int IDLang) 
        {
            try
            {
                return aDatabaseDA.CategoryLevel2.Where(p => p.Status == Status).Where(z => z.IDLang == IDLang).ToList();
            }
            catch (Exception ex) 
            {
                throw new Exception(String.Format("CategoryLevel2BO.Sel_ByStatus_ByIDLang:{0}", ex.Message));
            }
        }
        public List<CategoryLevel2> Sel_ByStatus_ByIDLang(int Status, int IDLang, bool Disable)
        {
            try
            {
                return aDatabaseDA.CategoryLevel2.Where(p => p.Status == Status).Where(z => z.IDLang == IDLang).Where(z => z.Disable == Disable).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel2BO.Sel_ByStatus_ByIDLang:{0}", ex.Message));
            }
        }

        // KhoiDT

        public List<vw_CategoryLevel2ViewAll> Sel_Ext_ByStatus_ByIDLang(int Status, int IDLang) 
        {
            try
            {
                return aDatabaseDA.vw_CategoryLevel2ViewAll.Where(p => p.Status == Status).Where(z => z.IDLang == IDLang).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel2BO.Sel_ByStatus_ByIDLang:{0}", ex.Message));
            }
        }
        public List<vw_CategoryLevel2ViewAll> Sel_Ext_ByStatus_ByIDLang(int Status, int IDLang,bool Disable) 
        {
            try
            {
                return aDatabaseDA.vw_CategoryLevel2ViewAll.Where(p => p.Status == Status).Where(z => z.IDLang == IDLang).Where(z => z.Disable == Disable).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel2BO.Sel_ByStatus_ByIDLang:{0}", ex.Message));
            }
        }
        // KhoiDT
        public List<CategoryLevel2> Sel_ByType_ByStatus_ByIDLang(int Type, int Status, int IDLang)
        {
            try
            {
                return aDatabaseDA.CategoryLevel2.Where(c => c.Type == Type).Where(p => p.Status == Status).Where(z => z.IDLang == IDLang).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel2BO.Sel_ByType_ByStatus_ByIDLang:{0}", ex.Message));
            }
        }
        public List<CategoryLevel2> Sel_ByType_ByStatus_ByIDLang(int Type, int Status, int IDLang, bool Disable)
        {
            try
            {
                return aDatabaseDA.CategoryLevel2.Where(c => c.Type == Type).Where(p => p.Status == Status).Where(z => z.IDLang == IDLang).Where(z => z.Disable == Disable).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel2BO.Sel_ByType_ByStatus_ByIDLang:{0}", ex.Message));
            }
        }


        public List<vw_CategoryLevel2ViewAll> Sel_Ext_ByType_ByStatus_ByIDLang(int Type, int Status, int IDLang) 
        {
            try
            {
                return aDatabaseDA.vw_CategoryLevel2ViewAll.Where(c => c.Type == Type).Where(p => p.Status == Status).Where(z => z.IDLang == IDLang).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel2BO.Sel_ByType_ByStatus_ByIDLang:{0}", ex.Message));
            }
        }

        public List<vw_CategoryLevel2ViewAll> Sel_Ext_ByType_ByStatus_ByIDLang(int Type, int Status, int IDLang, bool Disable) 
        {

            try
            {
                return aDatabaseDA.vw_CategoryLevel2ViewAll.Where(c => c.Type == Type).Where(p => p.Status == Status).Where(z => z.IDLang == IDLang).Where(z => z.Disable == Disable).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel2BO.Sel_ByType_ByStatus_ByIDLang:{0}", ex.Message));
            }
        }

        public CategoryLevel2 Sel_ByCode_ByIDLang(string Code, int IDLang)
        {
            try
            {
                List<CategoryLevel2> aListCategoryLevel2 = aDatabaseDA.CategoryLevel2.Where(b => b.Code == Code && b.IDLang == IDLang).ToList();
                if (aListCategoryLevel2.Count > 0)
                {
                    return aListCategoryLevel2[0];
                }
                else
                {
                    return null;
                }
            }

            catch (Exception ex)
            {
                //return null;
                throw new Exception(String.Format("CategoryLevel2BO.Sel_ByCode_ByIDLang: {0}", ex.Message));
            }
        }
        public CategoryLevel2 Sel_ByCode_ByIDLang(string Code, int IDLang, bool Disable)
        {
            try
            {
                List<CategoryLevel2> aListCategoryLevel2 = aDatabaseDA.CategoryLevel2.Where(b => b.Code == Code && b.IDLang == IDLang && b.Disable == Disable).ToList();
                if (aListCategoryLevel2.Count > 0)
                {
                    return aListCategoryLevel2[0];
                }
                else
                {
                    return null;
                }
            }

            catch (Exception ex)
            {
                //return null;
                throw new Exception(String.Format("CategoryLevel2BO.Sel_ByCode_ByIDLang: {0}", ex.Message));
            }
        }

     

        public CategoryLevel2 Sel_ByID(Int32 ID)
        {
            try
            {
                List<CategoryLevel2> aListCategoryLevel2 = aDatabaseDA.CategoryLevel2.Where(b => b.ID == ID).ToList();
                if (aListCategoryLevel2.Count > 0)
                {
                    return aListCategoryLevel2[0];
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel2BO.Sel: {0}", ex.Message));
            }
        }
        public CategoryLevel2 Sel_ByID(Int32 ID, bool Disable)
        {
            try
            {
                List<CategoryLevel2> aListCategoryLevel2 = aDatabaseDA.CategoryLevel2.Where(b => b.ID == ID).Where(b => b.Disable == Disable).ToList();
                if (aListCategoryLevel2.Count > 0)
                {
                    return aListCategoryLevel2[0];
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel2BO.Sel: {0}", ex.Message));
            }
        }

        //tqtrung
        public List<CategoryLevel2> Sel_ByCodeCategoryLevel1(string CodeCategoryLevel1)
        {
            try
            {
                List<string> aListCodeCategoryLevel2 = aDatabaseDA.CategoryLevel1_CategoryLevel2.Where(p => p.CodeCategoryLevel1 == CodeCategoryLevel1).Select(p => p.CodeCategoryLevel2).ToList();
                return aDatabaseDA.CategoryLevel2.Where(p => aListCodeCategoryLevel2.Contains(p.Code)).ToList();   
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel1_CategoryLevel2BO.Sel_ByCodeCat1: {0}", ex.Message));
            }
        }
        public List<CategoryLevel2> Sel_ByCodeCategoryLevel1(string CodeCategoryLevel1, bool Disable)
        {
            try
            {
                List<string> aListCodeCategoryLevel2 = aDatabaseDA.CategoryLevel1_CategoryLevel2.Where(p => p.CodeCategoryLevel1 == CodeCategoryLevel1).Where(p => p.Disable == Disable).Select(p => p.CodeCategoryLevel2).ToList();
                return aDatabaseDA.CategoryLevel2.Where(p => aListCodeCategoryLevel2.Contains(p.Code)).ToList();   
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel1_CategoryLevel2BO.Sel_ByCodeCat1: {0}", ex.Message));
            }
        }

        public List<vw_CategoryLevel2ViewAll> Sel_Ext_ByCodeCategoryLevel1(string CodeCategoryLevel1) 
        {
            try
            {
                List<string> aListCodeCategoryLevel2 = aDatabaseDA.CategoryLevel1_CategoryLevel2.Where(p => p.CodeCategoryLevel1 == CodeCategoryLevel1).Select(p => p.CodeCategoryLevel2).ToList();
                return aDatabaseDA.vw_CategoryLevel2ViewAll.Where(p => aListCodeCategoryLevel2.Contains(p.Code)).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel1_CategoryLevel2BO.Sel_ByCodeCat1: {0}", ex.Message));
            }
        }
        public List<vw_CategoryLevel2ViewAll> Sel_Ext_ByCodeCategoryLevel1(string CodeCategoryLevel1, bool Disable) 
        {
            try
            {
                List<string> aListCodeCategoryLevel2 = aDatabaseDA.CategoryLevel1_CategoryLevel2.Where(p => p.CodeCategoryLevel1 == CodeCategoryLevel1).Where(p => p.Disable == Disable).Select(p => p.CodeCategoryLevel2).ToList();
                return aDatabaseDA.vw_CategoryLevel2ViewAll.Where(p => aListCodeCategoryLevel2.Contains(p.Code)).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel1_CategoryLevel2BO.Sel_ByCodeCat1: {0}", ex.Message));
            }
        }

        public List<vw_CategoryLevel2ViewAll> Sel_Ext_ByCodeCategoryLevel1_ByIDLang(string CodeCategoryLevel1, int IDLang) 
        {
            try
            {
                List<string> aListCodeCategoryLevel2 = aDatabaseDA.CategoryLevel1_CategoryLevel2.Where(p => p.CodeCategoryLevel1 == CodeCategoryLevel1).Where(p => p.IDLang == IDLang).Select(p => p.CodeCategoryLevel2).ToList();
                return aDatabaseDA.vw_CategoryLevel2ViewAll.Where(p => aListCodeCategoryLevel2.Contains(p.Code)).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel1_CategoryLevel2BO.Sel_ByCodeCat1_IDLang: {0}", ex.Message));
            }
        }
        public List<vw_CategoryLevel2ViewAll> Sel_Ext_ByCodeCategoryLevel1_ByIDLang(string CodeCategoryLevel1, int IDLang, bool Disable) 
        {
            try
            {
                List<string> aListCodeCategoryLevel2 = aDatabaseDA.CategoryLevel1_CategoryLevel2.Where(p => p.CodeCategoryLevel1 == CodeCategoryLevel1).Where(p => p.Disable == Disable).Where(p => p.IDLang == IDLang).Select(p => p.CodeCategoryLevel2).ToList();
                return aDatabaseDA.vw_CategoryLevel2ViewAll.Where(p => aListCodeCategoryLevel2.Contains(p.Code)).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel1_CategoryLevel2BO.Sel_ByCodeCat1_IDLang: {0}", ex.Message));
            }
        }

        //tqtrung 
        public List<CategoryLevel2> Sel_ByCodeCategoryLevel1_ByIDLang(string CodeCategoryLevel1, int IDLang)
        {
            try
            {
                List<string> aListCodeCategoryLevel2 = aDatabaseDA.CategoryLevel1_CategoryLevel2.Where(p => p.CodeCategoryLevel1 == CodeCategoryLevel1).Where(p => p.IDLang == IDLang).Select(p => p.CodeCategoryLevel2).ToList();
                return aDatabaseDA.CategoryLevel2.Where(p => aListCodeCategoryLevel2.Contains(p.Code)).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel1_CategoryLevel2BO.Sel_ByCodeCat1_IDLang: {0}", ex.Message));
            }
        }
        public List<CategoryLevel2> Sel_ByCodeCategoryLevel1_ByIDLang(string CodeCategoryLevel1, int IDLang, bool Disable)
        {
            try
            {
                List<string> aListCodeCategoryLevel2 = aDatabaseDA.CategoryLevel1_CategoryLevel2.Where(p => p.CodeCategoryLevel1 == CodeCategoryLevel1).Where(p => p.Disable == Disable).Where(p => p.IDLang == IDLang).Select(p => p.CodeCategoryLevel2).ToList();
                return aDatabaseDA.CategoryLevel2.Where(p => aListCodeCategoryLevel2.Contains(p.Code)).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel1_CategoryLevel2BO.Sel_ByCodeCat1_IDLang: {0}", ex.Message));
            }
        }

    }
}
