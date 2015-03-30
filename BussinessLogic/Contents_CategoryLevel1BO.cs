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
    public class Contents_CategoryLevel1BO
    {
        DatabaseDA aDatabaseDA = new DatabaseDA();
        public int Ins(Contents_CategoryLevel1 aContents_CategoryLevel1)
        {
            try
            {
                aDatabaseDA.Contents_CategoryLevel1.Add(aContents_CategoryLevel1);
                return aDatabaseDA.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("Contents_CategoryLevel1BO.Ins: {0}", ex.Message));
            }
        }
        public int Ins(ref List<Contents_CategoryLevel1> aListContents_CategoryLevel1)
        {
            try
            {
                aListContents_CategoryLevel1 = aDatabaseDA.Contents_CategoryLevel1.AddRange(aListContents_CategoryLevel1).ToList();
                return aDatabaseDA.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("Contents_CategoryLevel1BO.Ins: {0}", ex.Message));
            }
        }
        public int Upd( List<Contents_CategoryLevel1> aListContents_CategoryLevel1)
        {
            try
            {
                aDatabaseDA.Contents_CategoryLevel1.AddOrUpdate(aListContents_CategoryLevel1.ToArray());
                return aDatabaseDA.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("Contents_CategoryLevel1BO.Ins: {0}", ex.Message));
            }
        }
        public int Upd(Contents_CategoryLevel1 aContents_CategoryLevel1)
        {
            try
            {
                aDatabaseDA.Contents_CategoryLevel1.AddOrUpdate(aContents_CategoryLevel1);
                return aDatabaseDA.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("Contents_CategoryLevel1BO.Upd: {0}", ex.Message));
            }
        }


        public int Del_ByID(Int32 ID)
        {
            try
            {
                List<Contents_CategoryLevel1> aTemp = aDatabaseDA.Contents_CategoryLevel1.Where(p => p.ID == ID).ToList();

                if (aTemp.Count > 0)
                {
                    aDatabaseDA.Contents_CategoryLevel1.Remove(aTemp[0]);
                    return aDatabaseDA.SaveChanges();
                }
                else
                {
                    throw new Exception(String.Format("Contents_CategoryLevel1BO.Del: {0}", "Không tìm thấy Contents_CategoryLevel1 có ID = " + ID));
                }

            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("Contents_CategoryLevel1BO.Del: {0}", ex.Message));
            }
        }
        public int Del(List<Contents_CategoryLevel1> aListContents_CategoryLevel1)
        {
            try
            {
                List<Contents_CategoryLevel1> aTemp = aDatabaseDA.Contents_CategoryLevel1.RemoveRange(aListContents_CategoryLevel1).ToList();
                return aDatabaseDA.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("Contents_CategoryLevel1BO.Del: {0}", ex.Message));
            }
        }
        
        public int Del_ByCodeCategoryLevel1(string CodeCategoryLevel1)
        {
            try
            {
                List<Contents_CategoryLevel1> aTemp = aDatabaseDA.Contents_CategoryLevel1.Where(p => p.CodeCategoryLevel1 == CodeCategoryLevel1).ToList();
                if (aTemp.Count > 0)
                {
                    aDatabaseDA.Contents_CategoryLevel1.RemoveRange(aTemp);
                    return aDatabaseDA.SaveChanges();
                }
                return 0;
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("Contents_CategoryLevel1BO.Del_ByCodeCategoryLevel1: {0}", ex.Message));
            }
        }
        public int Del_ByCodeCategoryLevel1_ByIDLang(string CodeCategoryLevel1, int IDLang)
        {
            try
            {
                List<Contents_CategoryLevel1> aTemp = aDatabaseDA.Contents_CategoryLevel1.Where(p => p.CodeCategoryLevel1 == CodeCategoryLevel1).Where(p => p.IDLang == IDLang).ToList();
                if (aTemp.Count > 0)
                {
                    aDatabaseDA.Contents_CategoryLevel1.Remove(aTemp[0]);
                    return aDatabaseDA.SaveChanges();
                }
                return 0;
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("Contents_CategoryLevel1BO.Del_ByCodeCategoryLevel1_ByIDLang: {0}", ex.Message));
            }
        }

        public int Del_ByCodeContents(string CodeContents)
        {
            try
            {
                List<Contents_CategoryLevel1> aTemp = aDatabaseDA.Contents_CategoryLevel1.Where(p => p.CodeContents == CodeContents).ToList();
                if (aTemp.Count > 0)
                {
                    aDatabaseDA.Contents_CategoryLevel1.RemoveRange(aTemp);
                    return aDatabaseDA.SaveChanges();
                }
                return 0;
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("Contents_CategoryLevel1BO.Del_ByCodeContents: {0}", ex.Message));
            }
        }
        public int Del_ByCodeContents_ByIDLang(string CodeContents, int IDLang)
        {
            try
            {
                List<Contents_CategoryLevel1> aTemp = aDatabaseDA.Contents_CategoryLevel1.Where(p => p.CodeContents == CodeContents).Where(p => p.IDLang == IDLang).ToList();
                if (aTemp.Count > 0)
                {
                    aDatabaseDA.Contents_CategoryLevel1.Remove(aTemp[0]);
                    return aDatabaseDA.SaveChanges();
                }
                return 0;
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("Contents_CategoryLevel1BO.Del_ByCodeContents_ByIDLang: {0}", ex.Message));
            }
        }

        public int Del_ByCodeContents_ByCodeCategoryLevel1(string CodeContents, string CodeCategoryLevel1)
        {
            try
            {
                List<Contents_CategoryLevel1> aTemp = aDatabaseDA.Contents_CategoryLevel1.Where(p => p.CodeContents == CodeContents).Where(p => p.CodeCategoryLevel1 == CodeCategoryLevel1).ToList();
                if (aTemp.Count > 0)
                {
                    aDatabaseDA.Contents_CategoryLevel1.RemoveRange(aTemp);
                    return aDatabaseDA.SaveChanges();
                }
                return 0;
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("Contents_CategoryLevel1BO.Del_ByCodeContents_ByCodeCategoryLevel1: {0}", ex.Message));
            }
        }

        public int Del_ByListCodeContents(List<string> aListCodeContents)
        {
            try
            {
                List<Contents_CategoryLevel1> aTemp = aDatabaseDA.Contents_CategoryLevel1.Where(p => aListCodeContents.Contains(p.CodeContents)).ToList();
                if (aTemp.Count > 0)
                {
                    aDatabaseDA.Contents_CategoryLevel1.RemoveRange(aTemp);
                    return aDatabaseDA.SaveChanges();
                }
                return 0;
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("Contents_CategoryLevel1BO.Del_ByCode: {0}", ex.Message));
            }
        }
        public int Del_ByListCodeCategoryLevel1(List<string> aListCodeCategoryLevel1)
        {
            try
            {
                List<Contents_CategoryLevel1> aTemp = aDatabaseDA.Contents_CategoryLevel1.Where(p => aListCodeCategoryLevel1.Contains(p.CodeCategoryLevel1)).ToList();
                if (aTemp.Count > 0)
                {
                    aDatabaseDA.Contents_CategoryLevel1.RemoveRange(aTemp);
                    return aDatabaseDA.SaveChanges();
                }
                return 0;
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("Contents_CategoryLevel1BO.Del_ByCode: {0}", ex.Message));
            }
        }
        public int Del_ByListID(List<int> aListID)
        {
            try
            {
                List<Contents_CategoryLevel1> aTemp = aDatabaseDA.Contents_CategoryLevel1.Where(p => aListID.Contains(p.ID)).ToList();
                if (aTemp.Count > 0)
                {
                    aDatabaseDA.Contents_CategoryLevel1.RemoveRange(aTemp);
                    return aDatabaseDA.SaveChanges();
                }
                return 0;
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("Contents_CategoryLevel1BO.Del_ByCode: {0}", ex.Message));
            }
        }

        public int Del(Contents_CategoryLevel1 aItem)
        {
             this.aDatabaseDA.Contents_CategoryLevel1.Remove(aItem);
            return aDatabaseDA.SaveChanges();
  
        }

        public int Del(List<int> aListIDContents_CategoryLevel1)
        {
            List < Contents_CategoryLevel1 >  aList = this.aDatabaseDA.Contents_CategoryLevel1.Where(p => aListIDContents_CategoryLevel1.Contains(p.ID)).ToList();
            return aDatabaseDA.SaveChanges();
        }

        public List<Contents_CategoryLevel1> Sel_ByCodeContents_ByIDLang(string CodeContent, int IDLang)
        {
            return this.aDatabaseDA.Contents_CategoryLevel1.Where(p => p.CodeContents == CodeContent).Where(a=>a.IDLang == IDLang).ToList();
        }
        public List<Contents_CategoryLevel1> Sel()
        {
            return this.aDatabaseDA.Contents_CategoryLevel1.ToList();
        }

    }
}
