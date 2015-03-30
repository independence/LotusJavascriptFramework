using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess ;
namespace EntitiesExt
{
    public class ViewAllContentEntity
    {
        public CategoryLevel2 CategoryLevel2 = new CategoryLevel2();
        public List<CategoryLevel1> ListCategoryLevel1 = new List<CategoryLevel1>();
        public List<List<ContentsExt>> ListContents = new List<List<ContentsExt>>();


        public int TotalContents = 0;
    }
    
}
