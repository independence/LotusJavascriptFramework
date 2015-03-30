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
    public class AlbumsBO
    {

        DatabaseDA aDatabaseDA = new DatabaseDA();

        // KhoiDT
        public List<Albums> Sel_ByIDLang(int IDLang)
        {
            try
            {
                return aDatabaseDA.Albums.Where(p => p.IDLang == IDLang).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("Albums.Sel_all_ByIDLang: {0}", ex.Message));
            }
        }
        public List<Albums> Sel_ByIDLang(int IDLang,bool Disable)
        {
            try
            {
                return aDatabaseDA.Albums.Where(p => p.IDLang == IDLang).Where(p => p.Disable == Disable).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("Albums.Sel_all_ByIDLang: {0}", ex.Message));
            }
        }

        // KhoiDT
        public Albums Sel_ByCode_ByIDLang(string Code, int IDLang)
        {
            try
            {
                List<Albums> alistAlbums = aDatabaseDA.Albums.Where(c => c.ID == IDLang).Where(b => b.Code == Code).ToList();

                if (alistAlbums.Count > 0)
                {
                    return alistAlbums[0];
                }
                else
                {
                    return null;
                }
            }

            catch (Exception ex)
            {
                //return null;
                throw new Exception(String.Format("AlbumsBO.Sel_ByCode_ByIDLang: {0}", ex.Message));
            }
        }
        public Albums Sel_ByCode_ByIDLang(string Code, int IDLang, bool Disable)
        {
            try
            {
                List<Albums> alistAlbums = aDatabaseDA.Albums.Where(b => b.Code == Code).Where(c => c.ID == IDLang).Where(b => b.Disable == Disable).ToList();

                if (alistAlbums.Count > 0)
                {
                    return alistAlbums[0];
                }
                else
                {
                    return null;
                }
            }

            catch (Exception ex)
            {
                //return null;
                throw new Exception(String.Format("AlbumsBO.Sel_ByCode_ByIDLang: {0}", ex.Message));
            }
        }
       
        // KhoiDT
        public Albums Sel_ByID(int ID) 
        {
            try
            {
                List<Albums> aListAlbums = aDatabaseDA.Albums.Where(b => b.ID == ID).ToList();
                if (aListAlbums.Count > 0)
                {
                    return aListAlbums[0];
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("AlbumsBO.Sel: {0}", ex.Message));
            }
        }
        public Albums Sel_ByID(int ID,bool Disable)
        {
            try
            {
                List<Albums> aListAlbums = aDatabaseDA.Albums.Where(b => b.ID == ID).Where(b => b.Disable == Disable).ToList();
                if (aListAlbums.Count > 0)
                {
                    return aListAlbums[0];
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("AlbumsBO.Sel: {0}", ex.Message));
            }
        }


       
        
        // KhoiDT Sel_ByIDTableNgoai_ByIDLang

        public List<Contents> Sel_ByIDContent_ByIDLang(int IDAlbum,int IDLang) 
        {
            try
            {
                return aDatabaseDA.Contents.Where(p => p.IDAlbum == IDAlbum).Where(z => z.IDLang == IDLang).ToList();
            }
            catch (Exception ex) 
            {
                throw new Exception(String.Format("Sel_ByID_Table_Content_ByIDLang:{0}", ex.Message));
            }
        }
        public List<Contents> Sel_ByIDContent_ByIDLang(int IDAlbum, int IDLang, bool Disable)
        {
            try
            {
                return aDatabaseDA.Contents.Where(p => p.IDAlbum == IDAlbum).Where(z => z.IDLang == IDLang).Where(z => z.Disable == Disable).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("Sel_ByID_Table_Content_ByIDLang:{0}", ex.Message));
            }
        }

        // KhoiDT Sel_ByCodeTableNgoai_ByIDLang
        public List<Contents> Sel_ByCodeContent_ByIDLang(string Code, int IDLang) 
        {
            try
            {
                return aDatabaseDA.Contents.Where(p => p.Code == Code).Where(z => z.IDLang == IDLang).ToList();
            }
            catch (Exception ex) 
            {
                throw new Exception(String.Format("Sel_ByCode_Table_Content_ByIDLang:{0}", ex.Message));
            }
        }
        public List<Contents> Sel_ByCodeContent_ByIDLang(string Code, int IDLang, bool Disable)
        {
            try
            {
                return aDatabaseDA.Contents.Where(p => p.Code == Code).Where(z => z.IDLang == IDLang).Where(z => z.Disable == Disable).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("Sel_ByCode_Table_Content_ByIDLang:{0}", ex.Message));
            }
        }

        
        // KhoiDT SelectByIDTableNgoai
        // KhoiDT Sel_ByIDAlbum_CategoryLevel2

        //-------------------------------------
        public CategoryLevel2 Sel_ByIDAlbum_CategoryLevel2(int IDAlbum)
        {
            try
            {
                List<CategoryLevel2> aListCategoryLevel2 = aDatabaseDA.CategoryLevel2.Where(b => b.IDAlbum == IDAlbum).ToList();
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
                throw new Exception(String.Format("Sel_ByID_TableCategory2: {0}", ex.Message));
            }
        }
        public CategoryLevel2 Sel_ByIDAlbum_CategoryLevel2(int IDAlbum,bool Disable)
        {
            try
            {
                List<CategoryLevel2> aListCategoryLevel2 = aDatabaseDA.CategoryLevel2.Where(b => b.IDAlbum == IDAlbum).Where(b => b.Disable == Disable).ToList();
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
                throw new Exception(String.Format("Sel_ByID_TableCategory2: {0}", ex.Message));
            }
        }

        // KhoiDT Sel_CategoryLevel2_ByIDAlbum_ByIDLang
        // -------------------------------------------------
        public List<CategoryLevel2> Sel_CategoryLevel2_ByIDAlbum_ByIDLang(int IDAlbum, int IDLang) 
        {
            try
            {
                return aDatabaseDA.CategoryLevel2.Where(p => p.IDAlbum == IDAlbum).Where(z => z.IDLang == IDLang).ToList();
            }

            catch (Exception ex)
            {
                //return null;
                throw new Exception(String.Format("Sel_ByIDCategoryLevel2_ByIDLang: {0}", ex.Message));
            }
        }
        public List<CategoryLevel2> Sel_CategoryLevel2_ByIDAlbum_ByIDLang(int IDAlbum, int IDLang,bool Disable)
        {
            try
            {
                return aDatabaseDA.CategoryLevel2.Where(p => p.IDAlbum == IDAlbum).Where(z => z.IDLang == IDLang).Where(z => z.Disable == Disable).ToList();
            }

            catch (Exception ex)
            {
                //return null;
                throw new Exception(String.Format("Sel_ByIDCategoryLevel2_ByIDLang: {0}", ex.Message));
            }
        }

        // KhoiDT Sel_ByCode_CategoryLevel2_ByIDLang
        public List<CategoryLevel2> Sel_CategoryLevel2_ByCode_ByIDLang(string Code,int IDLang) 
        {
            try
            {
                return aDatabaseDA.CategoryLevel2.Where(p => p.Code == Code).Where(z => z.IDLang == IDLang).ToList();
            }
            catch (Exception ex) 
            {
                throw new Exception(String.Format("Sel_ByCode_CategoryLevel2_ByIDLang:{0}", ex.Message));
            }
        }
        public List<CategoryLevel2> Sel_CategoryLevel2_ByCode_ByIDLang(string Code, int IDLang, bool Disable)
        {
            try
            {
                return aDatabaseDA.CategoryLevel2.Where(p => p.Code == Code).Where(z => z.IDLang == IDLang).Where(z => z.Disable == Disable).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("Sel_ByCode_CategoryLevel2_ByIDLang:{0}", ex.Message));
            }
        }

        // KhoiDT CategoryLevel1
        // sel_ByIDKhoaNgoai
        public CategoryLevel1 Sel_CategoryLevel1_ByIDAlbum(int IDAlbum) 
        {
            try
            {
                List<CategoryLevel1> aListCategory1 = aDatabaseDA.CategoryLevel1.Where(b => b.IDAlbum == IDAlbum).ToList();
                if (aListCategory1.Count > 0)
                {
                    return aListCategory1[0];
                }
                else 
                {
                    return null;
                }
            }
            catch (Exception ex) 
            {
                throw new Exception(String.Format("Sel_ByIDCategoryLevel1:{0}", ex.Message));
            }
        }
        public CategoryLevel1 Sel_CategoryLevel1_ByIDAlbum(int IDAlbum, bool Disable)
        {
            try
            {
                List<CategoryLevel1> aListCategory1 = aDatabaseDA.CategoryLevel1.Where(b => b.IDAlbum == IDAlbum).Where(b => b.Disable == Disable).ToList();
                if (aListCategory1.Count > 0)
                {
                    return aListCategory1[0];
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("Sel_ByIDCategoryLevel1:{0}", ex.Message));
            }
        }

        // KhoiDT Sel_ByID_Table_CategoryLevel1_ByIDLang
        // ------------------------------------------------
        public List<CategoryLevel1> Sel_CategoryLevel1_ByIDAlbum_ByIDLang(int IDAlbum,int IDLang) 
        {
            try
            {
                return aDatabaseDA.CategoryLevel1.Where(p => p.IDAlbum == IDAlbum).Where(z => z.IDLang == IDLang).ToList();
            }
            catch (Exception ex) 
            {
                throw new Exception(String.Format("Sel_ByID_Table_CategoryLevel1_ByIDLang", ex.Message));
            }
        }
        public List<CategoryLevel1> Sel_CategoryLevel1_ByIDAlbum_ByIDLang(int IDAlbum, int IDLang, bool Disable)
        {
            try
            {
                return aDatabaseDA.CategoryLevel1.Where(p => p.IDAlbum == IDAlbum).Where(z => z.IDLang == IDLang).Where(z => z.Disable == Disable).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("Sel_ByID_Table_CategoryLevel1_ByIDLang", ex.Message));
            }
        }

        // KhoiDT Sel_ByCode_Table_CategoryLevel1_ByIDLang
        public List<CategoryLevel1> Sel_CategoryLevel1_ByCode_ByIDLang(string Code, int IDLang) 
        {
            try
            {
                return aDatabaseDA.CategoryLevel1.Where(p => p.Code == Code).Where(z => z.IDLang == IDLang).ToList();
            }
            catch (Exception ex) 
            {
                throw new Exception(String.Format("Sel_ByCode_Table_CategoryLevel1_ByIDLang", ex.Message));
            }
        }
        public List<CategoryLevel1> Sel_CategoryLevel1_ByCode_ByIDLang(string Code, int IDLang, bool Disable)
        {
            try
            {
                return aDatabaseDA.CategoryLevel1.Where(p => p.Code == Code).Where(z => z.IDLang == IDLang).Where(z => z.Disable == Disable).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("Sel_ByCode_Table_CategoryLevel1_ByIDLang", ex.Message));
            }
        }

        // KhoiDT Del_All

        public int Del()
        {
            try
            {
                List<Albums> aTemp = aDatabaseDA.Albums.ToList();
                if (aTemp.Count > 0)
                {
                    aDatabaseDA.Albums.RemoveRange(aTemp);
                    return aDatabaseDA.SaveChanges();
                }
                return 0;
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("AlbumsBO.Del: {0}", ex.Message));
            }
        }
        // KhoiDT Del_ByID
        public int Del_ByID(int ID) 
        {
            try
            {
                List<Albums> aTemp = aDatabaseDA.Albums.Where(p => p.ID == ID).ToList();

                if (aTemp.Count > 0)
                {
                    aDatabaseDA.Albums.Remove(aTemp[0]);
                    return aDatabaseDA.SaveChanges();
                }
                else
                {
                    throw new Exception(String.Format("Del_ByID.Del: {0}", "Không tìm thấy Contents có ID = " + ID));
                }
            }
            catch (Exception ex) 
            {
                throw new Exception(String.Format("AlbumsBO.Del_ByID:{0}", ex.Message));
            }
        }


        

        public int Del_ByListCode(List<string> aListCode) 
        {
            try
            {
                List<Albums> aTemp = aDatabaseDA.Albums.Where(p => aListCode.Contains(p.Code)).ToList();
                if (aTemp.Count > 0)
                {
                    aDatabaseDA.Albums.RemoveRange(aTemp);
                    return aDatabaseDA.SaveChanges();
                }
                return 0;
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("AlbumsBO.Del_ByCode: {0}", ex.Message));
            }
        }

        // KhoiDT Del_ByListID
        public int Del_ByListID(List<int> aListID) 
        {
            try
            {
                List<Albums> aTemp = aDatabaseDA.Albums.Where(p => aListID.Contains(p.ID)).ToList();
                if (aTemp.Count > 0) 
                {
                    aDatabaseDA.Albums.RemoveRange(aTemp);
                    return aDatabaseDA.SaveChanges();
                }
                return 0;
            }
            catch (Exception ex) 
            {
                throw new Exception(String.Format("AlbumsBO.Del_ByListID:{0}", ex.Message));
            }
        }
        // Update 

        //KhoiDT Upd_Status_ByID(int ID,int NewStatus)
        public int Upd_Status_ByID(int ID, int NewStatus)
        {
            try
            {
                List<Albums> aListAlbum = aDatabaseDA.Albums.Where(b => b.ID == ID).ToList();
                if (aListAlbum.Count > 0)
                {

                    aListAlbum[0].Status = NewStatus;
                    aDatabaseDA.Albums.AddOrUpdate(aListAlbum[0]);
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
                List<Albums> aListAlbum = aDatabaseDA.Albums.Where(b => b.ID == ID).ToList();
                if (aListAlbum.Count > 0)
                {

                    aListAlbum[0].Type = NewType;
                    aDatabaseDA.Albums.AddOrUpdate(aListAlbum[0]);
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
        public int Upd_Disable_ByID(int ID, bool NewDisable)
        {
            try
            {
                List<Albums> aListAlbum = aDatabaseDA.Albums.Where(b => b.ID == ID).ToList();
                if (aListAlbum.Count > 0)
                {

                    aListAlbum[0].Disable = NewDisable;
                    aDatabaseDA.Albums.AddOrUpdate(aListAlbum[0]);
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
                List<Albums> aListAlbum = aDatabaseDA.Albums.Where(b => b.Code == Code).ToList();
                if (aListAlbum.Count > 0)
                {

                    aListAlbum[0].Status = NewStatus;
                    aDatabaseDA.Albums.AddOrUpdate(aListAlbum[0]);
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
                List<Albums> aListAlbum = aDatabaseDA.Albums.Where(b => b.Code == Code).ToList();
                if (aListAlbum.Count > 0)
                {

                    aListAlbum[0].Type = NewType;
                    aDatabaseDA.Albums.AddOrUpdate(aListAlbum[0]);
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
        public int Upd_Disable_ByCode(string Code, bool NewDisable)
        {
            try
            {
                List<Albums> aListAlbum = aDatabaseDA.Albums.Where(b => b.Code == Code).ToList();
                if (aListAlbum.Count > 0)
                {
                    aListAlbum[0].Disable = NewDisable;
                    aDatabaseDA.Albums.AddOrUpdate(aListAlbum[0]);
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
                List<Albums> aListAlbum = aDatabaseDA.Albums.Where(b => b.Code == Code).Where(z => z.IDLang == IDLang).ToList();
                if (aListAlbum.Count > 0)
                {
                    aListAlbum[0].Status = NewStatus;
                    aDatabaseDA.Albums.AddOrUpdate(aListAlbum[0]);
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

        public int Upd_Type_ByCode_ByLang(string Code, int NewType, int IDLang)
        {
            try
            {
                List<Albums> aListAlbum = aDatabaseDA.Albums.Where(b => b.Code == Code).Where(z => z.IDLang == IDLang).ToList();
                if (aListAlbum.Count > 0)
                {
                    aListAlbum[0].Type = NewType;
                    aDatabaseDA.Albums.AddOrUpdate(aListAlbum[0]);
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
                List<Albums> aListAlbum = aDatabaseDA.Albums.Where(b => b.Code == Code).Where(z => z.IDLang == IDLang).ToList();
                if (aListAlbum.Count > 0)
                {
                    aListAlbum[0].Disable = NewDisable;
                    aDatabaseDA.Albums.AddOrUpdate(aListAlbum[0]);
                    return aDatabaseDA.SaveChanges();

                }
                return 0;
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("Upd_Disable_ByCode_ByLang:{0}", ex.Message));
            }
        }


        public List<Albums> Sel_ByCode(string Code)
        {
            try
            {

                return aDatabaseDA.Albums.Where(a => a.Code == Code).ToList();
            }
            catch (Exception ex)
            {
                //return null;
                throw new Exception(String.Format("AlbumsBO.Sel_all_ByCode: {0}", ex.Message));
            }
        }
        public List<Albums> Sel_ByCode(string Code, bool Disable)
        {
            try
            {

                return aDatabaseDA.Albums.Where(a => a.Code == Code).Where(a => a.Disable == Disable).ToList();
            }
            catch (Exception ex)
            {
                //return null;
                throw new Exception(String.Format("AlbumsBO.Sel_all_ByCode: {0}", ex.Message));
            }
        }
      
        public int Ins(Albums aAlbums)
        {
            try
            {
                aDatabaseDA.Albums.Add(aAlbums);
                return aDatabaseDA.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("AlbumsBO.Ins: {0}", ex.Message));
            }
        }
        public int Upd(Albums aAlbums)
        {
            try
            {
                aDatabaseDA.Albums.AddOrUpdate(aAlbums);
                return aDatabaseDA.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("AlbumsBO.Upd: {0}", ex.Message));
            }
        }

        /*
        public int Del(Int32 ID)
        {
            try
            {
                Albums aTemp = this.Sel(ID);
                if (aTemp != null)
                {
                    aDatabaseDA.Albums.Remove(aTemp);
                    return aDatabaseDA.SaveChanges();
                }
                else
                {
                    throw new Exception(String.Format("AlbumsBO.Del: {0}", "Không tìm thấy Albums có ID = " + ID));
                }

            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("AlbumsBO.Del: {0}", ex.Message));
            }
        }
        */ 
        public int Del_ByCode(string Code)
        {
            try
            {
                List<Albums> aTemp = Sel_ByCode(Code);
                if (aTemp.Count > 0)
                {
                    aDatabaseDA.Albums.RemoveRange(aTemp);
                    return aDatabaseDA.SaveChanges();
                }
                else
                {
                    throw new Exception(String.Format("AlbumsBO.Del_ByCode: {0}", "Không tìm thấy Albums có Code = " + Code));
                }
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("AlbumsBO.Del_ByCode: {0}", ex.Message));
            }
        }

        public int Del_ByCode_ByIDLang(string Code, int IDLang)
        {
            try
            {
                Albums aAlbums = this.Sel_ByCode_ByIDLang(Code, IDLang);
                if (aAlbums != null)
                {
                    aDatabaseDA.Albums.Remove(aAlbums);
                    return aDatabaseDA.SaveChanges();
                }
                else
                {
                    throw new Exception(String.Format("AlbumsBO.Del: {0}", "Không tìm thấy Albums có Code = " + Code));
                }
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("AlbumsBO.Del_ByCode_ByIDLang: {0}", ex.Message));
            }
        }

        //============================================================================
        // NGOCBM   | 17/7/2014
        //----------------------------------------------------------------------------
        public List<Albums> Sel_ByType(int Type, int IDLang)
        {
            try
            {
                AlbumsBO aAlbumsBO = new AlbumsBO();
                List<Albums> aListAlbums = new List<Albums>();

                aListAlbums = aDatabaseDA.Albums.Where(a => a.Type == Type).Where(p => p.IDLang == IDLang).ToList();
                return aListAlbums;
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("AlbumsBO.SelectListAlbums_ByType: {0}", ex.Message));
            }
        }
        public List<Albums> Sel_ByStatus_ByIDLang(int Status, int IDLang)
        {
            try
            {
                AlbumsBO aAlbumsBO = new AlbumsBO();
                List<Albums> aListAlbums = new List<Albums>();

                aListAlbums = aDatabaseDA.Albums.Where(a => a.Status == Status).Where(p => p.IDLang == IDLang).ToList();
                return aListAlbums;
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("AlbumsBO.SelectListAlbums_ByStatus: {0}", ex.Message));
            }
        }
        public List<Albums> Sel_ByStatus_ByType(int Status, int Type, int IDLang)
        {
            try
            {
                AlbumsBO aAlbumsBO = new AlbumsBO();
                List<Albums> aListAlbums = new List<Albums>();

                aListAlbums = aDatabaseDA.Albums.Where(a => a.Status == Status).Where(a=>a.Type== Type).Where(p => p.IDLang == IDLang).ToList();
                return aListAlbums;
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("AlbumsBO.SelectListAlbums_ByStatus_ByType: {0}", ex.Message));
            }
        }

        public List<Albums> Sel_ByListCodeAlbums_ByIDLang(List<string> CodeAlbums, int IDLang)
        {
            try
            {
                List<Albums> aListAlbums = new List<Albums>();
     
                AlbumsBO aAlbumsBO = new AlbumsBO();
                Albums aAlbums;
                for (int i = 0; i < CodeAlbums.Count; i++)
                {
  
                    aAlbums = aAlbumsBO.Sel_ByCode_ByIDLang(CodeAlbums[i], IDLang);
                    aListAlbums.Add(aAlbums);
                }
                return aListAlbums;
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("AlbumsBO.SelectListAlbums_ByListCodeAlbums: {0}", ex.Message));
            }
        }
        
        //=============================================================================
        

    }
}
