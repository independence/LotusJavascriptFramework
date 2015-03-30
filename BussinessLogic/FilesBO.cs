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
    public class FilesBO
    {

        DatabaseDA aDatabaseDA = new DatabaseDA();
        //-----------------------------------------------------------------------------
        public List<Files> Sel()
        {
            try
            {
                return aDatabaseDA.Files.ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("FilesBO.Sel: {0}", ex.Message));
            }
        }
        public List<Files> Sel(bool Disable)
        {
            try
            {
                return aDatabaseDA.Files.Where(r => r.Disable==Disable).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("FilesBO.Sel: {0}", ex.Message));
            }
        }

        public List<Files> Sel_ByCode(string Code)
        {
            try
            {
                return aDatabaseDA.Files.Where(a => a.Code == Code).ToList();
            }
            catch (Exception ex)
            {
                //return null;
                throw new Exception(String.Format("FilesBO.Sel_ByCode: {0}", ex.Message));
            }
        }

        public List<Files> Sel_ByCode(string Code, bool Disable)
        {
            try
            {
                return aDatabaseDA.Files.Where(a => a.Code == Code).Where(a => a.Disable == Disable).ToList();
            }
            catch (Exception ex)
            {
                //return null;
                throw new Exception(String.Format("FilesBO.Sel_ByCode: {0}", ex.Message));
            }
        }
      
        public Files Sel_ByCode_ByIDLang(string Code, int IDLang)
        {
            try
            {
                List<Files> aListFiles = aDatabaseDA.Files.Where(b => b.Code == Code && b.IDLang == IDLang).ToList();
                if (aListFiles.Count > 0)
                {
                    return aListFiles[0];
                }
                else
                {
                    return null;
                }
            }

            catch (Exception ex)
            {
                //return null;
                throw new Exception(String.Format("FilesBO.Sel_ByCode_ByIDLang: {0}", ex.Message));
            }
        }
        public Files Sel_ByCode_ByIDLang(string Code, int IDLang, bool Disable)
        {
            try
            {
                List<Files> aListFiles = aDatabaseDA.Files.Where(b => b.Code == Code && b.IDLang == IDLang && b.Disable == Disable).ToList();
                if (aListFiles.Count > 0)
                {
                    return aListFiles[0];
                }
                else
                {
                    return null;
                }
            }

            catch (Exception ex)
            {
                //return null;
                throw new Exception(String.Format("FilesBO.Sel_ByCode_ByIDLang: {0}", ex.Message));
            }
        }

        public Files Sel_ByID(Int32 ID)
        {
            try
            {
                List<Files> aListFiles = aDatabaseDA.Files.Where(b => b.ID == ID).ToList();
                if (aListFiles.Count > 0)
                {
                    return aListFiles[0];
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("FilesBO.Sel: {0}", ex.Message));
            }
        }
        public Files Sel_ByID(Int32 ID, bool Disable)
        {
            try
            {
                List<Files> aListFiles = aDatabaseDA.Files.Where(b => b.ID == ID).Where(b => b.Disable == Disable).ToList();
                if (aListFiles.Count > 0)
                {
                    return aListFiles[0];
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("FilesBO.Sel: {0}", ex.Message));
            }
        }

        public List<Files> Sel_ByIDLang(int IDLang)
        {
            try
            {
                return aDatabaseDA.Files.Where(p => p.IDLang == IDLang).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("FilesBO.Sel_All_ByIDLang: {0}", ex.Message));
            }
        }
        public List<Files> Sel_ByIDLang(int IDLang, bool Disable)
        {
            try
            {
                return aDatabaseDA.Files.Where(p => p.IDLang == IDLang).Where(p => p.Disable == Disable).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("FilesBO.Sel_All_ByIDLang: {0}", ex.Message));
            }
        }

        //tqtrung 
        public List<vw_FilesViewAll> Sel_Ext_ByCodeAlbum(string CodeAlbum)
        {
            try
            {
                return aDatabaseDA.vw_FilesViewAll.Where(a => a.Albums_Code == CodeAlbum).ToList();
            }
            catch (Exception ex)
            {
                //return null;
                throw new Exception(String.Format("FilesBO.Sel_ByCodeAlbum: {0}", ex.Message));
            }
        }
        public List<vw_FilesViewAll> Sel_Ext_ByCodeAlbum(string CodeAlbum, bool Disable)
        {
            try
            {
                return aDatabaseDA.vw_FilesViewAll.Where(a => a.Albums_Code == CodeAlbum).Where(a => a.Files_Disable == Disable).ToList();
            }
            catch (Exception ex)
            {
                //return null;
                throw new Exception(String.Format("FilesBO.Sel_ByCodeAlbum: {0}", ex.Message));
            }
        }

        //tqtrung
        public List<vw_FilesViewAll> Sel_Ext_ByCodeAlbum_ByIDLang(string CodeAlbum, int IDLang)
        {
            try
            {
                return aDatabaseDA.vw_FilesViewAll.Where(a => a.Albums_Code == CodeAlbum).Where(b=>b.Files_IDLang==IDLang).ToList();
            }
            catch (Exception ex)
            {
                //return null;
                throw new Exception(String.Format("FilesBO.Sel_ByCodeAlbum_ByIDLang: {0}", ex.Message));
            }
        }
        public List<vw_FilesViewAll> Sel_Ext_ByCodeAlbum_ByIDLang(string CodeAlbum, int IDLang, bool Disable)
        {
            try
            {
                return aDatabaseDA.vw_FilesViewAll.Where(a => a.Albums_Code == CodeAlbum).Where(b => b.Files_IDLang == IDLang).Where(b => b.Files_Disable == Disable).ToList();
            }
            catch (Exception ex)
            {
                //return null;
                throw new Exception(String.Format("FilesBO.Sel_ByCodeAlbum_ByIDLang: {0}", ex.Message));
            }
        }

        public List<Files> Sel_ByStatus_ByIDLang(int Status, int IDLang)
        {
            try
            {
                return aDatabaseDA.Files.Where(p => p.Status == Status).Where(p => p.IDLang == IDLang).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("FilesBO.Sel_All_ByStatus_ByIDLang: {0}", ex.Message));
            }
        }
        public List<Files> Sel_ByStatus_ByIDLang(int Status, int IDLang, bool Disable)
        {
            try
            {
                return aDatabaseDA.Files.Where(p => p.Status == Status).Where(p => p.IDLang == IDLang).Where(p => p.Disable == Disable).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("FilesBO.Sel_All_ByStatus_ByIDLang: {0}", ex.Message));
            }
        }

        public List<Files> Sel_All_ByDisable_ByIDLang(bool Disable, int IDLang)
        {
            try
            {
                return aDatabaseDA.Files.Where(p => p.Disable == Disable).Where(p => p.IDLang == IDLang).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("FilesBO.Sel_All_ByDisable_ByIDLang: {0}", ex.Message));
            }
        }

        public int Ins(Files aFiles)
        {
            try
            {
                aDatabaseDA.Files.Add(aFiles);
                return aDatabaseDA.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("FilesBO.Ins: {0}", ex.Message));
            }
        }
        public int Upd(Files aFiles)
        {
            try
            {
                aDatabaseDA.Files.AddOrUpdate(aFiles);
                return aDatabaseDA.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("FilesBO.Upd: {0}", ex.Message));
            }
        }
        //tqtrung
        public int Upd_Status_ByID(int NewStatus, int ID)
        {
            try
            {
                List<Files> aListFiles = aDatabaseDA.Files.Where(c => c.ID == ID).ToList();

                if (aListFiles != null)
                {
                    aListFiles[0].Status = NewStatus;
                    aDatabaseDA.Files.AddOrUpdate(aListFiles[0]);
                }
                return aDatabaseDA.SaveChanges();

            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("FilesBO.Upd_Status_ByID: {0}", ex.Message));
            }
        }
        //tqtrung
        public int Upd_Type_ByID(int NewType, int ID)
        {
            try
            {
                List<Files> aListFiles = aDatabaseDA.Files.Where(c => c.ID == ID).ToList();

                if (aListFiles != null)
                {
                    aListFiles[0].Type = NewType;
                    aDatabaseDA.Files.AddOrUpdate(aListFiles[0]);
                }
                return aDatabaseDA.SaveChanges();

            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("FilesBO.Upd_Type_ByID: {0}", ex.Message));
            }
        }
        //tqtrung
        public int Upd_Disable_ByID(bool NewDisable, int ID)
        {
            try
            {
                List<Files> aListFiles = aDatabaseDA.Files.Where(c => c.ID == ID).ToList();

                if (aListFiles != null)
                {
                    aListFiles[0].Disable = NewDisable;
                    aDatabaseDA.Files.AddOrUpdate(aListFiles[0]);
                }
                return aDatabaseDA.SaveChanges();

            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("FilesBO.Upd_Disable_ByID: {0}", ex.Message));
            }
        }
        //tqtrung
        public int Upd_Status_ByCode(int NewStatus, string Code)
        {
            try
            {
                List<Files> aListFiles = aDatabaseDA.Files.Where(c => c.Code == Code).ToList();
                if (aListFiles != null)
                {
                    for (int i = 0; i < aListFiles.Count; i++)
                    {
                        aListFiles[i].Status = NewStatus;
                        aDatabaseDA.Files.AddOrUpdate(aListFiles[i]);
                    }


                }
                return aDatabaseDA.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("FilesBO.Upd_ByCode: {0}", ex.Message));
            }
        }
        //tqtrung
        public int Upd_Type_ByCode(int NewType, string Code)
        {
            try
            {
                List<Files> aListFiles = aDatabaseDA.Files.Where(c => c.Code == Code).ToList();
                if (aListFiles != null)
                {
                    for (int i = 0; i < aListFiles.Count; i++)
                    {
                        aListFiles[i].Type = NewType;
                        aDatabaseDA.Files.AddOrUpdate(aListFiles[i]);
                    }


                }
                return aDatabaseDA.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("FilesBO.Upd_Type_ByCode: {0}", ex.Message));
            }
        }
        //tqtrung
        public int Upd_Disable_ByCode(bool NewDisable, string Code)
        {
            try
            {
                List<Files> aListFiles = aDatabaseDA.Files.Where(c => c.Code == Code).ToList();
                if (aListFiles != null)
                {
                    for (int i = 0; i < aListFiles.Count; i++)
                    {
                        aListFiles[i].Disable = NewDisable;
                        aDatabaseDA.Files.AddOrUpdate(aListFiles[i]);
                    }


                }
                return aDatabaseDA.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("FilesBO.Upd_Disable_ByCode: {0}", ex.Message));
            }
        }
        //tqtrung
        public int Upd_Status_ByCode_ByIDLang(int NewStatus, string Code, int IDLang)
        {
            try
            {
                List<Files> aListFiles = aDatabaseDA.Files.Where(c => c.Code == Code).Where(b => b.IDLang == IDLang).ToList();
                if (aListFiles != null)
                {
                    aListFiles[0].Status = NewStatus;
                    aDatabaseDA.Files.AddOrUpdate(aListFiles[0]);

                }
                return aDatabaseDA.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("FilesBO.Upd_ByCode_ByIDLang: {0}", ex.Message));
            }
        }
        //tqtrung
        public int Upd_Type_ByCode_ByIDLang(int NewType, string Code, int IDLang)
        {
            try
            {
                List<Files> aListFiles = aDatabaseDA.Files.Where(c => c.Code == Code).Where(b => b.IDLang == IDLang).ToList();
                if (aListFiles != null)
                {
                    aListFiles[0].Type = NewType;
                    aDatabaseDA.Files.AddOrUpdate(aListFiles[0]);
                }
                return aDatabaseDA.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("FilesBO.Upd_Type_ByCode_ByIDLang: {0}", ex.Message));
            }
        }
        //tqtrung
        public int Upd_Disable_ByCode_ByIDLang(bool NewDisable, string Code, int IDLang)
        {
            try
            {
                List<Files> aListFiles = aDatabaseDA.Files.Where(c => c.Code == Code).Where(b => b.IDLang == IDLang).ToList();
                if (aListFiles != null)
                {
                    aListFiles[0].Disable = NewDisable;
                    aDatabaseDA.Files.AddOrUpdate(aListFiles[0]);

                }
                return aDatabaseDA.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("FilesBO.Upd_Disable_ByCode_ByIDLang: {0}", ex.Message));
            }
        }
        public int Del()
        {
            try
            {
                List<Files> aListFiles = this.Sel();
                if (aListFiles != null)
                {

                    aDatabaseDA.Files.RemoveRange(aListFiles);
                    return aDatabaseDA.SaveChanges();
                }
                else
                {
                    throw new Exception(String.Format("FilesBO.Del: {0}", "Không tìm thấy Files"));
                }
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("FilesBO.Del: {0}", ex.Message));
            }
        }
        //tqtrung
        public int Del_ByCode(string Code)
        {
            try
            {
                List<Files> aListFiles = aDatabaseDA.Files.Where(c => c.Code == Code).ToList();
                if (aListFiles != null)
                {
                    aDatabaseDA.Files.RemoveRange(aListFiles);
                    return aDatabaseDA.SaveChanges();
                }
                else
                {
                    throw new Exception(String.Format("FilesBO.Del: {0}", "Không tìm thấy Files"));
                }
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("FilesBO.Del: {0}", ex.Message));
            }
        }
        //tqtrung
        public int Del_ByListCode(List<string> ListCode)
        {
            try
            {
                List<Files> aListFiles = aDatabaseDA.Files.Where(c => ListCode.Contains(c.Code)).ToList();

                if (aListFiles != null)
                {
                    aDatabaseDA.Files.RemoveRange(aListFiles);
                    return aDatabaseDA.SaveChanges();
                }
                else
                {
                    throw new Exception(String.Format("FilesBO.Del_ByListCode: {0}", "Không tìm thấy Files"));
                }
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("FilesBO.Del_ByListCode: {0}", ex.Message));
            }
        }
        //tqtrung
        public int Del_ByCode_ByIDLang(string Code, int IDLang)
        {
            try
            {
                List<Files> aListFiles = aDatabaseDA.Files.Where(c => c.Code == Code).Where(b => b.IDLang == IDLang).ToList();
                if (aListFiles != null)
                {
                    aDatabaseDA.Files.Remove(aListFiles[0]);
                    return aDatabaseDA.SaveChanges();
                }
                else
                {
                    throw new Exception(String.Format("FilesBO.Del_ByCode_ByIDLang: {0}", "Không tìm thấy Files"));
                }
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("FilesBO.Del_ByCode_ByIDLang: {0}", ex.Message));
            }
        }
        //tqtrung
        public int Del_ByID(int ID)
        {
            try
            {
                List<Files> aListFiles = aDatabaseDA.Files.Where(c => c.ID == ID).ToList();
                if (aListFiles != null)
                {
                    aDatabaseDA.Files.Remove(aListFiles[0]);
                    return aDatabaseDA.SaveChanges();
                }
                else
                {
                    throw new Exception(String.Format("FilesBO.Del_ByID: {0}", "Không tìm thấy Files"));
                }
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("FilesBO.Del_ByID: {0}", ex.Message));
            }
        }
        //tqtrung
        public int Del_ByListID(List<int> ListID)
        {
            try
            {
                List<Files> aListFiles = aDatabaseDA.Files.Where(c => ListID.Contains(c.ID)).ToList();

                if (aListFiles != null)
                {
                    aDatabaseDA.Files.RemoveRange(aListFiles);
                    return aDatabaseDA.SaveChanges();
                }
                else
                {
                    throw new Exception(String.Format("FilesBO.Del_ByListID: {0}", "Không tìm thấy Files"));
                }
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("FilesBO.Del_ByListID: {0}", ex.Message));
            }
        }
        

    }
}
