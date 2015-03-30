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
    public  class ConfigsBO
    {

        private DatabaseDA aDatabaseDA = new DatabaseDA();
		public  Configs Sel(Int32 ID)
        {
            try
            {
                List<Configs> aListConfigs = aDatabaseDA.Configs.Where(b => b.ID == ID).ToList();
                if (aListConfigs.Count > 0)
                {
                    return aListConfigs[0];
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("ConfigsBO.Sel: {0}", ex.Message));
            }
        }

        public  List<Configs> Sel_all()
        {
            try
            {
                return aDatabaseDA.Configs.ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("ConfigsBO.Sel_all: {0}", ex.Message));
            }
        }


        public  int Ins(Configs aConfigs)
        {
            try
            {
				aDatabaseDA.Configs.Add(aConfigs);
                return aDatabaseDA.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("ConfigsBO.Ins: {0}", ex.Message));
            }
        }
        public  int Upd(Configs aConfigs)
        {
            try
            {
				aDatabaseDA.Configs.AddOrUpdate(aConfigs);
                return aDatabaseDA.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("ConfigsBO.Upd: {0}", ex.Message));
            }
        }
       
        public  int Del(Int32 ID)
        {
            try
            {
                Configs aTemp = this.Sel(ID);
                if (aTemp != null)
                {
                    aDatabaseDA.Configs.Remove(aTemp);
                    return aDatabaseDA.SaveChanges();
                }
			    else
                {
                      throw new Exception(String.Format("ConfigsBO.Del: {0}", "Không tìm thấy Configs có ID = " +ID));
                }
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("ConfigsBO.Del: {0}", ex.Message));
            }
        }

        public Configs Sel_ByAccessKey(string Key)
        {
            try
            {
                List<Configs> aListConfigs = aDatabaseDA.Configs.Where(c => c.AccessKey == Key).ToList();
                if (aListConfigs.Count > 0)
                {
                    return aListConfigs[0];
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                throw new Exception(String.Format("ConfigsDA_GetByKey: {0}", ex.Message));
            }
        }

    
    }
}
