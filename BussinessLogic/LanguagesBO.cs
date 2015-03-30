using System;
using System.Collections.Generic;
using System.Linq;
using System.Data.Entity.Migrations;
using DataAccess;
using System.Data.Entity.Core.Objects;
using System.Data.SqlClient;


namespace BussinessLogic
{
    public  class LanguagesBO
    {
        DatabaseDA aDatabaseDA = new DatabaseDA();
        public  Languages Sel(int ID)
        {
            try
            {
                
                List<Languages> aListLanguages = aDatabaseDA.Languages.Where(c => c.ID == ID).ToList();
                if (aListLanguages.Count > 0)
                {
                    return aListLanguages[0];
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                //return null;
                throw new Exception(String.Format("LanguagesBO.Sel: {0}", ex.Message));
            }
        }

        public  List<Languages> Sel()
        {
            try
            {
                return aDatabaseDA.Languages.ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("LanguagesBO.Sel_all: {0}", ex.Message));
            }
        }
 
        public  int Ins(Languages aLanguages)
        {
            try
            {
                aDatabaseDA.Languages.Add(aLanguages);
                return aDatabaseDA.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("LanguagesBO.Ins: {0}", ex.Message));
            }
        }
        public  int Upd(Languages aLanguages)
        {
            try
            {
                aDatabaseDA.Languages.AddOrUpdate(aLanguages);

                return aDatabaseDA.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("LanguagesBO.Upd: {0}", ex.Message));
            }
        }


        public  int Del(int ID)
        {
            try
            {
                List<Languages> aListCustomer = aDatabaseDA.Languages.Where(c => c.ID == ID).ToList();
                if (aListCustomer.Count > 0)
                {
                    aDatabaseDA.Languages.Remove(aListCustomer[0]);
                    return aDatabaseDA.SaveChanges();
                }
                else
                {
                    return 0;
                }
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("LanguagesBO.Del: {0}", ex.Message));
            }
        }


    }
}
