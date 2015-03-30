using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Data.Entity.Core.Objects;
using System.Configuration;
using System.Linq;
using DataAccess;
using EntitiesExt;
namespace Bussiness
{
    public class CategoryLevel1_CategoryLevel2BO
    {
        //tqtrung
        DatabaseDA aDatabaseDA = new DatabaseDA();
        public CategoryLevel1_CategoryLevel2 Sel_ByID(Int32 ID)
        {
            try
            {
                List<CategoryLevel1_CategoryLevel2> aListCategoryLevel1_CategoryLevel2 = aDatabaseDA.CategoryLevel1_CategoryLevel2.Where(b => b.ID == ID).ToList();
                if (aListCategoryLevel1_CategoryLevel2.Count > 0)
                {
                    return aListCategoryLevel1_CategoryLevel2[0];
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel1_CategoryLevel2BO.Sel_ByID: {0}", ex.Message));
            }
        }
        public CategoryLevel1_CategoryLevel2 Sel_ByID(Int32 ID, bool Disable)
        {
            try
            {
                List<CategoryLevel1_CategoryLevel2> aListCategoryLevel1_CategoryLevel2 = aDatabaseDA.CategoryLevel1_CategoryLevel2.Where(b => b.ID == ID).Where(b => b.Disable == Disable).ToList();
                if (aListCategoryLevel1_CategoryLevel2.Count > 0)
                {
                    return aListCategoryLevel1_CategoryLevel2[0];
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel1_CategoryLevel2BO.Sel_ByID: {0}", ex.Message));
            }
        }

        public List<CategoryLevel1_CategoryLevel2> Sel_All_ByIDLang(int IDLang)
        {
            try
            {
                return aDatabaseDA.CategoryLevel1_CategoryLevel2.Where(p => p.IDLang == IDLang).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel1_CategoryLevel2BO.Sel_All_ByIDLang: {0}", ex.Message));
            }
        }
        public List<CategoryLevel1_CategoryLevel2> Sel_All_ByIDLang(int IDLang, bool Disable)
        {
            try
            {
                return aDatabaseDA.CategoryLevel1_CategoryLevel2.Where(p => p.IDLang == IDLang).Where(p => p.Disable == Disable).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel1_CategoryLevel2BO.Sel_All_ByIDLang: {0}", ex.Message));
            }
        }

        //public List<CategoryLevel1_CategoryLevel2> Sel_ByCodeCat1(string CodeCat1)
        //{
        //    try
        //    {
        //        return aDatabaseDA.CategoryLevel1_CategoryLevel2.Where(p => p.CodeCategoryLevel1 == CodeCat1).ToList();
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new Exception(String.Format("CategoryLevel1_CategoryLevel2BO.Sel_ByCodeCat1: {0}", ex.Message));
        //    }
        //}

        //public List<CategoryLevel1_CategoryLevel2> Sel_ByCodeCat2(string CodeCat2)
        //{
        //    try
        //    {
        //        return aDatabaseDA.CategoryLevel1_CategoryLevel2.Where(p => p.CodeCategoryLevel2 == CodeCat2).ToList();
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new Exception(String.Format("CategoryLevel1_CategoryLevel2BO.Sel_ByCodeCat2: {0}", ex.Message));
        //    }
        //}

        public List<CategoryLevel1_CategoryLevel2> Sel_All_ByStatus_ByIDLang(int Status, int IDLang)
        {
            try
            {
                return aDatabaseDA.CategoryLevel1_CategoryLevel2.Where(p => p.Status == Status).Where(p => p.IDLang == IDLang).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel1_CategoryLevel2BO.Sel_All_ByStatus_ByIDLang: {0}", ex.Message));
            }
        }
        public List<CategoryLevel1_CategoryLevel2> Sel_All_ByStatus_ByIDLang(int Status, int IDLang, bool Disable)
        {
            try
            {
                return aDatabaseDA.CategoryLevel1_CategoryLevel2.Where(p => p.Status == Status).Where(p => p.IDLang == IDLang).Where(p => p.Disable == Disable).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel1_CategoryLevel2BO.Sel_All_ByStatus_ByIDLang: {0}", ex.Message));
            }
        }

        public List<CategoryLevel1_CategoryLevel2> Sel_All_ByDisable_ByIDLang(bool Disable, int IDLang)
        {
            try
            {
                return aDatabaseDA.CategoryLevel1_CategoryLevel2.Where(p => p.Disable == Disable).Where(p => p.IDLang == IDLang).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel1_CategoryLevel2BO.Sel_All_ByDisable_ByIDLang: {0}", ex.Message));
            }
        }

        public int Ins(CategoryLevel1_CategoryLevel2 aCategoryLevel1_CategoryLevel2)
        {
            try
            {
                aDatabaseDA.CategoryLevel1_CategoryLevel2.Add(aCategoryLevel1_CategoryLevel2);
                return aDatabaseDA.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel1_CategoryLevel2BO.Ins: {0}", ex.Message));
            }
        }
        public int Upd(CategoryLevel1_CategoryLevel2 aCategoryLevel1_CategoryLevel2)
        {
            try
            {
                aDatabaseDA.CategoryLevel1_CategoryLevel2.AddOrUpdate(aCategoryLevel1_CategoryLevel2);
                return aDatabaseDA.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel1_CategoryLevel2BO.Upd: {0}", ex.Message));
            }
        }
        //tqtrung
        public int Upd_Status_ByID(int NewStatus, int ID)
        {
            try
            {
                List<CategoryLevel1_CategoryLevel2> aListCategoryLevel1_CategoryLevel2 = aDatabaseDA.CategoryLevel1_CategoryLevel2.Where(c => c.ID == ID).ToList();

                if (aListCategoryLevel1_CategoryLevel2 != null)
                {
                    aListCategoryLevel1_CategoryLevel2[0].Status = NewStatus;
                    aDatabaseDA.CategoryLevel1_CategoryLevel2.AddOrUpdate(aListCategoryLevel1_CategoryLevel2[0]);
                }
                return aDatabaseDA.SaveChanges();

            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel1_CategoryLevel2BO.Upd_Status_ByID: {0}", ex.Message));
            }
        }
        //tqtrung
        public int Upd_Type_ByID(int NewType, int ID)
        {
            try
            {
                List<CategoryLevel1_CategoryLevel2> aListCategoryLevel1_CategoryLevel2 = aDatabaseDA.CategoryLevel1_CategoryLevel2.Where(c => c.ID == ID).ToList();

                if (aListCategoryLevel1_CategoryLevel2 != null)
                {

                    aListCategoryLevel1_CategoryLevel2[0].Type = NewType;
                    aDatabaseDA.CategoryLevel1_CategoryLevel2.AddOrUpdate(aListCategoryLevel1_CategoryLevel2[0]);
                }
                return aDatabaseDA.SaveChanges();

            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel1_CategoryLevel2BO.Upd_Type_ByID: {0}", ex.Message));
            }
        }
        //tqtrung
        public int Upd_Disable_ByID(bool NewDisable, int ID)
        {
            try
            {
                List<CategoryLevel1_CategoryLevel2> aListCategoryLevel1_CategoryLevel2 = aDatabaseDA.CategoryLevel1_CategoryLevel2.Where(c => c.ID == ID).ToList();

                if (aListCategoryLevel1_CategoryLevel2 != null)
                {
                    aListCategoryLevel1_CategoryLevel2[0].Disable = NewDisable;
                    aDatabaseDA.CategoryLevel1_CategoryLevel2.AddOrUpdate(aListCategoryLevel1_CategoryLevel2[0]);
                }
                return aDatabaseDA.SaveChanges();

            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel1_CategoryLevel2BO.Upd_Disable_ByID: {0}", ex.Message));
            }
        }

        //tqtrung
        public int Upd_Status_ByIDLang(int NewStatus, int IDLang)
        {
            try
            {
                List<CategoryLevel1_CategoryLevel2> aListCategoryLevel1_CategoryLevel2 = aDatabaseDA.CategoryLevel1_CategoryLevel2.Where(c => c.IDLang == IDLang).ToList();

                if (aListCategoryLevel1_CategoryLevel2 != null)
                {
                    aListCategoryLevel1_CategoryLevel2[0].Status = NewStatus;
                    aDatabaseDA.CategoryLevel1_CategoryLevel2.AddOrUpdate(aListCategoryLevel1_CategoryLevel2[0]);
                }
                return aDatabaseDA.SaveChanges();

            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel1_CategoryLevel2BO.Upd_Status_ByIDLang: {0}", ex.Message));
            }
        }
        //tqtrung
        public int Upd_Type_ByIDLang(int NewType, int IDLang)
        {
            try
            {
                List<CategoryLevel1_CategoryLevel2> aListCategoryLevel1_CategoryLevel2 = aDatabaseDA.CategoryLevel1_CategoryLevel2.Where(c => c.IDLang == IDLang).ToList();

                if (aListCategoryLevel1_CategoryLevel2 != null)
                {
                    aListCategoryLevel1_CategoryLevel2[0].Type = NewType;
                    aDatabaseDA.CategoryLevel1_CategoryLevel2.AddOrUpdate(aListCategoryLevel1_CategoryLevel2[0]);
                }
                return aDatabaseDA.SaveChanges();

            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel1_CategoryLevel2BO.Upd_Type_ByIDLang: {0}", ex.Message));
            }
        }
        //tqtrung
        public int Upd_Disable_ByIDLang(bool NewDisable, int IDLang)
        {
            try
            {
                List<CategoryLevel1_CategoryLevel2> aListCategoryLevel1_CategoryLevel2 = aDatabaseDA.CategoryLevel1_CategoryLevel2.Where(c => c.IDLang == IDLang).ToList();

                if (aListCategoryLevel1_CategoryLevel2 != null)
                {
                    aListCategoryLevel1_CategoryLevel2[0].Disable = NewDisable;
                    aDatabaseDA.CategoryLevel1_CategoryLevel2.AddOrUpdate(aListCategoryLevel1_CategoryLevel2[0]);
                }
                return aDatabaseDA.SaveChanges();

            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel1_CategoryLevel2BO.Upd_Disable_ByIDLang: {0}", ex.Message));
            }
        }
        public int Del_All()
        {
            try
            {
                List<CategoryLevel1_CategoryLevel2> aListCategoryLevel1_CategoryLevel2 = aDatabaseDA.CategoryLevel1_CategoryLevel2.ToList();
                if (aListCategoryLevel1_CategoryLevel2 != null)
                {

                    aDatabaseDA.CategoryLevel1_CategoryLevel2.RemoveRange(aListCategoryLevel1_CategoryLevel2);
                    return aDatabaseDA.SaveChanges();
                }
                else
                {
                    throw new Exception(String.Format("CategoryLevel1_CategoryLevel2BO.Del_All: {0}", "Không tìm thấy CategoryLevel1"));
                }
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel1_CategoryLevel2BO.Del_All: {0}", ex.Message));
            }
        }
        //tqtrung
        public int Del_ByID(int ID)
        {
            try
            {
                List<CategoryLevel1_CategoryLevel2> aListCategoryLevel1_CategoryLevel2 = aDatabaseDA.CategoryLevel1_CategoryLevel2.Where(c => c.ID == ID).ToList();
                if (aListCategoryLevel1_CategoryLevel2 != null)
                {
                    aDatabaseDA.CategoryLevel1_CategoryLevel2.Remove(aListCategoryLevel1_CategoryLevel2[0]);
                    return aDatabaseDA.SaveChanges();
                }
                else
                {
                    throw new Exception(String.Format("CategoryLevel1_CategoryLevel2BO.Del_ByID: {0}", "Không tìm thấy CategoryLevel1_CategoryLevel2"));
                }
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel1_CategoryLevel2BO.Del_ByID: {0}", ex.Message));
            }
        }
        //tqtrung
        public int Del_ByIDLang(int IDLang)
        {
            try
            {
                List<CategoryLevel1_CategoryLevel2> aListCategoryLevel1_CategoryLevel2 = aDatabaseDA.CategoryLevel1_CategoryLevel2.Where(c => c.IDLang == IDLang).ToList();
                if (aListCategoryLevel1_CategoryLevel2 != null)
                {
                    aDatabaseDA.CategoryLevel1_CategoryLevel2.Remove(aListCategoryLevel1_CategoryLevel2[0]);
                    return aDatabaseDA.SaveChanges();
                }
                else
                {
                    throw new Exception(String.Format("CategoryLevel1_CategoryLevel2BO.Del_ByIDLang: {0}", "Không tìm thấy CategoryLevel1_CategoryLevel2"));
                }
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel1_CategoryLevel2BO.Del_ByIDLang: {0}", ex.Message));
            }
        }
        //tqtrung
        public int Del_ByLitsID(List<int> ListID)
        {
            try
            {
                List<CategoryLevel1_CategoryLevel2> aListCategoryLevel1_CategoryLevel2 = aDatabaseDA.CategoryLevel1_CategoryLevel2.Where(c =>ListID.Contains(c.ID)).ToList();
                if (aListCategoryLevel1_CategoryLevel2 != null)
                {
                    aDatabaseDA.CategoryLevel1_CategoryLevel2.RemoveRange(aListCategoryLevel1_CategoryLevel2);
                    return aDatabaseDA.SaveChanges();
                }
                else
                {
                    throw new Exception(String.Format("CategoryLevel1_CategoryLevel2BO.Del_ByLitsID: {0}", "Không tìm thấy CategoryLevel1_CategoryLevel2"));
                }
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("CategoryLevel1_CategoryLevel2BO.Del_ByLitsID: {0}", ex.Message));
            }
        }
    }
}